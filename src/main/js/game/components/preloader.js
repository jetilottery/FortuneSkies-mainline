define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    // const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    // const orientation = require('skbJet/componentManchester/standardIW/orientation');

    function preload(app, callback) {
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['coverAnims_atlas_page_coverAnims.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['coverAnims_atlas_page_coverAnims.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['buyButtonHighlight_atlas_page_buyButtonHighlight.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelBonus_atlas_page_wheelBonus.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelBonus_atlas_page_wheelBonus2.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelBonus_atlas_page_wheelBonus3.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims2.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims2.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims3.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['backgroundAnims_atlas_page_backgroundAnims4.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickerBonus_atlas_page_pickerBonus.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickerBonus_atlas_page_pickerBonus.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickerBonus_atlas_page_pickerBonus2.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickerBonus_atlas_page_pickerBonus3.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints2.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints3.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints4.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints5.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints6.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints7.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints8.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints9.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints10.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints11.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['pickPoints_atlas_page_pickPoints12.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['totalWinAndTransitions_atlas_page_totalWinAndTransitions.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['totalWinAndTransitions_atlas_page_totalWinAndTransitions2.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['totalWinAndTransitions_atlas_page_totalWinAndTransitions3.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['totalWinAndTransitions_atlas_page_totalWinAndTransitions4.jpg']);
        app.renderer.plugins.prepare.upload(callback);
    }

    function textFix() {
        displayList.pickerText.maxWidth = displayList.pickerText.height > 200 ? 400 : 700;
        displayList.moveToMoneyButton.label.maxWidth = 250;
        displayList.autoPlayStartButton.label.maxWidth = 250;
        displayList.autoPlayStopButton.label.maxWidth = 250;
        displayList.ticketSelectCostValue.maxWidth = 180;
    }

    return {
        preload,
        textFix
    };
});