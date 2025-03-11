define(function(require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const numberState = require('game/state/numbers');
    const winUpTo = require('game/components/winUpTo');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const gameController = require('game/components/gameController');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    function gameReset() {
        numberState.reset();
        winUpTo.reset();
        gameController.reset();

        msgBus.publish('UI.hideResult');
        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
        if (audio.isPlaying('loseTerminator')) {
            audio.fadeOut('loseTerminator', 1);
        }
    }

    function prepareOrReset(){
        gameReset();
        gameFlow.next();
    }

    msgBus.subscribe('TicketSelect.CostUp', gameReset);
    msgBus.subscribe('TicketSelect.CostDown', gameReset);

    gameFlow.handle(prepareOrReset, 'GAME_RESET');
    gameFlow.handle(prepareOrReset, 'GAME_PREPARE');
});
