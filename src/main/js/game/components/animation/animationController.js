//version 1.5
define(require => {

    const resources = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TweenLite');

    const Tween = window.TweenLite;

    let animationList = {};

    function addAnimation(value) {
        let anim = new PIXI.spine.Spine(resources.spine[value.file].spineData);
        animationList[value.index] = {};
        animationList[value.index].index = value.index;
        animationList[value.index].spineObject = anim;
        animationList[value.index].name = value.name;
        animationList[value.index].loop = value.loop || false;

        animationList[value.index].eventFunctions = {};

        anim.position.set(
            value.x,
            value.y
        );

        anim.pivot.set(
            value.pivotX,
            value.pivotY
        );

        anim.index = value.index;

        if (value.back === undefined) {
            value.container.addChild(anim);
        } else {
            value.container.addChildAt(anim, 0);
        }

        anim.interactiveChildren = false;

    }

    function getAnimation(value) {
        return animationList[value];
    }

    function getAnimationList() {
        return animationList;
    }

    function setEvents(value) {
        attachEvents(value);
    }

    function playAnimation(value) {
        animationList[value.index].spineObject.state.setAnimation(
            value.track || 0,
            value.anim,
            value.loop || false
        );

        animationList[value.index].spineObject.state.timeScale = value.timeScale || 1;
    }

    function setAnimation(value) {
        animationList[value.index].spineObject.state.setCurrent(
            value.track || 0,
            value.anim,
            value.interupt || false
        );
    }

    function mix(value) {
        animationList[value.index].spineObject.state.data.setMix(
            value.from,
            value.to,
            value.duration || 0.25
        );
    }

    function queueAnimation(value) {
        animationList[value.index].spineObject.state.addAnimation(
            value.track || 0,
            value.anim,
            value.loop || false,
            value.delay || 0
        );

        animationList[value.index].spineObject.state.timeScale = value.timeScale || 1;
    }

    function clearTrack(value) {
        if (value.all !== undefined && value.all) {
            animationList[value.index].spineObject.state.clearTracks();
        } else {
            animationList[value.index].spineObject.state.clearTrack(value.track || 0);
        }
        animationList[value.index].spineObject.skeleton.setToSetupPose();
    }

    function setEmptyAnimation(value) {
        animationList[value.index].spineObject.state.setEmptyAnimations(value.mixTime || 0);
    }

    function attachEvents(value) {

        let exceptionList = [
            'complete',
            'start',
            'end',
            'dispose',
            'interrupted'
        ];

        if (value.event !== undefined) {

            exceptionList.forEach(e => {
                if (value.event[e] !== undefined && value.event[e] !== null)
                    if (animationList[value.index].eventFunctions[e] === undefined)
                        animationList[value.index].eventFunctions[e] = value.event[e];
            });

            if (value.event !== undefined && value.event !== null) {
                Object.keys(value.event).forEach(e => {
                    if (animationList[value.index].eventFunctions[e] === undefined) {
                        animationList[value.index].eventFunctions[e] = value.event[e];
                    }
                });

                animationList[value.index].spineObject.state.addListener({
                    event: function (entry, event) {
                        Object.keys(animationList[value.index].eventFunctions).forEach((e) => {
                            if (event.data.name === e && exceptionList.indexOf(e) === -1) {
                                animationList[value.index].eventFunctions[e]();
                            }
                        });
                    },
                    complete: () => {
                        if (animationList[value.index].eventFunctions['complete'] !== undefined) {
                            animationList[value.index].eventFunctions['complete']();
                        }
                    },
                    start: () => {
                        if (animationList[value.index].eventFunctions['start'] !== undefined) {
                            animationList[value.index].eventFunctions['start']();
                        }
                    },
                    end: () => {
                        if (animationList[value.index].eventFunctions['end'] !== undefined) {
                            animationList[value.index].eventFunctions['end']();
                        }
                    },
                    dispose: () => {
                        if (animationList[value.index].eventFunctions['dispose'] !== undefined) {
                            animationList[value.index].eventFunctions['dispose']();
                        }
                    },
                    interrupted: () => {
                        if (animationList[value.index].eventFunctions['interrupted'] !== undefined) {
                            animationList[value.index].eventFunctions['interrupted']();
                        }
                    }
                });
            }
        }
    }

    function fadeBetween(current, next, time) {
        Tween.to(current, time, {
            alpha: 0
        });
        Tween.to(next, time, {
            alpha: 1
        });
    }

    return {
        getAnimation,
        playAnimation,
        queueAnimation,
        fadeBetween,
        getAnimationList,
        addAnimation,
        setEvents,
        clearTrack,
        setEmptyAnimation,
        mix,
        setAnimation,
    };

});