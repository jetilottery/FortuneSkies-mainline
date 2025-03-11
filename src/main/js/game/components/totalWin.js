define(require=>{
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const animController = require('game/components/animation/animationView');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    require('com/gsap/TimelineMax');

    const Tween = window.TweenMax;

    let originalY = [180,330];

    let fireWorkBounds = {
        x: [-500, -250],
        y: [100, -80],
        width: [800, 500],
        height: [205, 300]
    };

    let totalWinBitmapText;

    let fireWorkBoundsObject;

    function init() {
        displayList.winPlaqueValue.y = originalY[animController.prefix() === 'land' ? 0:1];

        let ori = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

        totalWinBitmapText = new PIXI.extras.BitmapText("", {
            font: "150px fortuneSkiesBitmapFont_YELLOW",
        });

        displayList.winPlaqueValueBitmapTextContainer.addChild(totalWinBitmapText);
        displayList.winPlaqueValue.alpha = 0;
        displayList.gameOverlay.alpha = 0;
        displayList.gameOverlay.renderable = false;

        fireWorkBoundsObject = new PIXI.Graphics();
        fireWorkBoundsObject.beginFill(0xffffff);
        fireWorkBoundsObject.drawRect(
            0,
            0,
            fireWorkBounds.width[ori],
            fireWorkBounds.height[ori]
        );
        window.TotalWinfireWorkBounds = fireWorkBoundsObject;

        fireWorkBoundsObject.position.set(
            fireWorkBounds.x[ori],
            fireWorkBounds.y[ori]
        );

        fireWorkBoundsObject.graphicsData[0].fillAlpha = 0;
    }

    function setTotalWin() {
        totalWinBitmapText.text = SKBeInstant.formatCurrency(meterData.win).formattedAmount;
        totalWinBitmapText.pivot.x = (totalWinBitmapText.width / 2) - totalWinBitmapText.x;
        totalWinBitmapText.pivot.y = (totalWinBitmapText.height / 2) - totalWinBitmapText.y;
    }

    function showOverlay() {
        displayList.gameOverlay.renderable = true;
        displayList.gameOverlay.alpha = 0;

        displayList.clickArea.parent.children[1].alpha = 0;
        displayList.clickArea.parent.children[2].alpha = 0;
        displayList.resultPlaqueOverlay.alpha = 0;
        displayList.gameOverlay.alpha = 0;

        Tween.to(displayList.clickArea.parent.children[1],0.25, {
            alpha: 1,
        });

        Tween.to(displayList.clickArea.parent.children[2],0.25, {
            alpha: 1,
        });

        Tween.to(displayList.resultPlaqueOverlay,0.25, {
            alpha: 1,
        });

        Tween.to(displayList.gameOverlay,1,{
            alpha:1
        });

        if(meterData.totalWin === 0) {
            displayList.gameOverSpineContainer.renderable = false;
        }
    }
    
    function showTotalWin() {
        displayList.winPlaqueValue.alpha = 0;

        setTotalWin();
        showOverlay();

        displayList.bigWinParticles.renderable = false;

        let animation = 'totalWinAnim_';

        if(meterData.totalWin > (meterData.ticketCost * 5)) {
            animation = 'bigWinAnim_L2_';
        }

        if(meterData.totalWin > (meterData.ticketCost * 20)) {
            animation = 'bigWinAnim_L3_';
        }

        msgBus.publish('animation.play', {
            index: 'overlay',
            anim: animation+animController.prefix(),
            loop: true
        });

        // let valueTimeline = new TimelineMax();
        //
        // valueTimeline.to(displayList.winPlaqueValue,1,{
        //     y:targetY[animController.prefix() === 'land' ? 0:1],
        //     alpha:1,
        // },0);
    }

    function reset() {
        displayList.winPlaqueValue.y = originalY[animController.prefix() === 'land' ? 0:1];

        displayList.winPlaqueValue.alpha = 0;
        displayList.gameOverlay.alpha = 0;
        displayList.gameOverlay.renderable = false;
        displayList.gameOverSpineContainer.renderable = true;

        displayList.bigWinContainer.addChild(displayList.bigWinParticles);
        displayList.bigWinParticles.renderable = false;
    }

    msgBus.subscribe('game.totalWin.show', showTotalWin);
    msgBus.subscribe('game.totalWin.overlay',showOverlay);
    msgBus.subscribe('game.totalWin.reset',reset);
    msgBus.subscribe('game.totalWin.init',init);

});