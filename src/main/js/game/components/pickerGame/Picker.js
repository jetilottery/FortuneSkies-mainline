define(require => {
    const PIXI = require('com/pixijs/pixi');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    let animation = {
        picker_1 : {
            enable: 'tigerCake_loop',
            disable: 'tigerCake_dissable',
            static: 'tigerCake_static',
            reveal: 'tigerCake_reveal',
            over: 'tigerCake_over'
        },
        picker_2 : {
            enable: 'pheonixCake_loop',
            disable: 'pheonixCake_dissable',
            static: 'pheonixCake_static',
            reveal: 'pheonixCake_reveal',
            over: 'pheonixCake_over'
        },
        picker_3 : {
            enable: 'dragonCake_loop',
            disable: 'dragonCake_dissable',
            static: 'dragonCake_static',
            reveal: 'dragonCake_reveal',
            over: 'dragonCake_over'
        }
    };

    let possibleValues = {
        "M1": 10,
        "M2": 8,
        "M3": 6,
        "M4": 5,
        "M5": 4,
        "M6": 3,
        "M7": 2,
    };

    class Picker extends Pressable {
        constructor(container) {
            super();

            this.container = container;
            this.name = container.name;

            this.clickArea = new PIXI.Graphics();
            this.clickArea.beginFill(0xffffff);
            this.clickArea.drawRect(-125, -125, 250, 250);
            this.clickArea.endFill();

            this.clickArea.alpha = 0;
            this.selected = false;
            this.clicked = false;

            this.selectedFirework = "";

            this.nonWinningValueText = new PIXI.extras.BitmapText("",{
                font: "200px fortuneSkiesBitmapFont_GREY",
            });
            this.nonWinningValueText.pivot.y = 40;
            this.nonWinningValueText.alpha = 0;
            this.nonWinningValueText.anchor.set(0.5);

            this.addChild(this.clickArea);
            this.addChild(this.nonWinningValueText);

            this.on('press', this.onClick);
            this.on('mouseout',this.onMouseOut);
            this.on('mouseover', this.onMouseOver);

            this.value = 0;
            this.noWinningValue = 0;
            this.color = "";

            this.winningValue = false;
            this.container.addChild(this);

            switch (this.name) {
                case 'picker_1': {
                    this.selectedFirework = 'bonusPickerFireworks/tigerFireworks/firework_';
                    this.color = 'PINK';
                    break;
                }
                case 'picker_2': {
                    this.selectedFirework = 'bonusPickerFireworks/phoenixFireworks/firework_';
                    this.color = 'TEAL';
                    break;
                }
                case 'picker_3': {
                    this.selectedFirework = 'bonusPickerFireworks/dragonFireworks/firework_';
                    this.color = 'ORANGE';
                    break;
                }
            }

            msgBus.publish('animation.mix', {
                index: this.name,
                from: animation[this.name].enable,
                to: animation[this.name].static
            });
            msgBus.publish('animation.mix', {
                index: this.name,
                from: animation[this.name].static,
                to: animation[this.name].enable
            });

            msgBus.publish('animation.mix', {
                index: this.name,
                from: animation[this.name].enable,
                to: animation[this.name].over
            });
            msgBus.publish('animation.mix', {
                index: this.name,
                from: animation[this.name].over,
                to: animation[this.name].enable
            });

            msgBus.publish('animation.play', {
                index: this.name,
                anim: animation[this.name].static,
                loop: 0,
            });

            this.enabled = false;
        }

        onClick() {
            if (this.enabled) {
                this.value = possibleValues[scenarioData.scenario.pickerGame];
                this.winningValue = true;
                this.showWin();
                this.reveal();

                this.clicked = true;

                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].reveal,
                    loop: false,
                });

                msgBus.publish('UI.updateButtons', {
                    help: { enabled: false },
                });
            }
        }

        onMouseOver() {
            this.selected = true;
            msgBus.publish('game.picker.mouseOver');
        }

        onMouseOut() {
            msgBus.publish('game.picker.mouseOut');
        }

        handleMouseOver() {
            if(!this.selected && !this.clicked) {
                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].static,
                    loop: true,
                });
            } else {
                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].over,
                    loop: true,
                });
            }
        }

        handleMouseOut() {
            this.selected = false;
            if(this.enabled && !this.clicked) {
                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].enable,
                    loop: true,
                });
            }
        }

        showWin() {
            msgBus.publish('game.picker.showValue', {
                value: this.value,
                selectedFirework:this.selectedFirework,
                color:this.color
            });
        }

        showNonWin() {
            Tween.to(this.nonWinningValueText, 0.5, {
                alpha: 0.5,
            });
            if (!this.winningValue && gameConfig.showlosingValue) {
                this.noWinningValue = this.randomLosingValue();
                this.nonWinningValueText.text = this.noWinningValue + "x";
            }
        }

        showDisabledState() {
            this.enabled = false;
            if (!this.winningValue && gameConfig.showlosingValue) {
                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].disable,
                    loop: true,
                });
            }
        }

        static returnPossibleValues(val) {
            return possibleValues[val];
        }

        randomLosingValue() {
            let winningValue = scenarioData.scenario.pickerGame;

            let random = function () {
                let output = Math.floor(Math.random() * 6) + 1;
                if (Object.keys(possibleValues)[output] === winningValue || Object.keys(possibleValues)[output] === undefined) {
                    return random();
                } else {
                    return possibleValues[Object.keys(possibleValues)[output]];
                }
            };

            return random();
        }

        populate(value) {
            this.value = value;
            this.noWinningValue = this.randomLosingValue();
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;

                msgBus.publish('animation.play', {
                    index: this.name,
                    anim: animation[this.name].enable,
                    loop: true,
                });

            }).then(() => {
                this.enabled = false;
            });
        }

        reset() {
            this.value = 0;
            this.noWinningValue = 0;
            this.nonWinningValueText.alpha = 0;
            this.nonWinningValueText.text = "";
            this.winningValue = false;
            this.enabled = false;

            this.clicked = false;
            this.selected = false;

            msgBus.publish('animation.play', {
                index: this.name,
                anim: animation[this.name].static,
                loop: true,
            });

        }
    }


    return Picker;

});