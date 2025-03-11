define((require) => {
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const gameController = require('game/components/gameController');
    function ticketAcquired() {

        gameController.populate(scenarioData.scenario);

        if (!audio.isPlaying('music')) {
            audio.play('music', -1, 0.35);
        }

        gameFlow.next('START_REVEAL');
    }

    gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});