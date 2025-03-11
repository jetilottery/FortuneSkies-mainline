define(require=> {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    let fireworkMeterArray = [];
    let fireworkIndex = 7;

    function init() {
        fireworkMeterArray = [
            displayList.fireworkMeter1,
            displayList.fireworkMeter2,
            displayList.fireworkMeter3,
            displayList.fireworkMeter4,
            displayList.fireworkMeter5,
            displayList.fireworkMeter6,
            displayList.fireworkMeter7,
            displayList.fireworkMeter8,
        ];
    }

    function decrease() {
        Tween.to(fireworkMeterArray[fireworkIndex],0.25,{
           alpha:0,

        });
        fireworkIndex--;
    }
    
    function reset() {
        fireworkMeterArray.forEach(e=>{
            e.alpha = 1;
        });
        fireworkIndex = 7;
    }

    msgBus.subscribe('game.base.meterInit',init);
    msgBus.subscribe('game.base.meterDecrease',decrease);
    msgBus.subscribe('game.base.meterReset',reset);

});