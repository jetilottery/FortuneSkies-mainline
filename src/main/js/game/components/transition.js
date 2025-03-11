define(require => {

    // WHAT IF YOU HAD A PORTRAIT CONTAINER AND A LANDSCAPE CONTAINER FOR THE GAME AND SWITCHED ON ORIENTAITON CHANGE?!?!
    
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    require('com/gsap/TimelineMax');

    const Tween = window.TweenMax;
    const TimelineMax = window.TimelineMax;

    let gameContainer;

    let locationArray = [
        [-2880, -1620],
        [-5760, -3240],
        [0, 0]
    ];

    let targetLocCurrent;

    let gameArray = [];

    let transitionArray = [];
    let annoucmentArray = [];
    let locationArraySet = [];

    let currentGame = "baseGame";
    let nextGame = "";

    let ambienceTween = [
        [-1300,-925],
        [-275,-325],
        [500,500],
    ];

    let index;

    let wheelGameFX;
    let pickerGameFX;

    let transitionTimeLine;

    let ambienceBounds;

    function init(wheelGame,pickerGame,ambientFireWorkBounds) {
        displayList.gameHoldingContainer.visible = false;
        gameContainer = displayList.gameContainer;

        displayList.overlayFireworksContainer.children.forEach(e=>{
           e.alpha = 0;
        });

        wheelGameFX = wheelGame;
        pickerGameFX = pickerGame;

        ambienceBounds = ambientFireWorkBounds();

        setupMixes();
    }

    function setupGame() {
        if (scenarioData.scenario['wheelGame'] !== null) {
            transitionArray.push('wheelGame');
            annoucmentArray.push('wheelIntro');
            gameArray.push('wheelGame');
            locationArraySet.push(locationArray[0]);
        }
        if (scenarioData.scenario['pickerGame'] !== null) {
            transitionArray.push('pickerGame');
            annoucmentArray.push('pickerIntro');
            gameArray.push('pickerGame');
            if(transitionArray.length === 2) {
                locationArraySet.push(locationArray[1]);
            } else {
                locationArraySet.push(locationArray[0]);
            }

        }

        locationArraySet.push(locationArray[2]);




        if (transitionArray.length > 0) {
            if(orientation.get() === orientation.LANDSCAPE) {
                displayList.landscapeContainer.children.forEach((e, i) => {
                    if (i > 0) {
                        if (transitionArray[i - 1] !== undefined) {
                            e.addChild(displayList[transitionArray[i - 1]]);
                        }
                    }
                });
            } else {
                displayList.portraitContainer.children.forEach((e, i) => {
                    if (i > 0) {
                        if (transitionArray[i - 1] !== undefined) {
                            e.addChild(displayList[transitionArray[i - 1]]);
                        }
                    }
                });
            }
        }

        nextGame = gameArray[index];
    }

    function showAnnocument() {
        if (displayList[annoucmentArray[index]] !== undefined) {
            Tween.to(displayList[annoucmentArray[index]], 0.5, {
                delay: 0.5,
                alpha: 1,
            });

            Tween.to(displayList.overlayAnnouncementSpineContainer, 0.5, {
                delay: 0.5,
                alpha: 1,
            });

            displayList[annoucmentArray[index]].scale.set(0);

            Tween.to(displayList[annoucmentArray[index]].scale, 0.5, {
                onStart:()=>{
                    audio.play('transitionStart',0,0.5);
                },
                delay: 0.5,
                ease:window.Power1.easeOut,
                x:1,
                y:1,
                onComplete:()=>{
                    Tween.to(displayList[annoucmentArray[index]].scale, 0.25, {
                        ease:window.Power1.easeIn,
                        x:0.8,
                        y:0.8
                    });
                }
            });



            displayList.overlayFireworksContainer.children.forEach(e=>{
                Tween.to(e,0.5,{
                    alpha:1
                });
            });

            displayList.overlayFireworksContainer.alpha = 1;

        }
    }

    function setupMixes() {
        msgBus.publish('animation.mix', {
            index: 'backgroundLand',
            from: 'land/basegame',
            to: 'land/basegameToWheel'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundLand',
            from: 'land/basegameToWheel',
            to: 'land/fortuneWheel'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundLand',
            from: 'land/fortuneWheelToBasegame',
            to: 'land/basegame'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundLand',
            from: 'land/fortuneWheelToPicker',
            to: 'land/fortunePicker'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundLand',
            from: 'land/fortunePickerToBasegame',
            to: 'land/basegame'
        });

        msgBus.publish('animation.mix', {
            index: 'backgroundPort',
            from: 'port/basegame',
            to: 'port/basegameToWheel'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundPort',
            from: 'port/basegameToWheel',
            to: 'port/fortuneWheel'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundPort',
            from: 'port/fortuneWheelToBasegame',
            to: 'port/basegame'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundPort',
            from: 'port/fortuneWheelToPicker',
            to: 'port/fortunePicker'
        });
        msgBus.publish('animation.mix', {
            index: 'backgroundPort',
            from: 'port/fortunePickerToBasegame',
            to: 'port/basegame'
        });

    }

    function completeTransition() {
        if (currentGame === 'wheelGame') {
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
        }
        if (currentGame === undefined) {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/basegame',
                loop: true,
            });
            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/basegame',
                loop: true,
            });
        }
        if (currentGame === "pickerGame" && scenarioData.scenario['wheelGame'] !== null) {
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
        } else if (currentGame === "pickerGame" && scenarioData.scenario['wheelGame'] === null)  {
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
        }
    }

    function getTargetLoc() {
        targetLocCurrent = locationArraySet.shift();
    }

    function gotoNext(promise) {

        let waitPoints = [2, 3, 5.5];
        let delay = 2;

        msgBus.publish('UI.updateButtons', {
            help: { enabled: false },
        });

        getTargetLoc();

        transitionTimeLine = new TimelineMax({
            paused: true,
            onComplete: function () {
                currentGame = gameArray[0];
                nextGame = gameArray[1];
                gameArray.shift();
                msgBus.publish('game.ambiance.transitionEnd');
                msgBus.publish('game.base.cleanUp');
                msgBus.publish('UI.updateButtons', {
                    help: { enabled: true },
                });

                index++;
                completeTransition();
                promise();
            }
        });



        transitionTimeLine.to(gameContainer, waitPoints[0], {
            onStart: showAnnocument
        }, 0);

        transitionTimeLine.add(Tween.to(displayList.landscapeContainer, waitPoints[1], {
            onStart:()=> {
                spineTransition();
                audio.play('transition',0,0.5);
            },
            ease:window.Power2.easeInOut,
            x: targetLocCurrent[0],
        }), waitPoints[0]);

        transitionTimeLine.add(Tween.to(displayList.portraitContainer, waitPoints[1], {
            ease:window.Power2.easeInOut,
            x: targetLocCurrent[1],
        }), waitPoints[0]);

        msgBus.publish('UI.updateButtons', {
            autoPlay: false,
            ticketSelect: false
        });

        msgBus.publish('game.ambiance.transitionStart');

        if (currentGame === 'baseGame' && (nextGame === 'wheelGame' || nextGame === 'pickerGame')) {
            delay = 2;
        } else {
            delay = 0;
        }

        Tween.delayedCall(delay,()=>{
            transitionTimeLine.play();
        });
    }

    function spineTransition() {

        if (currentGame === 'baseGame' && nextGame === 'wheelGame') {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/basegameToWheel',
                loop: 0,
                timeScale: 0.48
            });
            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/basegameToWheel',
                loop: 0,
                timeScale: 0.48
            });
            Tween.delayedCall(2.5,()=>{
                wheelGameFX();
                msgBus.publish('game.bonus.uiInit');
            });
            Tween.to(ambienceBounds, 3.5, {
                x:ambienceTween[1][orientation.get() === orientation.LANDSCAPE ? 0 : 1]
            });
        }
        if (currentGame === 'baseGame' && nextGame === 'pickerGame') {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/basegameToWheel',
                loop: 0,
                timeScale: 0.48
            });
            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/basegameToWheel',
                loop: 0,
                timeScale: 0.48
            });
            Tween.delayedCall(2.5,()=>{
                pickerGameFX();
            });
            Tween.to(ambienceBounds, 3.5, {
                x:ambienceTween[1][orientation.get() === orientation.LANDSCAPE ? 0 : 1]
            });
        }
        if (currentGame === 'wheelGame' && nextGame === 'pickerGame') {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/fortuneWheelToPicker',
                loop: 0,
                timeScale: 0.48
            });
            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/fortuneWheelToPicker',
                loop: 0,
                timeScale: 0.48
            });
            Tween.delayedCall(2.5,()=>{
                pickerGameFX();
            });
            Tween.to(ambienceBounds, 3.5, {
                x:ambienceTween[2][orientation.get() === orientation.LANDSCAPE ? 0 : 1]
            });
        }
        if (currentGame === 'wheelGame' && nextGame === undefined) {
            msgBus.publish('animation.play', {
                index: 'backgroundLand',
                anim: 'land/fortuneWheelToBasegame',
                loop: 0,
                timeScale: 0.48
            });
            msgBus.publish('animation.play', {
                index: 'backgroundPort',
                anim: 'port/fortuneWheelToBasegame',
                loop: 0,
                timeScale: 0.48
            });
            Tween.to(ambienceBounds, 3.5, {
                x:ambienceTween[0][orientation.get() === orientation.LANDSCAPE ? 0 : 1]
            });
        }
        if (currentGame === 'pickerGame' && nextGame === undefined) {
            if(scenarioData.scenario['wheelGame'] !== null) {
                msgBus.publish('animation.play', {
                    index: 'backgroundLand',
                    anim: 'land/fortunePickerToBasegame',
                    loop: 0,
                    timeScale: 0.8
                });
                msgBus.publish('animation.play', {
                    index: 'backgroundPort',
                    anim: 'port/fortunePickerToBasegame',
                    loop: 0,
                    timeScale: 0.8
                });
            } else {
                msgBus.publish('animation.play', {
                    index: 'backgroundLand',
                    anim: 'land/fortuneWheelToBasegame',
                    loop: 0,
                    timeScale: 0.8
                });
                msgBus.publish('animation.play', {
                    index: 'backgroundPort',
                    anim: 'port/fortuneWheelToBasegame',
                    loop: 0,
                    timeScale: 0.8
                });
            }
            Tween.to(ambienceBounds, 3.5, {
                x:ambienceTween[0][orientation.get() === orientation.LANDSCAPE ? 0 : 1]
            });
        }
    }

    function reset() {
        index = 0;
        gameContainer.x = 0;
        transitionArray = [];
        gameArray = [];
        locationArraySet = [];
        annoucmentArray = [];
        currentGame = "baseGame";
        nextGame = "";
        displayList.gameHoldingContainer.addChild(displayList.wheelGame);
        displayList.gameHoldingContainer.addChild(displayList.pickerGame);
    }

    return {
        init,
        setupGame,
        gotoNext,
        reset
    };

});