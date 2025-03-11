define(require => {
    require('com/pixijs/pixi-particles');

    const PIXI = require('com/pixijs/pixi');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const animController = require('game/components/animation/animationView');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;


    class FireworkLocation extends PIXI.Container {
        constructor(parent, index) {
            super();

            this.prefix = animController.prefix();

            this.location = null;
            this.index = index;
            this.assignedData = null;

            this.parent = parent;

            this.container = new PIXI.Container();
            this.bitmapTextContainer = new PIXI.Sprite();
            // this.bitmapTextContainer.anchor.set(0.5);


            this.bonusLabelContainer = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.bonusLabelContainer.anchor.set(0.5);

            this.value = null;
            this.winning = false;

            this.background = new PIXI.Graphics();
            this.background.beginFill(0xffffff);
            this.background.drawRect(0, 0, 500, 500);
            this.background.endFill();


            this.background.alpha = 0;

            this.addChild(this.bitmapTextContainer);
            this.addChild(this.bonusLabelContainer);
            this.addChildAt(this.background, 0);
            this.renderable = false;

            msgBus.publish('animation.play', {
                index: 'fireworkLocationWin' + index,
                anim: 'matchHighlight',
                loop: true
            });

            this.fadeTween = null;
            this.canFade = false;

            this.parent.children[0].renderable = false;

            this.revealEvent = null;

            this.anticipationTween = new Tween.to(this.bitmapTextContainer.scale,1,{
                x:1.1,
                y:1.1,
                repeat:-1,
                yoyo:true
            });

            this.anticipationTween.pause();

            this.showValueTween = new Tween.delayedCall(0.1,()=>{
                this.value.renderable = true;
                this.value.alpha = 0;

                Tween.to(this.value,0.5,{
                    alpha:1
                });
            });
            this.showValueTween.pause();

            this.showWheelBonus = Tween.delayedCall(0.8,()=>{
                msgBus.publish('game.meters.bonus');
                msgBus.publish('animation.play', {
                    index: 'fireworkLocationWin' + this.location,
                    anim: 'bonusLogoHighlight',
                    loop: true
                });

                Tween.to(this.bonusLabelContainer.scale, 0.3, {
                    x: 0.3,
                    y: 0.3,
                });

                Tween.to(this.bonusLabelContainer, 0.3, {
                    onComplete:()=>{
                        this.parent.children[0].renderable = true;
                    },
                    alpha: 1,
                });
            });
            this.showWheelBonus.pause();

            this.showPickerBonus = Tween.delayedCall(0.8,()=>{
                msgBus.publish('game.meters.picker');
                msgBus.publish('animation.play', {
                    index: 'fireworkLocationWin' + this.location,
                    anim: 'bonusLogoHighlight',
                    loop: true
                });
                Tween.to(this.bonusLabelContainer.scale, 0.3, {
                    onComplete:()=>{
                        this.parent.children[0].renderable = true;
                    },
                    x: 0.3,
                    y: 0.3,
                });

                Tween.to(this.bonusLabelContainer, 0.3, {
                    alpha: 1,
                });
            });
            this.showPickerBonus.pause();
        }

        showValue(value, data, colorMap) {

            let fireworkColorValue;

            this.location = this.index;
            this.assignedData = data;

            if (["1", "2"].indexOf(data) === -1) {
                this.value = new PIXI.extras.BitmapText("", {
                    font: "180px fortuneSkiesBitmapFont_" + this.setColor(colorMap[data][0]),
                });

                fireworkColorValue = colorMap[data][1];
                this.value.text = SKBeInstant.formatCurrency(value).formattedAmount;
                this.bitmapTextContainer.addChild(this.value);

                this.value.y = -20;
                this.value.pivot.x = this.value.width / 2;
                this.value.pivot.y = 125;

                this.canFade = true;

                msgBus.publish('animation.play', {
                    index: 'fireworkLocationWin' + this.location,
                    anim: 'matchHighlight',
                    loop: true
                });

            } else {

                switch (data) {
                    case "1": {
                        this.bonusLabelContainer.texture = PIXI.Texture.from('wheelTransitionLogo');
                        this.bonusLabelContainer.scale.set(0);
                        this.bonusLabelContainer.alpha = 0;

                        fireworkColorValue = 8;
                        break;
                    }
                    case "2": {
                        this.bonusLabelContainer.texture = PIXI.Texture.from('pickerTransitionLogo');
                        this.bonusLabelContainer.scale.set(0);
                        this.bonusLabelContainer.alpha = 0;

                        fireworkColorValue = 9;
                        break;
                    }
                }

                Tween.delayedCall(0.5,()=>{
                    audio.play('bonusTriggered',0,1);
                });

            }

            msgBus.publish('animation.play', {
                index: 'fireworkLocationLand' + this.location,
                anim: 'land/pickPoint_' + (this.location + 1) + '/firework_' + fireworkColorValue,
                loop: false
            });

            msgBus.publish('animation.play', {
                index: 'fireworkLocationPort' + this.location,
                anim: 'port/pickPoint_' + (this.location + 1) + '/firework_' + fireworkColorValue,
                loop: false
            });

            Tween.delayedCall(0.5,()=>{
                audio.playRandom('fireWorkReveal',false,1);
            });

        }

        setColor(color) {
            return color;
        }

        onRevealEvent() {
            this.renderable = true;

            msgBus.publish('animation.play', {
                track: 1,
                index: 'backgroundLand',
                anim: 'buildingHighlights',
                loop: false
            });

            msgBus.publish('animation.play', {
                track: 1,
                index: 'backgroundPort',
                anim: 'buildingHighlights',
                loop: false
            });


            if (["1", "2"].indexOf(this.assignedData) === -1) {
                this.showValueTween.play();
            } else {
                switch (this.assignedData) {
                    case "1": {
                        this.showWheelBonus.play();
                        break;
                    }
                    case "2": {
                        this.showPickerBonus.play();
                        break;
                    }
                }
            }
        }

        fadeOut() {
            if(this.alpha !== 0.5) {
                Tween.to(this.value, 1, {
                    delay: 1,
                    alpha: 0.5
                });

                this.anticipationTween.pause();

                Tween.to(this.bitmapTextContainer.scale,0.5,{
                    x:1,
                    y:1,
                });
            }
        }

        forceStopanticipationTween() {
            this.anticipationTween.pause();

            if(this.value !== null) {
                Tween.to(this.bitmapTextContainer.scale,0.5,{
                    x:1,
                    y:1,
                });
            }
        }

        anticipation() {
            this.anticipationTween.play();
        }

        showWin() {
            Tween.delayedCall(1, () => {
                this.anticipationTween.pause();
                Tween.to(this.bitmapTextContainer.scale,0.5,{
                    x:1,
                    y:1,
                });

                this.parent.children[0].renderable = true;
                this.parent.children[0].alpha = 0;
                Tween.to(this.parent.children[0], 0.3, {
                    alpha: 1,
                });
            });

            this.winning = true;
        }

        reset() {
            if (this.value !== null) {
                this.value.renderable = false;
                this.value.text = "";
                this.value.alpha = 1;
            }
            this.renderable = false;
            this.parent.children[0].renderable = false;
            this.assignedData = null;
            this.bonusLabelContainer.texture = PIXI.Texture.EMPTY;
            this.winning = false;
            this.canFade = false;
            this.fadeTween = null;
            this.revealEvent = null;

            this.anticipationTween.pause();
            if(this.value !== null) {
                Tween.to(this.bitmapTextContainer.scale,0.5,{
                    x:1,
                    y:1,
                    onComplete:()=>{
                        this.anticipationTween.restart();
                        this.anticipationTween.pause();
                    }
                });
            } else {
                this.anticipationTween.restart();
                this.anticipationTween.pause();
            }


            this.showValueTween.restart();
            this.showWheelBonus.restart();
            this.showPickerBonus.restart();

            this.showValueTween.pause();
            this.showWheelBonus.pause();
            this.showPickerBonus.pause();
        }

        static fromContainer(container, index) {
            const fireworkLoc = new FireworkLocation(container, index);
            container.addChild(fireworkLoc);
            return fireworkLoc;
        }
    }

    return FireworkLocation;

});