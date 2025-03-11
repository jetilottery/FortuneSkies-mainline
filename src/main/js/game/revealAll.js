define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const baseGameController = require('game/components/baseGame/baseGameController');

    let revealAllTimeline;

    function start() {

        if (!gameConfig.toggleAutoPlay){
            msgBus.publish('UI.updateButtons', {autoPlay: false});
        }

        const baseGame = baseGameController.revealAll();

        revealAllTimeline = new Timeline();


        // Start with the winning numbers
        revealAllTimeline.add(
            new Timeline({ tweens: baseGame, stagger: gameConfig.autoPlayWinningNumberInterval })
        );

        // Then the player numbers, with a delay between the winning and player numbers
        // revealAllTimeline.add(
        //   new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
        //   revealWinning.length > 0 && revealPlayer.length > 0
        //     ? `+=${gameConfig.autoPlayPlayerNumberDelay}`
        //     : '+=0'
        // );

        // End with the bonus item
        // revealAllTimeline.add(revealBonus);

        return revealAllTimeline;
    }

    function stop() {
        // re-enable all interaction at the parent container level

        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    return {
        start,
        stop,
    };
});
