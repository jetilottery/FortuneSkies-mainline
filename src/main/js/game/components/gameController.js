define(require => {
    const baseGameController = require('game/components/baseGame/baseGameController');
    const wheelGameController = require('game/components/wheelGame/wheelGameController');
    const pickerGameController = require('game/components/pickerGame/pickerGameController');
    const ambiance = require('game/components/ambiance');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    const transition = require('game/components/transition');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    require('game/components/totalWin');

    let pickerBonus = false;
    let wheelBonus = false;

    function init() {
        baseGameController.init();
        wheelGameController.init();
        pickerGameController.init();

        ambiance.init();
        ambiance.enable = true;

        transition.init(
            wheelGameController.transitionToLogo,
            pickerGameController.transitionToLogo,
            ambiance.getFireworkBounds
        );

        displayList.pickerBonusLabelSpineContainer.renderable = false;
        displayList.wheelBonusLabelSpineContainer.renderable = false;

        msgBus.publish('animation.play', {
            index: 'pickerBonusLabelSpineContainer',
            anim: 'bonusLogoHighlight',
            loop: true
        });
        msgBus.publish('animation.play', {
            index: 'wheelBonusLabelSpineContainer',
            anim: 'bonusLogoHighlight',
            loop: true
        });

        msgBus.publish('animation.play', {
            index: 'backgroundLand',
            anim: 'land/basegame',
            loop: true
        });

        msgBus.publish('animation.play', {
            index: 'backgroundPort',
            anim: 'port/basegame',
            loop: true
        });

        msgBus.publish('animation.play', {
            index: 'howToPlayPage2_sprite2',
            anim: 'bonusLogoHighlight',
            loop: true
        });

        msgBus.publish('animation.play', {
            index: 'howToPlayPage3_sprite2',
            anim: 'bonusLogoHighlight',
            loop: true
        });

        msgBus.publish('game.totalWin.init');

        reset();
        setOrientaionalVisibility();
    }

    async function startReveal() {
        transition.setupGame();

        msgBus.publish('game.ambiance.idle');

        await baseGameController.enable();
        await wheelGameController.enable();
        await pickerGameController.enable();
    }

    function reset() {
        baseGameController.reset();
        wheelGameController.reset();
        pickerGameController.reset();
        transition.reset();
        ambiance.reset();

        msgBus.publish('game.totalWin.reset');

        displayList.pickerBonusLabelSpineContainer.renderable = false;
        displayList.wheelBonusLabelSpineContainer.renderable = false;

        msgBus.publish('animation.play', {
            index: 'backgroundLand',
            anim: 'land/basegame',
            loop: true
        });

        msgBus.publish('animation.play', {
            index: 'backgroundPort',
            anim: 'port/basegame',
            loop: true
        });
    }

    function populate(data) {
        baseGameController.populate(data.baseGame);

        console.log(pickerBonus);
        console.log(wheelBonus);
    }

    function switchOnPickerLogo() {
        // displayList.pickerBonusLabelSpineContainer.renderable = true;
        Tween.to(displayList.pickerBonusLabelON, 0.3, {
            alpha: 1
        });

        pickerBonus = true;
    }

    function switchOnBonusLogo() {
        // displayList.wheelBonusLabelSpineContainer.renderable = true;
        Tween.to(displayList.wheelBonusLabelON, 0.3, {
            alpha: 1
        });

        wheelBonus = true;
    }

    msgBus.subscribe('game.gainPickerBonus', switchOnPickerLogo);
    msgBus.subscribe('game.gainWheelBonus', switchOnBonusLogo);

    msgBus.subscribe('game.gotoNext', (data) => {

        if (wheelBonus || pickerBonus) {
            transition.gotoNext(
                data.promise,
            );
        } else {
            if(meterData.win > 0) {
                Tween.delayedCall(gameConfig.delayBeforeWinResult,()=>{
                    data.promise();
                });
            } else {
                data.promise();
            }
        }

        if (data.game === 'wheel') {
            wheelBonus = false;
        }
        if (data.game === 'picker') {
            pickerBonus = false;
        }

    });

    function setOrientaionalVisibility() {
        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.landscapeContainer.addChild(
                displayList.gameContainer_1,
                displayList.gameContainer_2,
                displayList.gameContainer_3,
            );
            displayList.wheelLogoLandscape.visible = true;
            displayList.pickerLogoLandscape.visible = true;
            displayList.wheelLogoPortrait.visible = false;
            displayList.pickerLogoPortrait.visible = false;

            displayList.backgroundLand.renderable = true;
            displayList.backgroundPort.renderable = false;

            displayList.fireworklocSpineContainerLand.renderable = true;
            displayList.fireworklocSpineContainerPort.renderable = false;

        } else {
            displayList.portraitContainer.addChild(
                displayList.gameContainer_1,
                displayList.gameContainer_2,
                displayList.gameContainer_3,
            );
            displayList.wheelLogoLandscape.visible = false;
            displayList.pickerLogoLandscape.visible = false;
            displayList.wheelLogoPortrait.visible = true;
            displayList.pickerLogoPortrait.visible = true;

            displayList.backgroundLand.renderable = false;
            displayList.backgroundPort.renderable = true;

            displayList.fireworklocSpineContainerLand.renderable = false;
            displayList.fireworklocSpineContainerPort.renderable = true;
        }
    }

    msgBus.subscribe('GameSize.OrientationChange', () => {
        setOrientaionalVisibility();
    });

    msgBus.subscribe('game.meters.bonus', switchOnBonusLogo);
    msgBus.subscribe('game.meters.picker', switchOnPickerLogo);

    return {
        init,
        startReveal,
        populate,
        reset
    };
});