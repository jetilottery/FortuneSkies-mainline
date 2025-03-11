define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const gameController = require('game/components/gameController');
    const revealAll = require('game/revealAll');

    async function startReveal() {

        // Listen for autoplay activation which triggers the remaining cards to reveal automatically
        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);

        // Listen for autoplay deactivation which cancels the revealAll timeline
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);

        await gameController.startReveal();


        gameFlow.next('REVEAL_COMPLETE');


    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});
