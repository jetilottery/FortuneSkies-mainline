define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Timeline = window.TimelineMax;
    const Tween = window.TweenMax;

    let buttonArray = [[], []];

    let sheenTimeLine = null;

    let offset = 0;

    function playSheen(data) {

        sheenTimeLine = new Timeline({
            paused: true,
            onComplete:()=>{
                if(data !== undefined) {
                    data.forEach(e=>{
                      e.showEnabled();
                    });
                }
            }
        });

        if (orientation.get() === orientation.LANDSCAPE) {
            for (let i = 0; i < 4; i++) {
                sheenTimeLine.add(Tween.delayedCall((offset + (0.1 * i)), () => {
                    buttonArray[0][i].sheen();
                }), 0);
            }
            for (let i = 0; i < 4; i++) {
                sheenTimeLine.add(
                    Tween.delayedCall((offset + (0.1 * i)) + 0.1, () => {
                        buttonArray[0][4 + i].sheen();
                    }), 0);
            }
            for (let i = 0; i < 4; i++) {
                sheenTimeLine.add(Tween.delayedCall((offset + (0.1 * i)) + 0.2, () => {
                        buttonArray[0][8 + i].sheen();
                    }), 0);
            }
        } else {
            for (let i = 0; i < 6; i++) {
                sheenTimeLine.add(
                    Tween.delayedCall((offset + (0.1 * i)), () => {
                        buttonArray[0][i].sheen();
                    }), 0);
            }
            for (let i = 0; i < 6; i++) {
                sheenTimeLine.add(
                    Tween.delayedCall((offset + (0.1*i))+0.1, () => {
                        buttonArray[0][6+i].sheen();
                    }), 0);
            }
        }

        sheenTimeLine.play();

    }

    function init(pickpoints) {
        buttonArray[0][0] = pickpoints[0];
        buttonArray[0][1] = pickpoints[1];
        buttonArray[0][2] = pickpoints[2];
        buttonArray[0][3] = pickpoints[3];
        buttonArray[0][4] = pickpoints[4];
        buttonArray[0][5] = pickpoints[5];
        buttonArray[0][6] = pickpoints[6];
        buttonArray[0][7] = pickpoints[7];
        buttonArray[0][8] = pickpoints[8];
        buttonArray[0][9] = pickpoints[9];
        buttonArray[0][10] = pickpoints[10];
        buttonArray[0][11] = pickpoints[11];
    }

    function killTween(data) {
        sheenTimeLine.pause();
        sheenTimeLine.clear();

        data.unrevealedPointsHolder.forEach(e => {
            e.showEnabled();
        });
    }

    msgBus.subscribe('game.base.sheen', playSheen);
    msgBus.subscribe('game.base.killSheen', killTween);

    return {
        init
    };

});