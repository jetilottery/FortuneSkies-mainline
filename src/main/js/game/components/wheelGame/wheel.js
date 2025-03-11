define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const Segment = require('game/components/wheelGame/Segment');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    // const utils = require('skbJet/componentManchester/standardIW/layout/utils');

    require('com/gsap/TweenMax');

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;


    let topWheel;
    let bottomWheel;

    let goToNext;

    let wheelWinInnerSprite;
    let wheelWinOuterSprite;

    let target;
    let isSpinning = false;

    let wheelMap = {
        1: ['X', 'W11', 'Z', 'W7', 'Z', 'W8', 'X', 'W10', 'Z', 'W9', 'Z', 'W7', 'X', 'W11', 'Z', 'W5', 'Z', 'W8', 'X', 'W10', 'Z', 'W9', 'Z', 'W6'],
        2: ['W6', 'X', 'W4', 'X', 'W5', 'X', 'W1', 'X', 'W6', 'X', 'W3', 'X', 'W5', 'X', 'W2', 'X'],
    };

    let segmentMap = {
        1: [],
        2: [],
    };

    let wheelIndex = 1;

    function init() {
        topWheel = displayList.innerWheel;
        bottomWheel = displayList.outerWheel;

        let bottomWheelContainer = new PIXI.Container();
        bottomWheel.addChild(bottomWheelContainer);
        let topWheelContainer = new PIXI.Container();
        topWheel.addChild(topWheelContainer);

        wheelMap[1].forEach((e, i, a) => {
            let radius = bottomWheel.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 100;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[1][i],
                offset: offset,
                index: i
            });
            segmentMap[1].push(segment);

            bottomWheelContainer.addChild(segment);
        });
        segmentMap[1].forEach(e => e.update(wheelIndex));

        wheelMap[2].forEach((e, i, a) => {
            let radius = topWheel.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = -140;
            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[2][i],
                offset: offset,
                index: i
            });
            segmentMap[2].push(segment);

            topWheelContainer.addChild(segment);
        });
        segmentMap[2].forEach(e => e.update(wheelIndex));


        let innerHighlight = [
            'innerWheel_Highlight_00',
            'innerWheel_Highlight_01',
            'innerWheel_Highlight_02',
            'innerWheel_Highlight_03',
            'innerWheel_Highlight_04',
            'innerWheel_Highlight_05',
            'innerWheel_Highlight_06',
            'innerWheel_Highlight_07',
            'innerWheel_Highlight_08',
            'innerWheel_Highlight_09',
            'innerWheel_Highlight_10',
            'innerWheel_Highlight_11',
            'innerWheel_Highlight_12',
            'innerWheel_Highlight_13',
            'innerWheel_Highlight_14',
            'innerWheel_Highlight_15',
            'innerWheel_Highlight_16',
            'innerWheel_Highlight_17',
            'innerWheel_Highlight_18',
            'innerWheel_Highlight_19',
            'innerWheel_Highlight_20',
            'innerWheel_Highlight_21',
            'innerWheel_Highlight_22',
            'innerWheel_Highlight_23',
            'innerWheel_Highlight_24',
            'innerWheel_Highlight_25',
            'innerWheel_Highlight_26',
            'innerWheel_Highlight_27',
            'innerWheel_Highlight_28',
            'innerWheel_Highlight_29',
        ];
        wheelWinInnerSprite = new PIXI.extras.AnimatedSprite(innerHighlight.map(PIXI.Texture.from));
        wheelWinInnerSprite.anchor.set(0.5);
        wheelWinInnerSprite.animationSpeed = 0.5;
        displayList.wheelWinOuter.alpha = 0;

        let outerHighlight = [
            'outerWheel_Highlight_00',
            'outerWheel_Highlight_01',
            'outerWheel_Highlight_02',
            'outerWheel_Highlight_03',
            'outerWheel_Highlight_04',
            'outerWheel_Highlight_05',
            'outerWheel_Highlight_06',
            'outerWheel_Highlight_07',
            'outerWheel_Highlight_08',
            'outerWheel_Highlight_09',
            'outerWheel_Highlight_10',
            'outerWheel_Highlight_11',
            'outerWheel_Highlight_12',
            'outerWheel_Highlight_13',
            'outerWheel_Highlight_14',
            'outerWheel_Highlight_15',
            'outerWheel_Highlight_16',
            'outerWheel_Highlight_17',
            'outerWheel_Highlight_18',
            'outerWheel_Highlight_19',
            'outerWheel_Highlight_20',
            'outerWheel_Highlight_21',
            'outerWheel_Highlight_22',
            'outerWheel_Highlight_23',
            'outerWheel_Highlight_24',
            'outerWheel_Highlight_25',
            'outerWheel_Highlight_26',
            'outerWheel_Highlight_27',
            'outerWheel_Highlight_28',
            'outerWheel_Highlight_29',
        ];
        wheelWinOuterSprite = new PIXI.extras.AnimatedSprite(outerHighlight.map(PIXI.Texture.from));
        wheelWinOuterSprite.anchor.set(0.5);
        wheelWinOuterSprite.animationSpeed = 0.5;
        displayList.wheelWinInner.alpha = 0;

        displayList.wheelWinInner.addChild(wheelWinInnerSprite);
        displayList.wheelWinOuter.addChild(wheelWinOuterSprite);

        wheelWinOuterSprite.blendMode = PIXI.BLEND_MODES.ADD;
        wheelWinInnerSprite.blendMode = PIXI.BLEND_MODES.ADD;


    }

    async function spinWheel(data) {
        if(!isSpinning) {
            let wheel = bottomWheel;

            if (data.target !== undefined) {
                wheel = data.target;
            }

            msgBus.publish('UI.updateButtons', {
                help: { enabled: false },
            });

            wheelIndex = (data.wheelIndex + 1);

            target = findLandPosition(data.endpoint);

            let timeLine = new TimelineMax({
                onComplete: () => {
                    wheel.rotation = wheel.rotation % (Math.PI * 2);
                    isSpinning = false;
                    msgBus.publish('game.bonus.checkData');
                    target.land(wheelIndex);
                },
            });

            sustainSpin(wheel, target, timeLine);
        }
    }

    function sustainSpin(wheel, target, timeLine) {

        let rot_1 = - -(3 * (Math.PI * 2));
        let rot_2 = (-target.rotation + (5 * (Math.PI * 2)))+0.05;
        let rot_3 = -target.rotation + (5 * (Math.PI * 2));

        timeLine.to(wheel, 3, {
            ease: window.Power3.easeIn,
            rotation: rot_1,
        }, 0.75);

        timeLine.call(()=>{
            audio.play('spinLoop',-1,1);
        },null,null,1);

        timeLine.call(()=>{
            msgBus.publish('animation.play', {
                index: 'wheelFXSpin',
                anim:  'wheelSparks',
                loop: 0
            });
        },null,null,0);

        timeLine.to(wheel, 2, {
            ease: window.Power4.easeOut,
            rotation: rot_2,

        }, 3.75);

        timeLine.call(()=>{
            audio.stop('spinLoop');
            audio.play('spinLoopEnd',0,1);
        }, null,null, 3.75);

        timeLine.to(wheel,0.75, {
            ease: window.Power1.easeOut,
            rotation: rot_3,
        }, 5.3);
    }

    function findLandPosition(endpoint) {
        let map = segmentMap[wheelIndex].filter(e => {
            return e.data === endpoint;
        });
        let index = Math.floor(Math.random() * map.length);

        return map[index];
    }

    function updatePrizeAmounts() {
        segmentMap[1].forEach(e => e.update(0));
        segmentMap[2].forEach(e => e.update(1));
    }

    function reset() {
        goToNext = undefined;
        wheelIndex = 1;

        segmentMap[1].forEach(e => e.reset());
        segmentMap[2].forEach(e => e.reset());
    }

    function showWin() {
        if(wheelIndex === 1) {
            let playIndex = 0;
            displayList.wheelWinOuter.alpha = 1;
            wheelWinOuterSprite.gotoAndPlay(0);
            wheelWinOuterSprite.loop = false;

            wheelWinOuterSprite.onComplete = function(){
                if(playIndex === 1) {
                    displayList.wheelWinOuter.alpha = 0;
                    if(goToNext !== undefined) {
                        goToNext();
                        goToNext = undefined;
                    }
                } else {
                    playIndex = 1;
                    wheelWinOuterSprite.gotoAndPlay(0);
                }
            };
        } else {
            let playIndex = 0;

            displayList.wheelWinInner.alpha = 1;
            wheelWinInnerSprite.gotoAndPlay(0);
            wheelWinInnerSprite.loop = false;

            wheelWinInnerSprite.onComplete = function () {
                if(playIndex === 1) {
                    displayList.wheelWinInner.alpha = 0;
                } else {
                    playIndex = 1;
                    wheelWinInnerSprite.gotoAndPlay(0);
                }
            };
        }
    }

    function gotoNextCallBack(data) {
        goToNext = data;
    }

    msgBus.subscribe('MeterData.TicketCost', updatePrizeAmounts);
    msgBus.subscribe('game.wheel.spin', spinWheel);
    msgBus.subscribe('game.wheel.reset', reset);
    msgBus.subscribe('game.wheel.showWin', showWin);

    return {
        init,
        gotoNextCallBack
    };
});