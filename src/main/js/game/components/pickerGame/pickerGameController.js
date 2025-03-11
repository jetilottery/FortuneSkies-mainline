define(require => {
    const Picker = require('game/components/pickerGame/Picker');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const effects = require('game/components/animation/effects');
    const PIXI = require('com/pixijs/pixi');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    const Tween = window.TweenMax;

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;

    let multiplyerTimeline;

    let pickerList = [];

    let totalWin = 1;
    let totalWinMultiplyer = 1;

    let promise;

    let fireWorkPos = [
        [1440, 810],
        [810, 1440],
    ];

    let logoShrink = [
        [250, 100],
        [405, 180]
    ];

    let possibleValues = [1, 2, 3, 4, 5, 6, 8, 10];
    let possibleValuesIndex = 0;

    let selectedFirework;

    let _enabled = false;

    let spineAnimationContainerPool = [];

    let multiplyerTextLandscape;
    let multiplyerTextPortrait;
    let totalWinText;

    let postTotalWinTextLand;
    let postTotalWinTextPort;

    let pickerTextTween;

    let inBonus = false;

    function init() {
        pickerList = [
            new Picker(displayList.picker_1),
            new Picker(displayList.picker_2),
            new Picker(displayList.picker_3),
        ];

        displayList.pickerMultiplyer.alpha = 0;
        displayList.pickerTotalWin.alpha = 0;

        displayList.pickerFireWorks.children.forEach((e, i) => {
            spineAnimationContainerPool.push({
                'container': 'PickerFireWork' + (i + 1),
                'firework': 'PickerFireWork' + (i + 1),
                'inUse': false,
            });
        });

        setupText();
    }

    function setupText() {
        totalWinText = new PIXI.extras.BitmapText("", {
            font: "180px fortuneSkiesBitmapFont_YELLOW",
        });
        postTotalWinTextLand = new PIXI.extras.BitmapText("", {
            font: "180px fortuneSkiesBitmapFont_YELLOW",
        });
        postTotalWinTextPort = new PIXI.extras.BitmapText("", {
            font: "180px fortuneSkiesBitmapFont_YELLOW",
        });

        displayList.pickerTotalWin.addChild(totalWinText);
        displayList.pickerPostTotalWinLand.addChild(postTotalWinTextLand);
        displayList.pickerPostTotalWinPort.addChild(postTotalWinTextPort);

        totalWinText.anchor.set(0.5);
        postTotalWinTextLand.anchor.set(0.5);
        postTotalWinTextPort.anchor.set(0.5);
    }

    function updateMultiplyerStyle(data) {

        if (displayList.pickerMultiplyer.children.length > 0) {
            displayList.pickerMultiplyer.removeChildren();
            multiplyerTextLandscape.destroy();
            multiplyerTextPortrait.destroy();
        }

        multiplyerTextLandscape = new PIXI.extras.BitmapText(data.string, {
            font: "420px fortuneSkiesBitmapFont_" + data.color,
        });

        multiplyerTextPortrait = new PIXI.extras.BitmapText(data.string, {
            font: "420px fortuneSkiesBitmapFont_" + data.color,
        });

        displayList.pickerMultiplyer.addChild(multiplyerTextLandscape,multiplyerTextPortrait);
        displayList.pickerMultiplyer.y = -350;
        multiplyerTextLandscape.anchor.set(0.5);
        multiplyerTextPortrait.anchor.set(0.5);
    }

    function enable() {
        return new Promise(resolve => {
            if (scenarioData.scenario.pickerGame !== null) {
                promise = resolve;
                inBonus = true;
                Tween.delayedCall(0.5,()=>{
                    return pickerList.map(async picker => {
                        await picker.enable();
                        setNonWin();
                    });
                });
            } else {
                resolve();
            }
        });
    }

    function setNonWin() {
        pickerList.forEach(e => {
            e.showDisabledState();
        });
    }

    function multiplyerCountUp(fireworks, data) {
        if (possibleValues[possibleValuesIndex] !== totalWinMultiplyer) {
            multiplyerTimeline.pause();
            fireworks();
            Tween.to(displayList.pickerMultiplyer, 0.25, {
                alpha: 0,
                onComplete:()=>{
                    displayList.pickerMultiplyer.scale.set(3);
                }
            });
            Tween.to(displayList.pickerOverlayContainer, 0.25, {
                delay: 0.3,
                alpha: 1
            });
            Tween.to(displayList.pickerMultiplyer.scale,0.2,{
               delay:0.7,
               x:1,
               y:1
            });
            Tween.to(displayList.pickerMultiplyer, 0.4, {
                delay: 0.7,
                alpha:1,
                onStart: () => {
                    updateMultiplyerStyle({
                        color: data.color,
                        string: possibleValues[possibleValuesIndex + 1] + 'x'
                    });
                },
                onComplete: () => {
                    Tween.delayedCall(1.25, () => {
                        possibleValuesIndex++;
                        multiplyerCountUp(fireworks,data);
                        Tween.to(displayList.pickerOverlayContainer, 0.25, {
                            alpha: 0
                        });
                    });
                }
            });
        } else {
            multiplyerTimeline.resume();
        }
    }

    function showValue(data) {
        multiplyerTimeline = new TimelineMax();

        totalWinMultiplyer = data.value;
        let mergeLoc = [
            [0, -200],
            [0, -200]
        ];
        let totalWinLoc = [
            [0, -50],
            [0, -50]
        ];
        // let posTotalWinLoc = [
        //     [1150, 780],
        //     [700, 1350]
        // ];
        let ori = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

        pickerTextTween.kill();

        multiplyerTimeline.call(() => {
            displayList.pickerMultiplyer.scale.set(3);
            updateMultiplyerStyle({
                color:data.color,
                string:'1x'
            });
            Tween.to(displayList.pickerOverlayContainer, 0.25, {
                delay: 0.3,
                alpha: 1
            });
            Tween.to(displayList.pickerMultiplyer.scale,0.2,{
                delay:0.7,
                x:1,
                y:1
            });
            Tween.to(displayList.pickerMultiplyer, 0.4, {
                delay: 0.7,
                alpha: 1,
                onComplete: () => {
                    Tween.delayedCall(1.75, () => {
                        Tween.to(displayList.pickerOverlayContainer, 0.25, {
                            alpha: 0
                        });
                    });
                }
            });


            selectedFirework = data.selectedFirework;
            _enabled = true;
            fireworkCelebration();
        }, null, 0);

        multiplyerTimeline.to(displayList.pickerText, 0.5, {
            alpha: 0,
        }, 0);

        multiplyerTimeline.to(displayList.pickerMultiplyer, 0.5, {
            alpha: 1,
        }, 1);

        multiplyerTimeline.add(Tween.delayedCall(2, () => {
            pickerList.filter(e => e.enabled).forEach(e => e.reveal);
            Tween.to(displayList.pickerOverlayContainer, 0.25, {
                alpha: 0
            });
        }), 0);

        multiplyerTimeline.add(Tween.delayedCall(2, () => {
            multiplyerCountUp(fireworkCelebration, data);
        }), 0);

        multiplyerTimeline.add(Tween.delayedCall(4, () => {
            pickerList.forEach(e => {
                e.showNonWin();
            });
        }), 0);

        multiplyerTimeline.to(displayList.pickerTotalWin, 0.5, {
            onStart: () => {
                totalWinText.text = SKBeInstant.formatCurrency(meterData.win).formattedAmount;
                Tween.to(displayList.winValue.scale, 0.25, {
                    x: 2,
                    y: 2,
                    repeat: 1,
                    yoyo: true
                });
            },
            alpha: 1,
            x: totalWinLoc[ori][0],
            y: totalWinLoc[ori][1]
        }, 3);
        multiplyerTimeline.to(displayList.pickerTotalWin.scale, 0.5, {
            x: 1,
            y: 1
        }, 3);
        multiplyerTimeline.to(displayList.pickerTotalWin, 1, {
            x: mergeLoc[ori][0],
            y: mergeLoc[ori][1],
            alpha: 0
        }, 4);
        multiplyerTimeline.to(displayList.pickerMultiplyer, 1, {
            x: mergeLoc[0][0],
            y: mergeLoc[0][1],
            alpha: 0
        }, 4);

        postTotalWinTextLand.text = SKBeInstant.formatCurrency(meterData.win *  Picker.returnPossibleValues(scenarioData.scenario.pickerGame)).formattedAmount;
        postTotalWinTextPort.text = SKBeInstant.formatCurrency(meterData.win *  Picker.returnPossibleValues(scenarioData.scenario.pickerGame)).formattedAmount;
        let totalWinScaleTest = testScale({land: displayList.pickerPostTotalWinLand,port:displayList.pickerPostTotalWinPort},800);
        postTotalWinTextLand.text = "";
        postTotalWinTextPort.text = "";

        let totalWinScale = [totalWinScaleTest.land,totalWinScaleTest.port];

        multiplyerTimeline.to(displayList.pickerPostTotalWinLand.scale, 0.5, {
            onStart: () => {
                totalWin = meterData.win * totalWinMultiplyer;
                postTotalWinTextLand.text = SKBeInstant.formatCurrency(totalWin).formattedAmount;
                msgBus.publish('animation.play', {
                    index: 'pickerTotalWin',
                    anim: data.selectedFirework + 1
                });
                audio.playRandom('fireWorkReveal',false,1);
            },
            x: totalWinScale[0],
            y: totalWinScale[0],
        }, 4.5);

        multiplyerTimeline.to(displayList.pickerPostTotalWinPort.scale, 0.5, {
            onStart: () => {
                totalWin = meterData.win * totalWinMultiplyer;
                postTotalWinTextPort.text = SKBeInstant.formatCurrency(totalWin).formattedAmount;
            },
            x: totalWinScale[1],
            y: totalWinScale[1],
        }, 4.5);

        multiplyerTimeline.to(displayList.pickerPostTotalWinLand, 0.5, {
            alpha: 1
        }, 4.5);
        multiplyerTimeline.to(displayList.pickerPostTotalWinPort, 0.5, {
            alpha: 1
        }, 4.5);

        multiplyerTimeline.call(complete, null, 4.5);

        multiplyerTimeline.add(Tween.delayedCall(5.5, () => {
            Tween.to(displayList.winValue.scale, 0.25, {
                x: 2,
                y: 2,
                repeat: 1,
                yoyo: true
            });
        }), 0);
    }

    function fireworkCelebration() {
        if (_enabled) {
            // let pool;
            // pool = spineAnimationContainerPool[index];
            Tween.delayedCall(0.25, () => {
                audio.playRandom('picker',0,1);
            });

            spineAnimationContainerPool.forEach((e, i) => {
                let ori = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

                let rand = function (target, offset) {
                    return Math.floor(Math.random() * target) + offset || 0;
                };
                let pos = {
                    x: rand(fireWorkPos[ori][0], 0),
                    y: rand(fireWorkPos[ori][1], 0)
                };

                Tween.to(e,0.1,{
                    pixi: {
                        contrast: rand(3,1)
                    }
                });

                displayList[spineAnimationContainerPool[i]['container']].position.set(pos.x, pos.y);
                displayList[spineAnimationContainerPool[i]['container']].scale.set(rand(0.5, 2));

                msgBus.publish('animation.play', {
                    index: spineAnimationContainerPool[i]['firework'],
                    anim: selectedFirework + rand(7, 1),
                });

                Tween.delayedCall(0.25, () => {
                    effects.shake(displayList.backgroundLand.parent, 0.1, 4);
                });
            });
        }
    }

    function complete() {
        inBonus = false;
        totalWin = meterData.win * totalWinMultiplyer;
        meterData.win = totalWin;
        msgBus.publish('game.gotoNext', {
            promise: promise,
            game: 'picker'
        });
    }

    function handleMouseOver() {
        pickerList.forEach(e => {
            e.handleMouseOver();
        });
    }

    function handleMouseOut() {
        pickerList.forEach(e => {
            e.handleMouseOut();
        });
    }

    function transitionToLogo() {

        let scaleAmmount = [0.5,0.55];

        Tween.delayedCall(0.5,()=>{

            displayList.pickerIntro.alpha = 0;
            displayList.pickerLogo.alpha = 1;

            Tween.to(displayList.pickerLogoLandscape, 0.25, {
                x: logoShrink[0][0],
                y: logoShrink[0][1],
            });

            Tween.to(displayList.pickerLogoPortrait, 0.25, {
                x: logoShrink[1][0],
                y: logoShrink[1][1],
            });

            Tween.to(displayList.pickerLogoLandscape.scale, 0.25, {
                x: scaleAmmount[0],
                y: scaleAmmount[0],
            });
            Tween.to(displayList.pickerLogoPortrait.scale, 0.25, {
                x: scaleAmmount[1],
                y: scaleAmmount[1],
            });

            pickerTextTween = Tween.to(displayList.pickerText, 0.5, {
                delay:1,
                alpha: 1
            });
        });
    }


    function reset() {
        let totalWinStart = [
            [0, 0],
            [0, 0]
        ];
        let postTotalWinStart = [
            [0, -140],
            [0, -140]
        ];
        let yMultiStart = [-400, -400];

        let logoStart = [
            [720, 405],
            [405, 720]
        ];

        totalWin = 1;
        _enabled = false;
        possibleValuesIndex = 0;

        displayList.pickerMultiplyer.alpha = 0;
        if(multiplyerTextLandscape !== undefined) {
            multiplyerTextLandscape.y = yMultiStart[0];
            multiplyerTextPortrait.y = yMultiStart[1];
        }

        displayList.pickerMultiplyer.scale.set(0);

        displayList.pickerTotalWin.position.set(
            totalWinStart[orientation.get() === orientation.LANDSCAPE ? 0 : 1][0],
            totalWinStart[orientation.get() === orientation.LANDSCAPE ? 0 : 1][1],
        );


        displayList.pickerPostTotalWinLand.position.set(
            postTotalWinStart[0][0],
            postTotalWinStart[0][1],
        );
        displayList.pickerPostTotalWinLand.scale.set(1);
        displayList.pickerPostTotalWinLand.alpha = 0;

        displayList.pickerPostTotalWinPort.position.set(
            postTotalWinStart[1][0],
            postTotalWinStart[1][1],
        );
        displayList.pickerPostTotalWinPort.scale.set(1);
        displayList.pickerPostTotalWinPort.alpha = 0;

        displayList.pickerTotalWin.scale.set(0);
        displayList.pickerText.alpha = 1;

        pickerList.forEach(e => {
            e.reset();
        });

        displayList.pickerLogoLandscape.position.set(
            logoStart[0][0],
            logoStart[0][1]
        );
        displayList.pickerLogoPortrait.scale.set(0.8);

        displayList.pickerLogoPortrait.position.set(
            logoStart[1][0],
            logoStart[1][1]
        );
        displayList.pickerLogoPortrait.scale.set(0.64);

        displayList.pickerLogo.alpha = 0;

        displayList.pickerOverlayContainer.alpha = 0;
        displayList.pickerText.alpha = 0;
    }

    function testScale(test,maxWidth,) {
        let targetScale = null;

        test.land.alpha = 0;
        test.port.alpha = 0;

        test.land.scale.set(1);
        test.port.scale.set(1);

        test.land.scale.set(Math.min(maxWidth / test.land.children[0].width, 1));
        test.port.scale.set(Math.min(maxWidth / test.port.children[0].width, 1));

        targetScale = {land:test.land.scale.x,port:test.port.scale.y};

        test.land.scale.set(0);
        test.port.scale.set(0);

        return targetScale;
    }

    msgBus.subscribe('GameSize.OrientationChange', () => {
        if (inBonus) {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/fortunePicker',
                loop: true,
            });

            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/fortunePicker',
                loop: true,
            });

            let scaleAmmount = [0.5, 0.55];

            displayList.pickerLogoLandscape.position.set(
                logoShrink[0][0],
                logoShrink[0][1]
            );
            displayList.pickerLogoPortrait.position.set(
                logoShrink[1][0],
                logoShrink[1][1]
            );

            displayList.pickerLogoLandscape.scale.set(
                scaleAmmount[0],
                scaleAmmount[0]
            );
            displayList.pickerLogoPortrait.scale.set(
                scaleAmmount[1],
                scaleAmmount[1]
            );

        }
    });

    msgBus.subscribe('game.picker.showValue', showValue);
    msgBus.subscribe('game.picker.mouseOver', handleMouseOver);
    msgBus.subscribe('game.picker.mouseOut', handleMouseOut);

    return {
        enable,
        init,
        reset,
        transitionToLogo
    };

});