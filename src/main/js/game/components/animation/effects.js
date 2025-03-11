define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    function shake(disp, speed, magnitude,multiply) {
        let mag = magnitude === undefined ? 1 : magnitude;
        let coords = [
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 1, y: -2},
            {x: -1, y: 1},
            {x: -2, y: 1},
            {x: 0, y: 1},
            {x: 1, y: -2},
            {x: 2, y: -1},
        ];

        if(multiply !== undefined) {
            for(var i = 0; i < multiply; i++) {
                coords = coords.concat(coords);
            }
        }

        coords.push({x: 0, y: 0});

        coords.forEach((e, i, a) => {
            setTimeout(() => {
                disp.position.set(
                    (e.x * mag),
                    (e.y * mag)
                );
                if (i === a.length - 1) {
                    disp.position.set(0,0);
                }
            }, (speed * 1000) * i);
        });
    }

    function ticketCostFall(speed,delay) {
        if(gameConfig.ticketDrop) {
            let container = displayList.ticketSelectBar;
            let start = -100;
            let end = orientation.get() === orientation.LANDSCAPE ? 551 : 920;

            container.y = start;

            Tween.to(container,speed,{
                y:end,
                delay:delay,
                ease: window.Power0.easeOut,
                onComplete:()=>{
                    shake(displayList.backgroundContainer.parent,0.01,5,2);
                    msgBus.publish('animation.play', {
                        index: "dustBurstMeter",
                        anim:  "dustBurst_Meter",
                        loop: 0
                    });
                }
            });
        }
    }

    return {
        shake,
        ticketCostFall
    };

});