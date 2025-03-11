define(require => {

    const animationController = require('game/components/animation/animationController');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    // let orientaionPrefix = orientation.get() === orientation.LANDSCAPE ? 'land' : 'port';

    function updatePrefix() {
        return orientation.get() === orientation.LANDSCAPE ? 'land' : 'port';
    }

    function init() {
        animationController.addAnimation({
            index:'backgroundLand',
            file:'backgroundAnims',
            loop:true,
            pivotX:orientation.get() === orientation.LANDSCAPE ? -720 : -404,
            pivotY:orientation.get() === orientation.LANDSCAPE ? -395 : -730,
            container: displayList.backgroundLand
        });
        animationController.addAnimation({
            index:'backgroundPort',
            file:'backgroundAnims',
            loop:true,
            pivotX:orientation.get() === orientation.LANDSCAPE ? -720 : -404,
            pivotY:orientation.get() === orientation.LANDSCAPE ? -395 : -730,
            container: displayList.backgroundPort
        });

        animationController.addAnimation({
            index:'overlay',
            file:'totalWinAndTransitions',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.gameOverSpineContainer
        });

        animationController.addAnimation({
            index:'wheelFXSpin',
            file:'wheelBonus',
            loop:true,
            pivotX:orientation.get() === orientation.LANDSCAPE ? 0 : 0,
            pivotY:orientation.get() === orientation.LANDSCAPE ? 0 : 0,
            container: displayList.wheelFX
        });
        animationController.addAnimation({
            index:'wheelFXTransform',
            file:'wheelBonus',
            loop:true,
            pivotX:orientation.get() === orientation.LANDSCAPE ? 0 : 0,
            pivotY:orientation.get() === orientation.LANDSCAPE ? 0 : 0,
            container: displayList.wheelTransformFX
        });

        animationController.addAnimation({
            index:'picker_1',
            file:'pickerBonus',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.picker_1
        });

        animationController.addAnimation({
            index:'picker_2',
            file:'pickerBonus',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.picker_2
        });

        animationController.addAnimation({
            index:'picker_3',
            file:'pickerBonus',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.picker_3
        });

        animationController.addAnimation({
            index:'pickerTotalWin',
            file:'pickPoints',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.pickerPostTotalWinBackground
        });

        animationController.addAnimation({
            index:'pickerBonusLabelSpineContainer',
            file:'pickPoints',
            loop:true,
            pivotX:-120,
            pivotY:-60,
            container: displayList.pickerBonusLabelSpineContainer
        });

        animationController.addAnimation({
            index:'wheelBonusLabelSpineContainer',
            file:'pickPoints',
            loop:true,
            pivotX:-120,
            pivotY:-60,
            container: displayList.wheelBonusLabelSpineContainer
        });

        for(let i = 0; i < 18; i++) {
            animationController.addAnimation({
                index:'ambientFireWork'+(i+1),
                file:'pickPoints',
                loop:true,
                pivotX:0,
                pivotY:0,
                container: displayList['fireworksContainer_'+(i+1)]
            });
        }

        displayList.playerNumbers.children.forEach((e,i) =>{
            animationController.addAnimation({
                index:'pickpoint_'+i,
                file:'coverAnims',
                loop:true,
                pivotX:0,
                pivotY:0,
                container: e
            });
        });

        displayList.overlayFireworksContainer.children.forEach((e,i) =>{
            animationController.addAnimation({
                index:'overlayFirework'+(i+1),
                file:'pickPoints',
                loop:true,
                pivotX:0,
                pivotY:0,
                container: e
            });
        });

        displayList.pickerFireWorks.children.forEach((e,i)=> {
            animationController.addAnimation({
                index: 'PickerFireWork' +(i+1),
                file: 'pickPoints',
                loop: true,
                pivotX: 0,
                pivotY: 0,
                container: e
            });
        });
        displayList.bigWinFireWorkContainer.children.forEach((e,i)=>{
            animationController.addAnimation({
                index:'bigWinFireworks'+(i+1),
                file:'pickPoints',
                loop:true,
                pivotX:0,
                pivotY:0,
                container: e
            });
        });

        displayList.fireworkLocations.children.forEach((e,i)=>{
            animationController.addAnimation({
                index:'fireworkLocationLand'+i,
                file:'pickPoints',
                loop:true,
                container: displayList.fireworklocSpineContainerLand
            });
            animationController.addAnimation({
                index:'fireworkLocationPort'+i,
                file:'pickPoints',
                loop:true,
                container: displayList.fireworklocSpineContainerPort
            });
            if(i < 8) {
                animationController.addAnimation({
                    index:'fireworkLocationWin'+i,
                    file:'pickPoints',
                    loop:true,
                    pivotX:0,
                    pivotY:0,
                    container: displayList['fireworkloc_'+(i+1)+'_SpineContainer']
                });
            }
        });

        animationController.addAnimation({
            index:'howToPlayPage2_sprite2',
            file:'pickPoints',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.howToPlayPage2_sprite2
        });

        animationController.addAnimation({
            index:'howToPlayPage3_sprite2',
            file:'pickPoints',
            loop:true,
            pivotX:0,
            pivotY:0,
            container: displayList.howToPlayPage3_sprite2
        });
    }

    msgBus.subscribe('animation.play', data => {
        animationController.playAnimation(data);
    });

    msgBus.subscribe('animation.add', data => {
        animationController.queueAnimation(data);
    });

    msgBus.subscribe('animation.set', data => {
        animationController.setAnimation(data);
    });

    msgBus.subscribe('animation.setEvents', data => {
        animationController.setEvents(data);
    });

    msgBus.subscribe('animation.clearTrack', data => {
        animationController.clearTrack(data);
    });

    msgBus.subscribe('animation.emptyAnimations', data =>{
        animationController.setEmptyAnimation(data);
    });

    msgBus.subscribe('animation.mix', data =>{
        animationController.mix(data);
    });

    function prefix() {
        return updatePrefix();
    }

    return {
        init,
        prefix
    };

});