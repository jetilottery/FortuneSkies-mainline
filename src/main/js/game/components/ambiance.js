define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    require('com/gsap/TimelineMax');
    let _enabled = true;

    let idleTween;

    let delayMod = 1;

    let fireWorkBounds = {
        x: [-1300, -925],
        y: [100, 100],
        width: [800, 500],
        height: [205, 300]
    };

    let slot;

    function sheenDelayTween () {
        msgBus.publish('game.base.sheen');
        sheen();
    }

    let fireWorkBoundsObject;

    let spineAnimationPool = [
        'backgroundFireworks/firework_1',
        'backgroundFireworks/firework_2',
        'backgroundFireworks/firework_3',
        'backgroundFireworks/firework_4',
        'backgroundFireworks/firework_5',
        'backgroundFireworks/firework_6',
        'backgroundFireworks/firework_7',
    ];
    let spineAnimationContainerPool = [
        {'container': 'fireworksContainer_1', 'firework': 'ambientFireWork1', 'inUse': false},
        {'container': 'fireworksContainer_2', 'firework': 'ambientFireWork2', 'inUse': false},
        {'container': 'fireworksContainer_3', 'firework': 'ambientFireWork3', 'inUse': false},
        {'container': 'fireworksContainer_4', 'firework': 'ambientFireWork4', 'inUse': false},
        {'container': 'fireworksContainer_5', 'firework': 'ambientFireWork5', 'inUse': false},
        {'container': 'fireworksContainer_6', 'firework': 'ambientFireWork6', 'inUse': false},
        {'container': 'fireworksContainer_7', 'firework': 'ambientFireWork7', 'inUse': false},
        {'container': 'fireworksContainer_8', 'firework': 'ambientFireWork8', 'inUse': false},
        {'container': 'fireworksContainer_9', 'firework': 'ambientFireWork9', 'inUse': false},
        {'container': 'fireworksContainer_10', 'firework': 'ambientFireWork10', 'inUse': false},
        {'container': 'fireworksContainer_11', 'firework': 'ambientFireWork11', 'inUse': false},
        {'container': 'fireworksContainer_12', 'firework': 'ambientFireWork12', 'inUse': false},
        {'container': 'fireworksContainer_13', 'firework': 'ambientFireWork13', 'inUse': false},
        {'container': 'fireworksContainer_14', 'firework': 'ambientFireWork14', 'inUse': false},
        {'container': 'fireworksContainer_15', 'firework': 'ambientFireWork15', 'inUse': false},
        {'container': 'fireworksContainer_16', 'firework': 'ambientFireWork16', 'inUse': false},
        {'container': 'fireworksContainer_17', 'firework': 'ambientFireWork17', 'inUse': false},
        {'container': 'fireworksContainer_18', 'firework': 'ambientFireWork18', 'inUse': false},
    ];

    let index = 0;
    let delay = 0;


    function sheen() {
        Tween.delayedCall(5, sheenDelayTween);
    }


    function init() {
        displayList.fireworksContainer.scale.y = -1;

        let ori = orientation.get() === orientation.LANDSCAPE ? 0 : 1;

        fireWorkBoundsObject = new PIXI.Graphics();
        fireWorkBoundsObject.beginFill(0xffffff);
        fireWorkBoundsObject.drawRect(
            0,
            0,
            fireWorkBounds.width[ori],
            fireWorkBounds.height[ori]
        );

        window.fireWorkBounds = fireWorkBoundsObject;

        fireWorkBoundsObject.position.set(
            fireWorkBounds.x[ori],
            fireWorkBounds.y[ori]
        );

        fireWorkBoundsObject.graphicsData[0].fillAlpha = 0;

        Tween.delayedCall(0.1,()=>{
            updateOrientation();

            slot.addChild(fireWorkBoundsObject);
            slot.addChild(displayList.fireworksContainer);

            fire();
        });
    }


    function fire() {
        if (_enabled) {
            let pool;
            pool = spineAnimationContainerPool[index];
            delay = Math.floor(Math.random() * (gameConfig.fireWorkMaxDelay / delayMod)) + (gameConfig.fireWorkMinDelay / delayMod);
            if (!pool['inUse']) {
                pool['inUse'] = true;
                Tween.delayedCall(delay, () => {

                    let posData = fireWorkBoundsObject.graphicsData[0].shape;

                    let rand = function (target, offset) {
                        return Math.floor(Math.random() * target) + offset || 0;
                    };
                    let pos = {
                        x: rand(posData.width, 0),
                        y: rand(-posData.height, 0)
                    };

                    let animationIndex = Math.floor(Math.random() * spineAnimationPool.length);
                    let localPos = {
                        x: fireWorkBoundsObject.x + pos.x,
                        y: pos.y - fireWorkBoundsObject.y
                    };

                    displayList[pool['container']].position.set(localPos.x, localPos.y);
                    displayList[pool['container']].scale.set(Math.random() * (0.75 - 0.5) + 0.5);

                    msgBus.publish('animation.play', {
                        index: pool['firework'],
                        anim: spineAnimationPool[animationIndex],
                    });


                    Tween.delayedCall(1.5, () => {
                        pool['inUse'] = false;
                        index++;
                        if (index > 17) {
                            index = 0;
                        }

                        fire();
                    });

                    index++;
                    if (index > 17) {
                        index = 0;
                    }

                });
            } else {
                index++;
                if (index > 17) {
                    index = 0;
                }
                fire();
            }
        }
    }

    function startIdle() {
        if (idleTween === undefined) {
            _enabled = false;
            idleTween = Tween.delayedCall(15, () => {
                _enabled = true;
                fire();
            });
        } else {
            idleTween.kill();
            idleTween = undefined;
            startIdle();
        }
    }

    function enableSheen() {
        sheen();
    }

    function disableSheen() {
        Tween.killTweensOf(sheenDelayTween);
    }

    function getFireworkBounds() {
        return fireWorkBoundsObject;
    }

    function updateOrientation() {
        if (orientation.get() === orientation.LANDSCAPE) {
            if(displayList.backgroundLand.children.length > 0) {
                slot = displayList.backgroundLand.children[0].slotContainers[displayList.backgroundLand.children[0].skeleton.findSlotIndex("particleFireworks")];
            }
        } else {
            if(displayList.backgroundPort.children.length > 0) {
                slot = displayList.backgroundPort.children[0].slotContainers[displayList.backgroundPort.children[0].skeleton.findSlotIndex("particleFireworks")];
            }
        }
    }

    function reset() {
        disableSheen();
    }

    msgBus.subscribe('game.ambiance.idle', startIdle);
    msgBus.subscribe('game.ambiance.transitionStart', () => {
        delayMod = 4;
        _enabled = true;
        fire();
    });
    msgBus.subscribe('game.ambiance.transitionEnd', () => {
        delayMod = 1;
    });
    msgBus.subscribe('Game.AutoPlayStop', () => {
        _enabled = true;
        fire();
    });
    msgBus.subscribe('Game.AutoPlayStart', () => {
        _enabled = false;
        disableSheen();
    });

    msgBus.subscribe('game.ambiance.enableSheen', enableSheen);
    msgBus.subscribe('game.ambiance.disableSheen', disableSheen);
    msgBus.subscribe('game.ambiance.halfRate', () => {
        delayMod = 0.5;
    });

    msgBus.subscribe('GameSize.OrientationChange', () => {
        updateOrientation();
    });


    return {
        get enable() {
            return _enabled;
        },
        set enable(value) {
            _enabled = value;
            fire();
        },
        getFireworkBounds,
        init,
        reset
    };
})
;