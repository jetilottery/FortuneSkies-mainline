define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    class Pickpoint extends Pressable {
        constructor(pos, index) {
            super();

            this.animationMap = {
                'STATIC': '',
                'HIGHLIGHT': '',
                'OUT': '',
                'OVER': '',
                'PRESS': '',
                'OFF': ''
            };

            this.positionMod = null || pos;
            this.index = index;

            this.orientationPointer = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

            this.resetFlag = false;

            this.clickArea = new PIXI.Graphics();
            this.clickArea.beginFill(0xffffff);
            this.clickArea.drawRect(-62, -46, 125, 92);
            this.clickArea.endFill();

            this.clickArea.alpha = 0;

            this.addChild(this.clickArea);

            this.data = null;
            this.value = 0;

            this.disableSheenIdle = false;

            this.animationMap['STATIC'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_STATIC' : 'button_STATIC';
            this.animationMap['HIGHLIGHT'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_HIGHLIGHT' : 'button_HIGHLIGHT';
            this.animationMap['OUT'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_OUT' : 'button_OUT';
            this.animationMap['OVER'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_OVER' : 'button_OVER';
            this.animationMap['PRESS'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_PRESS' : 'button_PRESS';
            this.animationMap['OFF'] = this.positionMod[this.orientationPointer] !== null ? this.positionMod[this.orientationPointer] + '_button_OFF' : 'button_OFF';

            msgBus.publish('animation.play', {
                index: 'pickpoint_' + this.index,
                anim: this.animationMap['STATIC'],
                loop: true
            });

            this.on('press', () => {
                if (!autoPlay.enabled) {

                    msgBus.publish('animation.play', {
                        index: 'pickpoint_' + this.index,
                        anim: this.animationMap['PRESS'],
                        loop: false
                    });

                    msgBus.publish('game.ambiance.idle');
                    msgBus.publish('game.ambiance.disableSheen');

                    audio.play('revealAll',0,1);

                    this.reveal();
                }
            });

            msgBus.subscribe('game.ambiance.pointClicked',()=>{
                this.disableSheenIdle = true;
            });

        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;

                msgBus.publish('animation.add', {
                    index: 'pickpoint_' + this.index,
                    anim: this.animationMap['OFF'],
                    loop: false
                });

                this.interactive = false;

                this.on('mouseout', this.mouseOut);
                this.on('mouseover', this.mouseOver);

            }).then(() => {
                this.enabled = false;
                msgBus.publish('game.base.killStartSheen');
            });
        }

        showEnabled() {

            msgBus.publish('animation.clearTrack', {
                index: 'pickpoint_' + this.index,
            });

            msgBus.publish('animation.play', {
                index: 'pickpoint_' + this.index,
                anim: this.animationMap['STATIC'],
                loop: true
            });

            msgBus.publish('game.base.sheenPlayed');
            this.interactive = true;
        }

        mouseOut() {
            if (!autoPlay.enabled) {
                if (!this.resetFlag) {
                    msgBus.publish('animation.play', {
                        index: 'pickpoint_' + this.index,
                        anim: this.animationMap['OUT'],
                        loop: false
                    });
                }
                if(!this.disableSheenIdle) {
                    msgBus.publish('game.ambiance.enableSheen');
                }
            }
        }

        mouseOver() {
            if (!autoPlay.enabled) {
                if (!this.resetFlag) {
                    msgBus.publish('animation.play', {
                        index: 'pickpoint_' + this.index,
                        anim: this.animationMap['OVER'],
                        loop: false
                    });
                }
            }
            msgBus.publish('game.ambiance.disableSheen');
        }

        populate(number) {
            this.data = number;
            this.value = prizeData.prizeTable[number];

            switch (number) {
                case 1: {
                    msgBus.publish('game.bonus.activate');
                    break;
                }
                case 2: {
                    msgBus.publish('game.picker.activate');
                    break;
                }
            }
        }

        hide() {
            this.renderable = false;
            this.interactive = false;
        }

        setToInactive() {
            msgBus.publish('animation.play', {
                index: 'pickpoint_' + this.index,
                anim: this.animationMap['OFF'],
                loop: false
            });
        }

        setToHidden() {
            msgBus.publish('animation.play', {
                index: 'pickpoint_' + this.index,
                anim: this.animationMap['PRESS'],
                loop: false
            });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        sheen() {
            if(this.enabled) {
                msgBus.publish('animation.play', {
                    index: 'pickpoint_' + this.index,
                    anim: this.animationMap['HIGHLIGHT'],
                    loop: false
                });
                msgBus.publish('animation.add', {
                    index: 'pickpoint_' + this.index,
                    anim: this.animationMap['STATIC'],
                    loop: false
                });
            }
        }

        reset() {
            this.enabled = false;
            this.revealed = false;
            this.matched = false;
            this.renderable = true;
            this.resetFlag = true;

            msgBus.publish('animation.play', {
                index: 'pickpoint_' + this.index,
                anim: this.animationMap['OFF'],
                loop: false
            });

            this.off('mouseout', this.mouseOut);
            this.off('mouseover', this.mouseOver);
        }

        static fromContainer(container, pos, index) {
            const sym = new Pickpoint(pos, index);
            container.addChild(sym);
            return sym;
        }
    }

    return Pickpoint;
});
