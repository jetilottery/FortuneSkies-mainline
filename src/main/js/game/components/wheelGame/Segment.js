define(require => {
    const PIXI = require('com/pixijs/pixi');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const text = require('skbJet/componentManchester/standardIW/components/fittedText');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');


    let animaitonArrows = [
        'arrow_frame1',
        'arrow_frame2',
        'arrow_frame3',
        'arrow_frame4'
    ];


    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    require('com/gsap/easing/EasePack');

    class Segment extends PIXI.Container {
        constructor(data) {
            super();

            this.text = new text("");
            this.sprite = new PIXI.extras.AnimatedSprite(animaitonArrows.map(PIXI.Texture.from));
            this.sprite.rotation = Math.PI / 2;
            this.sprite.visible = false;
            this.sprite.gotoAndPlay(0);
            this.sprite.animationSpeed = 0.1;
            this.prize = 0;

            this.index = data.index;

            this.styles = [textStyles.parse('segmentOuter'), textStyles.parse('segmentInner')];

            this.rotation = data.rotation;
            this.pivot.x = data.pivot - data.offset;

            this.data = data.assignedData;

            this.sprite.anchor.set(0.5, 1);
            this.text.anchor.set(0, 0.5);

            this.addChild(
                this.text,
                this.sprite,
            );
        }

        update(index) {
            if (typeof this.data === 'string') {
                if (this.data === 'Z') {
                    this.sprite.visible = true;
                } else if (this.data === 'X') {
                    this.text.text = resources.i18n.Game.wheelCollect; //'COLLECT';
                    this.text.style = textStyles.parse('segmentLose');
                } else {
                    if (this.data !== '0') {
                        this.prize = prizeData.prizeTable[this.data];
                        this.text.text = SKBeInstant.formatCurrency(this.prize).formattedAmount;
                        this.text.style = this.styles[index];
                    } else {
                        this.text.text = resources.i18n.Game.wheelCollect; //'COLLECT';
                        this.text.style = textStyles.parse('segmentLose');
                    }
                }
            }
            this.text.maxWidth = 150;
        }

        land() {

            Tween.to({}, 1, {
                onComplete: () => {
                    if (['Z', 'X', '0'].indexOf(this.data) === -1) {
                        msgBus.publish('game.wheel.addToBonusWin', {
                            amount: this.prize
                        });
                    }
                }
            });

            msgBus.publish('game.wheel.showWin');
        }

        reset() {

        }
    }

    return Segment;

});