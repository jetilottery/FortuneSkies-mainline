define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const PickPoint = require('game/components/baseGame/PickPoint');
    const FireWorkLocation = require('game/components/baseGame/FireworkLocation');
    const pickPoint = require('game/components/baseGame/buttonSheen');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

    require('game/components/baseGame/fireworkMeter');
    require('com/gsap/easing/EasePack');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let pickPoints;
    let fireworkLocations;
    let numberData;

    let colorMap = null;

    let revealed = [];

    let fireworkIndex;

    let promise;

    function init() {
        pickPoints = [
            PickPoint.fromContainer(displayList.playerNumber1, ['TL', 'TL'], 0),
            PickPoint.fromContainer(displayList.playerNumber2, [null, null], 1),
            PickPoint.fromContainer(displayList.playerNumber3, [null, null], 2),
            PickPoint.fromContainer(displayList.playerNumber4, ['TR', null], 3),
            PickPoint.fromContainer(displayList.playerNumber5, [null, null], 4),
            PickPoint.fromContainer(displayList.playerNumber6, [null, 'TR'], 5),
            PickPoint.fromContainer(displayList.playerNumber7, [null, 'BL'], 6),
            PickPoint.fromContainer(displayList.playerNumber8, [null, null], 7),
            PickPoint.fromContainer(displayList.playerNumber9, ['BL', null], 8),
            PickPoint.fromContainer(displayList.playerNumber10, [null, null], 9),
            PickPoint.fromContainer(displayList.playerNumber11, [null, null], 10),
            PickPoint.fromContainer(displayList.playerNumber12, ['BR', 'BR'], 11),
        ];

        fireworkLocations = [
            FireWorkLocation.fromContainer(displayList.fireworkloc1, 0),
            FireWorkLocation.fromContainer(displayList.fireworkloc2, 1),
            FireWorkLocation.fromContainer(displayList.fireworkloc3, 2),
            FireWorkLocation.fromContainer(displayList.fireworkloc4, 3),
            FireWorkLocation.fromContainer(displayList.fireworkloc5, 4),
            FireWorkLocation.fromContainer(displayList.fireworkloc6, 5),
            FireWorkLocation.fromContainer(displayList.fireworkloc7, 6),
            FireWorkLocation.fromContainer(displayList.fireworkloc8, 7),
        ];

        pickPoints.forEach(e => {
            e.interactive = false;
            e.setToInactive();
        });

        fireworkLocations.forEach((e, i) => {
            msgBus.publish('animation.setEvents', {
                index: 'fireworkLocationLand' + i,
                event: {
                    'reveal': () => {
                        e.onRevealEvent();
                    }
                }
            });
            msgBus.publish('animation.setEvents', {
                index: 'fireworkLocationPort' + i,
                event: {
                    'reveal': () => {
                        e.onRevealEvent();
                    }
                }
            });
        });


        fireworkIndex = 0;

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
            track: 2,
            index: 'backgroundLand',
            anim: 'lightsAndWater',
            loop: true
        });

        msgBus.publish('animation.play', {
            track: 2,
            index: 'backgroundPort',
            anim: 'lightsAndWater',
            loop: true
        });

        pickPoint.init(pickPoints);

        msgBus.publish('game.base.meterInit');

        msgBus.subscribe('GameSize.OrientationChange', () => {

            displayList.backgroundLand.children[0].pivot.set(
                -720,
                -395
            );

            displayList.backgroundPort.children[0].pivot.set(
                -404,
                -730
            );

        });
    }

    function populate(data) {
        numberData = data;
    }

    function createColorMap() {
        let avalibleColors = [
            ['RED', '1'],
            ['PINK', '2'],
            ['BLUE', '3'],
            ['TEAL', '4'],
            ['ORANGE', '5'],
            ['GREEN', '6'],
            ['PURPLE', '7'],
        ];
        let pointData = [];
        let localColorMap = {};

        pointData = numberData.reduce((e, i) => {
            return e.includes(i) ? e : [...e, i];
        }, []);

        pointData.forEach(e => {

            let colorIndex = Math.floor(Math.random() * avalibleColors.length);
            localColorMap[e] = avalibleColors[colorIndex];
            avalibleColors.splice(avalibleColors.indexOf(avalibleColors[colorIndex]), 1);

        });

        return localColorMap;
    }

    function enable() {
        return new Promise(resolve => {
            promise = resolve;

            colorMap = createColorMap();

            Tween.to(displayList.pickerBonusLabelON, 0.3, {
                alpha: 0
            });

            Tween.to(displayList.wheelBonusLabelON, 0.3, {
                alpha: 0
            });

            msgBus.publish('game.base.sheen', pickPoints);
            msgBus.publish('game.base.hideInfo');

            Tween.delayedCall(1, () => {
                msgBus.publish('game.ambiance.halfRate');
            });
            msgBus.publish('game.ambiance.enableSheen');

            // Return an array of promises for each card's lifecycle
            return pickPoints.map(async point => {
                // Enable the card and wait for it to be revealed (manually or automatically)
                // Tween.delayedCall(0.7, async function () {
                //     point.showEnabled();
                // });

                await point.enable();
                fireworkIndex++;
                if (fireworkIndex === 8) {

                    msgBus.publish('UI.updateButtons', {
                        autoPlay: {enabled: false},
                        help: {enabled: false}
                    });
                }

                msgBus.publish('game.base.pointClicked');
                // Restart the idle timer tween
                const nextData = numberData.shift();
                point.populate(nextData);

                point.setToHidden();

                msgBus.publish('game.base.meterDecrease');
                let loc = setFireWorkLocations();

                loc.showValue(point.value, point.data, colorMap);

                checkMatch(point.data, point.value);

                checkEndOfGame();
            });
        });
    }

    function setFireWorkLocations() {
        let unusedFireworkLocationIndex = null;
        while (unusedFireworkLocationIndex === null) {
            let x = fireworkLocations[Math.floor(Math.random() * fireworkLocations.length)];
            if (x.assignedData === null) {
                unusedFireworkLocationIndex = x;
            }
        }
        return unusedFireworkLocationIndex;
    }

    function revealAll() {
        let tempIndex = 8 - fireworkIndex;
        let unrevealedPointsHolder = pickPoints.filter(number => number.enabled);
        let unrevealed = [];

        msgBus.publish('game.base.killSheen', {
            unrevealedPointsHolder
        });

        while (unrevealed.length < tempIndex) {
            let rand = Math.floor((Math.random() * unrevealedPointsHolder.length));
            let x = unrevealedPointsHolder[rand];
            if (unrevealed.filter(e => e.index === unrevealedPointsHolder[rand].index).length === 0) {
                unrevealed.push(x);
            }
        }

        pickPoints.forEach(e => {
            e.interactive = false;
        });

        return unrevealed.map(e => Tween.delayedCall(0, e.reveal, null, e));
    }

    function reset() {
        pickPoints.forEach(e => e.reset());
        fireworkLocations.forEach(e => e.reset());

        fireworkIndex = 0;

        colorMap = null;
        revealed = [];

        Tween.to(displayList.pickerBonusLabelON, 0.1, {
            alpha: 1
        });

        Tween.to(displayList.wheelBonusLabelON, 0.1, {
            alpha: 1
        });

        msgBus.publish('game.base.meterReset');
    }

    function checkMatch(revealData, amount) {
        revealed.push(revealData);

        if (revealed.filter(e => e === revealData).length === 2) {
            if (!autoPlay.enabled) {
                fireworkLocations.filter(e => e.assignedData === revealData).forEach(e => {
                    Tween.delayedCall(0.5, () => {
                        e.anticipation();
                    });
                });
            }
        }

        if (revealed.filter(e => e === revealData).length === 3) {
            fireworkLocations.filter(e => e.assignedData === revealData).forEach(e => {
                e.showWin();
                Tween.delayedCall(0.5, () => {
                    audio.playSequential('match', 0, 1);
                });
            });
            Tween.delayedCall(0.75, () => {
                meterData.win += amount;
            });
        }
    }

    function checkEndOfGame() {
        if (fireworkIndex === 8) {

            fireworkLocations.filter(e => e.winning === false).forEach(e => {
                if (e.canFade) {
                    Tween.delayedCall(1, () => {
                        e.fadeOut();
                    });
                }
            });

            Tween.delayedCall(1, () => {
                fireworkLocations.forEach(e => {
                    e.forceStopanticipationTween();
                });
            });

            pickPoints.forEach(e => {
                e.interactive = false;
                if (e.enabled) {
                    e.setToInactive();
                }
            });


            if (scenarioData.scenario.wheelGame === null && scenarioData.scenario.pickerGame === null) {
                Tween.delayedCall(1.6, () => {
                    msgBus.publish('game.gotoNext', {promise: promise});
                });
            } else {
                Tween.delayedCall(0.8, () => {
                    msgBus.publish('game.gotoNext', {promise: promise});
                });
            }


        }
    }

    function cleanup() {
        fireworkLocations.forEach(e => {
            if (e.assignedData === '1' || e.assignedData === '2') {
                e.parent.children[0].renderable = false;
            }
        });
    }

    function postSheen() {
        Tween.delayedCall(0.2, () => {
            pickPoints.forEach(e => {
                e.resetFlag = false;
            });
        });
    }


    msgBus.subscribe('Game.WinningNumber', checkMatch);
    msgBus.subscribe('game.base.cleanUp', cleanup);
    msgBus.subscribe('game.base.sheenPlayed', postSheen);
    msgBus.subscribe('game.base.hideInfo', () => {
        Tween.to(displayList.baseGameInfo, 0.25, {
            alpha: 0
        });
    });
    msgBus.subscribe('game.base.showInfo', () => {
        displayList.baseGameInfo.alpha = 1;
    });

    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
    };
});
