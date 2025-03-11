define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    require('com/gsap/plugins/PixiPlugin');

    const FADE_DURATION = 0.5;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.5;

    let outValue = 0;

    function setWinUpTo() {
        const inValue = prizeData.prizeStructure[0];
        const inFormatted = SKBeInstant.formatCurrency(inValue).formattedAmount;
        const outFormatted = SKBeInstant.formatCurrency(outValue).formattedAmount;

        displayList.winUpToInText.text = inFormatted + "!";
        displayList.winUpToOutText.text = outFormatted + "!";

        // If outValue is 0 winUpTo is not yet set, so display the in value and skip the timeline
        if (outValue === 0 || outValue === inValue) {
            outValue = inValue;
            adjustPiviot();
            displayList.winUpToOut.alpha = 0;
            return;
        }

        adjustPiviot();

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;


        // update outValue for next time
        outValue = inValue;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: {scaleX: inScale, scaleY: inScale},
                alpha: 0,
            },
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            {
                pixi: {scaleX: outScale, scaleY: outScale},
                alpha: 0,
            },
            0
        );
    }

    function adjustPiviot() {
        if (orientation.get() === orientation.LANDSCAPE) {

            displayList.winUpToLabel.scale.set(1);
            displayList.winUpToLabel2.scale.set(1);

            displayList.winUpToLabel.maxWidth = 200;
            displayList.winUpToLabel2.maxWidth = 200;

            displayList.winUpToLabel.anchor.x = 0;
            displayList.winUpToLabel2.anchor.x = 0;

            displayList.winUpToLabel.x = -displayList.winUpToLabel.width;
            displayList.winUpToLabel2.x = -displayList.winUpToLabel2.width;

            displayList.winUpToContainer.x = displayList.winUpToLabel2.width;

            displayList.winUpToIn.x = -((
                (displayList.winUpToLabel.width)+
                (displayList.winUpToInText.width)
            ) / 2);
            displayList.winUpToOut.x = -((
                (displayList.winUpToLabel2.width)+
                (displayList.winUpToOutText.width)
            ) / 2);

        } else {
            displayList.winUpToContainer.x = 0;

            displayList.winUpToLabel.x = 0;
            displayList.winUpToLabel2.x = 0;

            displayList.winUpToIn.x = 0;
            displayList.winUpToOut.x = 0;
        }
    }

    msgBus.subscribe('GameSize.OrientationChange', adjustPiviot);
    msgBus.subscribe('PrizeData.PrizeStructure', setWinUpTo);

    return {
        reset: setWinUpTo,
    };
});
