define(require => {
    const wheel = require('game/components/wheelGame/wheel');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const PIXI = require('com/pixijs/pixi');

    let promise = Promise.resolve();
    let wheelIndex = 0;
    let bonusWinAmmout = 0;
    let bonusArray = [];
    let current = null;

    let buttonPulseTween;
    let countUpTimeline;
    let wheelCover = [];

    let logoShrink = [
        [-570, -250],
        [0, -455]
    ];

    let inBonus = false;

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;

    function init() {
        wheel.init();

        displayList.innerWheelGlow.alpha = 1;

        wheelCover = [displayList.outerWheelCover, displayList.innerWheelCover];

        buttonPulseTween = Tween.to(displayList.spinButton.children[0].scale, 0.5, {
            x: 1.1,
            y: 1.1,
            repeat: -1,
            yoyo: true
        });

        if (orientation.get() === orientation.LANDSCAPE) {
            displayList.wheelPointerLandscape.alpha = 0;
        } else {
            displayList.wheelPointerPortrait.y = 1000;
        }

        displayList.spinButton.on('pointerover', () => {
            stopButtonPulse();
        });

        displayList.spinButton.on('pointerout', () => {
            startButtonPulse();
        });

        displayList.spinButton.on('press', () => {
            displayList.spinButton.enabled = false;

            msgBus.publish('UI.updateButtons', {
                help: { enabled: false },
            });
            
            stopButtonPulse();
            spin();
            audio.play('spinButton', 0, 1);
        });
        displayList.spinButton.hitArea = new PIXI.Rectangle(-60, -60, 120, 120);

        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.wheelPointerLandscape.visible = true;
            displayList.wheelPointerPortrait.visible = false;
        } else {
            displayList.wheelPointerLandscape.visible = false;
            displayList.wheelPointerPortrait.visible = true;
        }

        displayList.bonusWinLabel.alpha = 0;
    }

    function gotoNextWheel() {
        wheelIndex++;

        Tween.to(displayList.innerWheel.scale, 1, {
            delay: 0.5,
            x: 1,
            y: 1,
            onStart: function () {
                msgBus.publish('animation.play', {
                    index: 'wheelFXTransform',
                    anim: 'wheelUpgradeBurst',
                    loop: false
                });
                audio.play('nextWheel', 0, 1);
            },
            onComplete: function () {
                Tween.delayedCall(0.5, () => {
                    spin();
                });
            }
        });

        Tween.to(displayList.innerWheelGlow, 0.3, {
            alpha: 0
        });

        Tween.to(displayList.innerWheelCover.scale, 1, {
            x: 0.99,
            y: 0.99,
            delay: 0.5
        });

        Tween.to(displayList.outerWheelCover, 1, {
            delay: 0.5,
            alpha: 0.9
        });
        Tween.to(displayList.innerWheelCover, 1, {
            delay: 0.5,
            alpha: 0
        });
    }

    function enable() {
        return new Promise((resolve) => {
            if (scenarioData.scenario.wheelGame !== null) {
                bonusArray = scenarioData.scenario.wheelGame;
                startButtonPulse();
                inBonus = true;
                promise = resolve;
            } else {
                resolve();
            }
        });
    }

    function matchWheel() {
        if (wheelIndex === 0) {
            return displayList.outerWheel;
        } else {
            return displayList.innerWheel;
        }
    }

    function checkData() {
        if (current === 'X') {
            Tween.to(wheelCover[wheelIndex], 1, {
                delay: 1,
                alpha: 0.5,
            });
            audio.play('collect', 0, 1);
            bounceTotalWin();
        } else if (current === 'Z') {
            audio.play('bonusWin', 0, 1);
            wheel.gotoNextCallBack(gotoNextWheel);
        } else {
            audio.play('bonusWin', 0, 1);
            countUpTimeline = new TimelineMax({
                onComplete: () => {
                    Tween.delayedCall(1, () => {
                        spin();
                    });
                }
            });
            addToMeter(current);
        }
    }

    function startButtonPulse() {
        buttonPulseTween.resume();
    }

    function stopButtonPulse() {
        buttonPulseTween.restart();
        buttonPulseTween.pause();
    }

    function spin() {
        Tween.delayedCall(0.3, () => {
            if (bonusArray.length !== 0) {
                msgBus.publish('game.wheel.spin', {
                    target: matchWheel(),
                    endpoint: bonusArray[0],
                    wheelIndex: wheelIndex
                });
                displayList.spinButton.enabled = false;
                current = bonusArray.shift();
            } else {
                bounceTotalWin();
            }
        });
    }

    function bounceTotalWin() {
        if (bonusWinAmmout !== 0) {
            let bounceMeterTimeline = new TimelineMax();

            let boundValue = displayList.bonusWinValue;

            if (displayList.bonusWinValue.alpha === 0) {
                boundValue = displayList.bonusWinValue_2;
            }

            let scaleTo = checkScaleTo(boundValue);


            bounceMeterTimeline.to(boundValue.scale, 0.3, {
                onStart: () => {
                    audio.play('cashWin', 0, 1);
                },
                delay: 1,
                ease: window.Back.easeOut.config(1.7),
                x: scaleTo + 0.1,
                y: scaleTo + 0.1,
            }, 0);

            bounceMeterTimeline.to(boundValue.scale, 0.3, {
                ease: window.Back.easeOut.config(1.7),
                x: scaleTo,
                y: scaleTo,
                onComplete: () => {
                    inBonus = false;
                    resolveGame();
                }
            }, 2.5);
        }
    }

    function resolveGame() {
        msgBus.publish('game.gotoNext', {
            promise: promise,
            game: 'wheel'
        });
    }

    function transitionToLogo() {

        let scaleAmmount = [0.5, 0.55];

        Tween.delayedCall(0.5, () => {
            displayList.wheelIntro.alpha = 0;
            displayList.wheelLogo.alpha = 1;

            Tween.to(displayList.wheelLogoLandscape, 0.25, {
                x: logoShrink[0][0],
                y: logoShrink[0][1],
            });

            Tween.to(displayList.wheelLogoPortrait, 0.25, {
                x: logoShrink[1][0],
                y: logoShrink[1][1],
            });

            Tween.to(displayList.wheelLogoLandscape.scale, 0.25, {
                x: scaleAmmount[0],
                y: scaleAmmount[0],
                onComplete: () => {
                    displayList.spinButton.enabled = true;
                }
            });
            Tween.to(displayList.wheelLogoPortrait.scale, 0.25, {
                x: scaleAmmount[1],
                y: scaleAmmount[1],
                onComplete: () => {
                    displayList.spinButton.enabled = true;
                }
            });
        });

    }

    function uiInit() {
        Tween.to(displayList.wheelPointerLandscape, 0.5, {
            alpha: 1
        });
        Tween.to(displayList.wheelPointerPortrait, 0.5, {
            y: 475
        });

        Tween.to(displayList.bonusWinLabel,0.5, {
            alpha:1
        });
    }

    function checkScaleTo(target) {
        let scaleTo;
        target.scale.set(1);
        target.maxWidth = 300;
        scaleTo = target.scale.x;
        return scaleTo;
    }

    function addToMeter(data) {
        let targetBonusWinAmmout = bonusWinAmmout + prizeData.prizeTable[data];

        countUpTimeline.to({value: bonusWinAmmout}, 0.25, {
            onComplete: function () {

                meterData.win += prizeData.prizeTable[data];
                bonusWinAmmout += prizeData.prizeTable[data];

                if (displayList.bonusWinValue.alpha === 0) {
                    displayList.bonusWinValue.text = SKBeInstant.formatCurrency(bonusWinAmmout).formattedAmount;
                    let scaleTo = checkScaleTo(displayList.bonusWinValue);
                    displayList.bonusWinValue.scale.set(0);

                    Tween.to(displayList.bonusWinValue.scale, 0.25, {
                        x: scaleTo,
                        y: scaleTo,
                    });
                    Tween.to(displayList.bonusWinValue, 0.25, {
                        alpha: 1
                    });
                    Tween.to(displayList.bonusWinValue_2.scale, 0.5, {
                        x: 2,
                        y: 2,
                    });
                    Tween.to(displayList.bonusWinValue_2, 0.5, {
                        alpha: 0
                    });
                } else {
                    displayList.bonusWinValue_2.text = SKBeInstant.formatCurrency(bonusWinAmmout).formattedAmount;
                    let scaleTo = checkScaleTo(displayList.bonusWinValue_2);
                    displayList.bonusWinValue_2.scale.set(0);
                    Tween.to(displayList.bonusWinValue_2.scale, 0.25, {
                        x: scaleTo,
                        y: scaleTo,
                    });
                    Tween.to(displayList.bonusWinValue_2, 0.25, {
                        alpha: 1
                    });
                    Tween.to(displayList.bonusWinValue.scale, 0.5, {
                        x: 2,
                        y: 2,
                    });
                    Tween.to(displayList.bonusWinValue, 0.5, {
                        alpha: 0
                    });
                }
            },
            value: targetBonusWinAmmout,
        }, 0);
    }

    function reset() {
        displayList.spinButton.alpha = 1;
        displayList.bonusWinValue.text = "";
        displayList.bonusWinValue_2.text = "";
        displayList.spinButton.enabled = false;
        displayList.innerWheel.scale.set(0.5);
        displayList.innerWheelCover.scale.set(0.5);

        displayList.outerWheelCover.alpha = 0;
        displayList.innerWheelCover.alpha = 0.9;

        bonusWinAmmout = 0;
        wheelIndex = 0;
        msgBus.publish("game.wheel.reset");

        displayList.wheelLogoLandscape.position.set(-90, 22);
        displayList.wheelLogoPortrait.position.set(0, 120);

        displayList.wheelLogoLandscape.scale.set(0.8);
        displayList.wheelLogoPortrait.scale.set(0.65);

        displayList.wheelLogo.alpha = 0;

        displayList.wheelPointerLandscape.alpha = 0;
        displayList.wheelPointerPortrait.y = 1000;

        displayList.innerWheelGlow.alpha = 1;
        displayList.bonusWinLabel.alpha = 0;
    }

    msgBus.subscribe('game.bonus.checkData', checkData);
    msgBus.subscribe('game.bonus.uiInit', uiInit);

    msgBus.subscribe('GameSize.OrientationChange', () => {
        if (inBonus) {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/fortuneWheel',
                loop: true,
            });

            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/fortuneWheel',
                loop: true,
            });

            let scaleAmmount = [0.5, 0.55];

            displayList.wheelLogoLandscape.position.set(
                logoShrink[0][0],
                logoShrink[0][1]
            );
            displayList.wheelLogoPortrait.position.set(
                logoShrink[1][0],
                logoShrink[1][1]
            );

            displayList.wheelLogoLandscape.scale.set(
                scaleAmmount[0],
                scaleAmmount[0]
            );
            displayList.wheelLogoPortrait.scale.set(
                scaleAmmount[1],
                scaleAmmount[1]
            );
        }
        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.wheelPointerLandscape.visible = true;
            displayList.wheelPointerPortrait.visible = false;
        } else {
            displayList.wheelPointerLandscape.visible = false;
            displayList.wheelPointerPortrait.visible = true;
        }
    });


    return {
        init,
        enable,
        reset,
        transitionToLogo,
    };
});