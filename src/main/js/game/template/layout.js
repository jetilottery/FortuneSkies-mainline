define({
    _BASE_APP: {
        children: ['backgroundPort', 'backgroundLand', 'fireworksContainer', 'gameContainer', 'gameHoldingContainer', 'overlayAnnouncement'],
    },

    /*
     * BACKGROUND
     */
    backgroundPort: {
        type: 'sprite',
    },
    backgroundLand: {
        type: 'sprite',
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 1195,
            y: 82,
            texture: 'landscapeLogo',
        },
        portrait: {
            x: 405,
            y: 120,
            texture: 'landscapeLogo',
        },
    },

    gameOverlay: {
        children: ['gameOverSpineContainer']
    },

    gameOverSpineContainer: {
        type: 'container',
        children: [
            'bigWinContainer'
        ]
    },

    overlayAnnouncement: {
        type: 'container',
        children: [
            'overlayFireworksContainer',
            'overlayAnnouncementSpineContainer',
            'wheelIntro',
            'pickerIntro'
        ]
    },

    overlayAnnouncementSpineContainer: {
        type: 'container',
        alpha: 0,
    },

    overlayFireworksContainer: {
        type: 'container',
        children: [
            'overlayFireworks_1',
            'overlayFireworks_2',
            'overlayFireworks_3',
            'overlayFireworks_4',
            'overlayFireworks_5',
            'overlayFireworks_6',
            'overlayFireworks_7',
            'overlayFireworks_8',
            'overlayFireworks_9',
            'overlayFireworks_10',
        ]
    },

    overlayFireworks_1: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_2: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_3: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_4: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_5: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_6: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_7: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_8: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_9: {
        type: 'container',
        scale: 3
    },
    overlayFireworks_10: {
        type: 'container',
        scale: 3
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToContainer'],
        landscape: { x: 1200, y: 175 },
        portrait: { x: 405, y: 230 },
    },
    winUpToContainer: {
        type: 'sprite',
        children: ['winUpToIn', 'winUpToOut'],
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText', 'winUpToLabel'],
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpToValue',
        maxWidth: 200,
        landscape: {
            anchor: { x: 0, y: 0.5 },
            x: 0,
            y: 0
        },
        portrait: {
            anchor: { x: 0.5, y: 0 },
            x: 0,
            y: -20
        }
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText', 'winUpToLabel2'],
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpToValue',
        maxWidth: 200,
        landscape: {
            anchor: { x: 0, y: 0.5 },
            x: 0,
            y: 0
        },
        portrait: {
            anchor: { x: 0.5, y: 0 },
            x: 0,
            y: -20
        }
    },

    winUpToLabel: {
        type: 'text',
        style: 'winUpToLabel',
        string: 'winUpTo',
        maxWidth: 200,
        landscape: {
            y: 4,
            scale: 1,
            anchor: { x: 0, y: 0.5 },
        },
        portrait: {
            y: -10,
            scale: 0.7,
            anchor: { x: 0.5, y: 1 },
        },
    },
    winUpToLabel2: {
        type: 'text',
        style: 'winUpToLabel',
        string: 'winUpTo',
        maxWidth: 200,
        landscape: {
            y: 4,
            scale: 1,
            anchor: { x: 0, y: 0.5 },
        },
        portrait: {
            y: -10,
            scale: 0.7,
            anchor: { x: 0.5, y: 1 },
        },
    },

    /*
     * PLAYER NUMBERS
     */
    gameContainer: {
        type: 'container',
        children: [
            'landscapeContainer',
            'portraitContainer',
        ]
    },

    landscapeContainer: {
        type: 'container',
        children: [
            'gameContainer_1',
            'gameContainer_2',
            'gameContainer_3',
        ]
    },
    portraitContainer: {
        type: 'container',
    },

    fireworksContainer: {
        type: 'container',
        children: [
            'fireworksContainer_1',
            'fireworksContainer_2',
            'fireworksContainer_3',
            'fireworksContainer_4',
            'fireworksContainer_5',
            'fireworksContainer_6',
            'fireworksContainer_7',
            'fireworksContainer_8',
            'fireworksContainer_9',
            'fireworksContainer_10',
            'fireworksContainer_11',
            'fireworksContainer_12',
            'fireworksContainer_13',
            'fireworksContainer_14',
            'fireworksContainer_15',
            'fireworksContainer_16',
            'fireworksContainer_17',
            'fireworksContainer_18',
        ]
    },

    fireworksContainer_1: {
        type: 'container'
    },
    fireworksContainer_2: {
        type: 'container'
    },
    fireworksContainer_3: {
        type: 'container'
    },
    fireworksContainer_4: {
        type: 'container'
    },
    fireworksContainer_5: {
        type: 'container'
    },
    fireworksContainer_6: {
        type: 'container'
    },
    fireworksContainer_7: {
        type: 'container'
    },
    fireworksContainer_8: {
        type: 'container'
    },
    fireworksContainer_9: {
        type: 'container'
    },
    fireworksContainer_10: {
        type: 'container'
    },
    fireworksContainer_11: {
        type: 'container'
    },
    fireworksContainer_12: {
        type: 'container'
    },
    fireworksContainer_13: {
        type: 'container'
    },
    fireworksContainer_14: {
        type: 'container'
    },
    fireworksContainer_15: {
        type: 'container'
    },
    fireworksContainer_16: {
        type: 'container'
    },
    fireworksContainer_17: {
        type: 'container'
    },
    fireworksContainer_18: {
        type: 'container'
    },


    gameHoldingContainer: {
        type: 'container',
        children: [
            'wheelGame',
            'pickerGame',
        ]
    },

    gameContainer_1: {
        type: 'container',
        children: ['baseGame']
    },
    gameContainer_2: {
        type: 'container',
        landscape: {
            x: 2880
        },
        portrait: {
            x: 1620
        }
    },
    gameContainer_3: {
        type: 'container',
        landscape: {
            x: 5760
        },
        portrait: {
            x: 3240
        }
    },

    wheelIntro: {
        type: 'container',
        children: [
            'wheelIntroSprite',
        ],
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        },
        alpha: 0
    },
    wheelIntroSprite: {
        type: 'sprite',
        texture: 'wheelTransitionLogo',
        anchor: 0.5,
        landscape: {
            x: 0,
            y: 0,
            scale: 1
        },
        portrait: {
            x: 0,
            y: 0,
            scale: 0.8
        }
    },

    pickerIntro: {
        type: 'container',
        children: [
            'pickerIntroSprite'
        ],
        alpha: 0,
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },

    pickerIntroSprite: {
        type: 'sprite',
        texture: 'pickerTransitionLogo',
        anchor: 0.5,
        landscape: {
            x: 0,
            y: 0,
            scale: 1
        },
        portrait: {
            x: 0,
            y: 0,
            scale: 0.8
        }
    },

    baseGame: {
        type: 'container',
        children: [
            'fireworkLocations',
            'playerNumbers',
            'fireWorkMeter',
            'bonusesContainer',
            'winUpTo',
            'logo',
            'baseGameInfo'
        ],
        landscape: {
            x: 0,
            y: 0
        },
        portrait: {
            x: 0,
            y: 0
        },
    },

    pickerGame: {
        type: 'container',
        children: [
            'pickerGameContainer'
        ],
        landscape: {
            x: 0,
            y: 0
        },
        portrait: {
            x: 0,
            y: 0
        },
    },

    pickerGameContainer: {
        type: 'container',
        children: [
            'pickerText',
            'pickerOverlayContainer',
            'picker_1',
            'picker_2',
            'picker_3',
            'pickerPostTotalWinBackground',
            'pickerTextContainter',
            'pickerLogo',
            'pickerFireWorks',
        ]
    },

    pickerOverlayContainer: {
        type: 'container',
        children: [
            'pickerOverlay'
        ]
    },

    pickerTextContainter: {
        type: 'container',
        children: [
            'pickerMultiplyer',
            'pickerTotalWin',
            'pickerPostTotalWinLand',
            'pickerPostTotalWinPort'
        ],
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720,
        }

    },
    pickerOverlay: {
        type: 'rectangle',
        landscape: {
            width: 1440,
            height: 810,
            fill: 0x000000,
            fillAlpha: 0.5,
        },
        portrait: {
            width: 810,
            height: 1440,
            fill: 0x000000,
            fillAlpha: 0.5,
        },
    },

    picker_1: {
        type: 'container',
        landscape: {
            x: 310,
            y: 570,
            scale: 1,
        },
        portrait: {
            x: 125,
            y: 1110,
            scale: 0.8,
        },
        anchor: 0.5
    },
    picker_2: {
        type: 'container',
        landscape: {
            x: 720,
            y: 570,
            scale: 1,
        },
        portrait: {
            x: 405,
            y: 1100,
            scale: 0.8,
        },
        anchor: 0.5
    },
    picker_3: {
        type: 'container',
        landscape: {
            x: 1135,
            y: 580,
            scale: 1,
        },
        portrait: {
            x: 690,
            y: 1110,
            scale: 0.8,
        },
        anchor: 0.5
    },

    pickerLogo: {
        type: 'container',
        children: [
            'pickerLogoLandscape',
            'pickerLogoPortrait'
        ]
    },

    pickerLogoLandscape: {
        type: 'sprite',
        texture: 'pickerTransitionLogo',
        anchor: 0.5
    },
    pickerLogoPortrait: {
        type: 'sprite',
        texture: 'pickerTransitionLogo',
        anchor: 0.5
    },

    pickerMultiplyer: {
        type: 'container',
        maxWidth: 400,
        anchor: 0.5,
    },

    pickerTotalWin: {
        type: 'container',
        maxWidth: 400,
        pivot: {
            y: -75
        },
        anchor: 0.5,
    },

    pickerPostTotalWinLand: {
        type: 'container',
        maxWidth: 400,
        anchor: 0.5,
    },
    pickerPostTotalWinPort: {
        type: 'container',
        maxWidth: 400,
        anchor: 0.5,
    },

    pickerPostTotalWinBackground: {
        type: 'container',
        maxWidth: 400,
        anchor: 0.5,
        landscape: {
            x: 710,
            y: 300,
        },
        portrait: {
            x: 405,
            y: 605
        },
        scale: 3
    },


    pickerText: {
        type: 'text',
        style: 'pickerBonusInfo',
        string: 'pickerText',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 335,
        },
        portrait: {
            x: 405,
            y: 660,
            maxWidth: 750
        }
    },

    pickerFireWorks: {
        type: 'container',
        children: [
            'PickerFireWork1',
            'PickerFireWork2',
            'PickerFireWork3',
            'PickerFireWork4',
            'PickerFireWork5',
            'PickerFireWork6',
            'PickerFireWork7',
            'PickerFireWork8',
            'PickerFireWork9',
            'PickerFireWork10',
            'PickerFireWork11',
            'PickerFireWork12',
            'PickerFireWork13',
            'PickerFireWork14',
            'PickerFireWork15',
        ],
    },

    PickerFireWork1: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork2: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork3: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork4: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork5: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork6: {
        type: 'container',
        scale: 0.5
    },
    PickerFireWork7: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork8: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork9: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork10: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork11: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork12: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork13: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork14: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork15: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork16: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork17: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork18: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork19: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork20: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork21: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork22: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork23: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork24: {
        type: 'container',
        scale: 0.5,
    },
    PickerFireWork25: {
        type: 'container',
        scale: 0.5,
    },

    bonusesContainer: {
        type: 'container',
        children: [
            'pickerBonusLabelSpineContainer',
            'wheelBonusLabelSpineContainer',
            'pickerBonusLabel',
            'wheelBonusLabel'
        ],
        landscape: {
            x: 900,
            y: 190
        },
        portrait: {
            x: 0,
            y: 0
        }
    },

    pickerBonusLabelSpineContainer: {
        type: 'container',
        portrait: {
            x: 550,
            y: 170
        },
        landscape: {
            x: 292,
            y: 12
        }
    },

    wheelBonusLabelSpineContainer: {
        type: 'container',
        portrait: {
            x: 10,
            y: 170
        },
        landscape: {
            x: 52,
            y: 12
        }
    },

    pickerBonusLabel: {
        type: 'sprite',
        texture: 'pickerBonusOFF',
        children: [
            'pickerBonusLabelON',
        ],
        portrait: {
            x: 550,
            y: 172
        },
        landscape: {
            x: 292,
            y: 12
        }
    },

    pickerBonusLabelON: {
        type: 'sprite',
        texture: 'pickerBonusON',
    },


    wheelBonusLabel: {
        type: 'sprite',
        texture: 'wheelBonusOFF',
        children: [
            'wheelBonusLabelON'
        ],
        portrait: {
            x: 10,
            y: 172
        },
        landscape: {
            x: 52,
            y: 12
        }
    },

    wheelBonusLabelON: {
        type: 'sprite',
        texture: 'wheelBonusON',
    },

    baseGameInfo: {
        type: 'text',
        style: 'baseGameInfo',
        string: 'baseGameInfo',
        maxWidth: 800,
        anchor: 0.5,
        landscape: {
            x: 500,
            y: 300,
            maxWidth: 800,
        },
        portrait: {
            x: 405,
            y: 600,
            maxWidth: 700,
        },
    },

    fireworkLocations: {
        type: 'container',
        children: [
            'fireworkloc1',
            'fireworkloc2',
            'fireworkloc3',
            'fireworkloc4',
            'fireworkloc5',
            'fireworkloc6',
            'fireworkloc7',
            'fireworkloc8',
            'fireworklocSpineContainer',
        ],
        portrait: {
            x: -10,
            y: 0
        },
        landscape: {
            x: 40,
            y: 30
        }
    },
    fireworkloc1: {
        type: 'container',
        children: [
            'fireworkloc_1_SpineContainer'
        ],
        landscape: {
            x: 135,
            y: 106
        },
        portrait: {
            x: 180,
            y: 410
        }
    },
    fireworkloc2: {
        type: 'container',
        children: [
            'fireworkloc_2_SpineContainer'
        ],
        landscape: {
            x: 425,
            y: 195
        },
        portrait: {
            x: 405,
            y: 510
        }
    },
    fireworkloc3: {
        type: 'container',
        children: [
            'fireworkloc_3_SpineContainer'
        ],
        landscape: {
            x: 730,
            y: 106
        },
        portrait: {
            x: 640,
            y: 410
        }
    },
    fireworkloc4: {
        type: 'container',
        children: [
            'fireworkloc_4_SpineContainer'
        ],
        landscape: {
            x: 135,
            y: 308
        },
        portrait: {
            x: 180,
            y: 610
        }

    },
    fireworkloc5: {
        type: 'container',
        children: [
            'fireworkloc_5_SpineContainer'
        ],
        landscape: {
            x: 425,
            y: 410
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    fireworkloc6: {
        type: 'container',
        children: [
            'fireworkloc_6_SpineContainer'
        ],
        landscape: {
            x: 730,
            y: 308
        },
        portrait: {
            x: 640,
            y: 610
        }
    },
    fireworkloc7: {
        type: 'container',
        children: [
            'fireworkloc_7_SpineContainer'
        ],
        landscape: {
            x: 135,
            y: 510
        },
        portrait: {
            x: 180,
            y: 815
        }
    },
    fireworkloc8: {
        type: 'container',
        children: [
            'fireworkloc_8_SpineContainer'
        ],
        landscape: {
            x: 730,
            y: 510
        },
        portrait: {
            x: 640,
            y: 815
        }
    },
    fireworklocSpineContainer: {
        type: 'container',
        children: [
            'fireworklocSpineContainerLand',
            'fireworklocSpineContainerPort'
        ],
        landscape: {
            x: 690,
            y: 380,
        },
        portrait: {
            x: 405,
            y: 720,
        }
    },

    fireworklocSpineContainerLand: {
        type: 'container'
    },
    fireworklocSpineContainerPort: {
        type: 'container'
    },

    fireworkloc_1_SpineContainer: {
        type: 'container'
    },
    fireworkloc_2_SpineContainer: {
        type: 'container'
    },
    fireworkloc_3_SpineContainer: {
        type: 'container'
    },
    fireworkloc_4_SpineContainer: {
        type: 'container'
    },
    fireworkloc_5_SpineContainer: {
        type: 'container'
    },
    fireworkloc_6_SpineContainer: {
        type: 'container'
    },
    fireworkloc_7_SpineContainer: {
        type: 'container'
    },
    fireworkloc_8_SpineContainer: {
        type: 'container'
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: [
            'playerNumber1',
            'playerNumber2',
            'playerNumber3',
            'playerNumber4',
            'playerNumber5',
            'playerNumber6',
            'playerNumber7',
            'playerNumber8',
            'playerNumber9',
            'playerNumber10',
            'playerNumber11',
            'playerNumber12',
        ],
        landscape: { x: 50, y: 40 },
        portrait: { x: 0, y: 0 },
    },
    playerNumber1: {
        type: 'container',
        landscape: { x: 966, y: 328, scale: 0.9 },
        portrait: { x: 77, y: 1017, scale: 1 },
    },
    playerNumber2: {
        type: 'container',
        landscape: { x: 1086, y: 328, scale: 0.9 },
        portrait: { x: 209, y: 1017, scale: 1 },
    },
    playerNumber3: {
        type: 'container',
        landscape: { x: 1206, y: 328, scale: 0.9 },
        portrait: { x: 340, y: 1017, scale: 1 },
    },
    playerNumber4: {
        type: 'container',
        landscape: { x: 1326, y: 328, scale: 0.9 },
        portrait: { x: 471, y: 1017, scale: 1 },
    },
    playerNumber5: {
        type: 'container',
        landscape: { x: 966, y: 417.0, scale: 0.9 },
        portrait: { x: 602, y: 1017, scale: 1 },
    },
    playerNumber6: {
        type: 'container',
        landscape: { x: 1086, y: 417.0, scale: 0.9 },
        portrait: { x: 732, y: 1017, scale: 1 },
    },
    playerNumber7: {
        type: 'container',
        landscape: { x: 1206, y: 417.0, scale: 0.9 },
        portrait: { x: 77, y: 1112, scale: 1 },
    },
    playerNumber8: {
        type: 'container',
        landscape: { x: 1326, y: 417.0, scale: 0.9 },
        portrait: { x: 209, y: 1112, scale: 1 },
    },
    playerNumber9: {
        type: 'container',
        landscape: { x: 966, y: 503.0, scale: 0.9 },
        portrait: { x: 340, y: 1112, scale: 1 },
    },
    playerNumber10: {
        type: 'container',
        landscape: { x: 1086, y: 503.0, scale: 0.9 },
        portrait: { x: 471, y: 1112, scale: 1 },
    },
    playerNumber11: {
        type: 'container',
        landscape: { x: 1206, y: 503.0, scale: 0.9 },
        portrait: { x: 602, y: 1112, scale: 1 },
    },
    playerNumber12: {
        type: 'container',
        landscape: { x: 1326, y: 503.0, scale: 0.9 },
        portrait: { x: 732, y: 1112, scale: 1 },
    },

    fireWorkMeter: {
        type: 'container',
        children: [
            'fireworkMeterBackground',
            'fireworkMeter1',
            'fireworkMeter2',
            'fireworkMeter3',
            'fireworkMeter4',
            'fireworkMeter5',
            'fireworkMeter6',
            'fireworkMeter7',
            'fireworkMeter8',
        ],
        landscape: {
            x: 1025,
            y: 587
        },
        portrait: {
            x: 230,
            y: 915,
        }
    },

    fireworkMeterBackground: {
        type: 'sprite',
        texture: 'fireworkCounter'
    },

    fireworkMeter1: {
        type: 'sprite',
        texture: 'litCounter',
        x: 66,
        y: 16
    },
    fireworkMeter2: {
        type: 'sprite',
        texture: 'litCounter',
        x: 98,
        y: 16
    },
    fireworkMeter3: {
        type: 'sprite',
        texture: 'litCounter',
        x: 130,
        y: 16
    },
    fireworkMeter4: {
        type: 'sprite',
        texture: 'litCounter',
        x: 162,
        y: 16
    },
    fireworkMeter5: {
        type: 'sprite',
        texture: 'litCounter',
        x: 194,
        y: 16
    },
    fireworkMeter6: {
        type: 'sprite',
        texture: 'litCounter',
        x: 226,
        y: 16
    },
    fireworkMeter7: {
        type: 'sprite',
        texture: 'litCounter',
        x: 258,
        y: 16
    },
    fireworkMeter8: {
        type: 'sprite',
        texture: 'litCounter',
        x: 290,
        y: 16
    },


    /*
     *  WheelGame
     */

    wheelGame: {
        type: 'container',
        children: [
            'wheelContainer',
            'wheelUIContainer'
        ],
        landscape: {
            x: 0,
            y: 0
        },
        portrait: {
            x: 0,
            y: 0
        },
    },

    wheelUIContainer: {
        type: 'container',
        children: [
            'wheelPointer',
            'wheelLogo',
        ],
        landscape: {
            x: 810,
            y: 380,
        },
        portrait: {
            x: 405,
            y: 600
        },
    },

    wheelLogo: {
        type: 'container',
        children: [
            'wheelLogoLandscape',
            'wheelLogoPortrait'
        ]
    },

    wheelLogoLandscape: {
        type: 'sprite',
        texture: 'wheelTransitionLogo',
        anchor: 0.5,
    },
    wheelLogoPortrait: {
        type: 'sprite',
        texture: 'wheelTransitionLogo',
        anchor: 0.5,
    },
    wheelContainer: {
        type: 'container',
        children: [
            'wheelFX',
            'outerWheel',
            'outerWheelCover',
            'innerWheel',
            'innerWheelCover',
            'wheelTransformFX',
            'outerWheelShinyRing',
            'wheelWinOuter',
            'wheelWinInner',
            'spinButton',
        ],
        landscape: {
            x: 840,
            y: 389,
            rotation: 0,
            scale: 1,
        },
        portrait: {
            x: 405,
            y: 600,
            rotation: -Math.PI / 2,
            scale: 0.9
        },
    },

    wheelWinOuter: {
        type: 'container',
        x: -190,
        y: 3
    },
    wheelWinInner: {
        type: 'container',
        x: -190,
        y: 2
    },
    wheelFX: {
        type: 'container',
    },
    wheelTransformFX: {
        type: 'container',
    },

    innerWheelSprite: {
        type: 'sprite',
        texture: 'innerWheel',
        anchor: 0.5,

    },
    innerWheelGlow: {
        type: 'sprite',
        texture: 'innerGlow',
        anchor: 0.5,
    },

    innerWheel: {
        type: 'container',
        children: [
            'innerWheelGlow',
            'innerWheelSprite'
        ],
        anchor: 0.5,
        scale: 0.5
    },
    outerWheel: {
        type: 'container',
        children: [
            'outerWheelSprite'
        ],
        anchor: 0.5
    },
    outerWheelSprite: {
        type: 'sprite',
        texture: 'outerWheel',
        anchor: 0.5,
        rotation: 0.258
    },

    outerWheelCover: {
        type: 'sprite',
        texture: 'wheelOverlay',
        anchor: 0.5,
        alpha: 0.9
    },
    innerWheelCover: {
        type: 'sprite',
        texture: 'wheelOverlay',
        anchor: 0.5,
        alpha: 0.9
    },
    outerWheelShinyRing: {
        type: 'sprite',
        texture: 'shinyRing',
        anchor: 0.5
    },
    wheelPointer: {
        type: 'container',
        children: [
            'wheelPointerLandscape',
            'wheelPointerPortrait',
            'bonusWinLabel',
            'bonusWinValue',
            'bonusWinValue_2'
        ],
    },
    wheelPointerLandscape: {
        type: 'sprite',
        anchor: 0.5,
        texture: 'wheelPointer',
        x: -550,
        y: 62,
    },
    wheelPointerPortrait: {
        type: 'sprite',
        anchor: 0.5,
        texture: 'portrait_wheelPointer',
        x: 0,
        y: 475
    },
    bonusWinLabel: {
        type: 'text',
        style: 'bonusWinLabel',
        string: 'bonusWin',
        maxWidth: 270,
        anchor: 0.5,
        landscape: {
            x: -622,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 470
        }
    },
    bonusWinValue: {
        type: 'text',
        style: 'bonusWinValue',
        maxWidth: 300,
        anchor: 0.5,
        landscape: {
            x: -620,
            y: 100,
        },
        portrait: {
            y: 570,
            x: 0
        }
    },
    bonusWinValue_2: {
        type: 'text',
        style: 'bonusWinValue',
        maxWidth: 300,
        anchor: 0.5,
        landscape: {
            x: -620,
            y: 100,
        },
        portrait: {
            y: 570,
            x: 0
        }
    },
    spinButton: {
        type: 'button',
        portrait: {
            rotation: Math.PI / 2,
        },
        landscape: {
            rotation: 0
        },
        anchor: 0.5,
        textures: {
            enabled: 'spinButtonEnabled',
            disabled: 'spinButtonDisabled',
            over: 'spinButtonOver',
            pressed: 'spinButtonPressed',
        },
    },

    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: [
            'howToPlayPage1',
            'howToPlayPage2',
            'howToPlayPage3',
        ],
    },
    howToPlayPage1: {
        type: 'container',
        children: [
            'howToPlayTitle_page1',
            'howToPlayPage1_sprite1',
            'howToPlayPage1_sprite2',
            'howToPlayPage1_text'
        ],
        landscape: { x: 720, y: 320, wordWrapWidth: 1100 },
        portrait: { x: 405, y: 500, wordWrapWidth: 560 },
    },
    howToPlayPage1_text: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: {
            x: 0.5,
            y: 0.5,
        },
        align: 'center',
        landscape: { x: 0, y: 0, wordWrapWidth: 1100, maxWidth: 1100 },
        portrait: { x: 0, y: -120, wordWrapWidth: 560, maxWidth: 560 },
    },

    howToPlayPage1_sprite1: {
        type: 'sprite',
        texture: 'wheelTransitionLogo',
        anchor: 0.5,
        portrait: {
            x: -150,
            y: 180,
            scale: 0.3
        },
        landscape: {
            y: 170,
            x: -200,
            scale: 0.35
        }
    },

    howToPlayTitle_page1: {
        type: 'text',
        string: 'howToPlayTitle',
        style: 'howToPlayTitle',
        anchor: 0.5,
        y: 178,
        landscape: { y: -150 },
        portrait: { y: -320 },
    },

    howToPlayPage1_sprite2: {
        type: 'sprite',
        texture: 'pickerTransitionLogo',
        anchor: 0.5,
        portrait: {
            x: 150,
            y: 180,
            scale: 0.3
        },
        landscape: {
            y: 170,
            x: 170,
            scale: 0.35
        }
    },

    howToPlayPage2: {
        type: 'container',
        string: 'page2',
        children: [
            'howToPlayPage2_sprite2',
            'howToPlayPage2_sprite1',
            'howToPlayPage2_text'
        ],
        landscape: { x: 720, y: 430, wordWrapWidth: 1100 },
        portrait: { x: 405, y: 560, wordWrapWidth: 560 },
    },
    howToPlayPage2_text: {
        type: 'text',
        string: 'page2',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: {
            x: 0.5,
            y: 0.5
        },
        align: 'center',
        landscape: { x: 0, y: 0, wordWrapWidth: 1100 },
        portrait: { x: 0, y: 0, wordWrapWidth: 560, maxWidth: 560 },
    },
    howToPlayPage2_sprite1: {
        type: 'sprite',
        texture: 'wheelTransitionLogo',
        portrait: {
            y: -300,
            scale: 0.5
        },
        landscape: {
            y: -220,
            scale: 0.4
        },
        anchor: 0.5,
    },

    howToPlayPage2_sprite2: {
        type: 'container',
        portrait: {
            y: -300,
            scale: 1.5
        },
        landscape: {
            y: -220,
            scale: 1.3
        },
        anchor: 0.5,
    },

    howToPlayPage3: {
        type: 'container',
        string: 'page3',
        children: [
            'howToPlayPage3_sprite2',
            'howToPlayPage3_sprite1',
            'howToPlayPage3_text'
        ],
        landscape: { x: 720, y: 410, wordWrapWidth: 1100 },
        portrait: { x: 405, y: 500, wordWrapWidth: 560 },
    },

    howToPlayPage3_text: {
        type: 'text',
        string: 'page3',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: {
            x: 0.5,
            y: 0.5
        },
        align: 'center',
        landscape: { x: 0, y: 0, wordWrapWidth: 1100 },
        portrait: { x: 0, y: 0, wordWrapWidth: 560, maxWidth: 560 },
    },


    howToPlayPage3_sprite1: {
        type: 'sprite',
        texture: 'pickerTransitionLogo',
        portrait: {
            y: -240,
            scale: 0.5,
        },
        landscape: {
            y: -200,
            scale: 0.4
        },
        anchor: 0.5,
    },

    howToPlayPage3_sprite2: {
        type: 'container',
        portrait: {
            y: -240,
            scale: 1.5,
        },
        landscape: {
            y: -200,
            scale: 1.3
        },

        anchor: 0.5,
    },

    howToPlayIndicators: {
        type: 'container',
        children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
        landscape: { x: 720, y: 600 },
        portrait: { x: 405, y: 870 },
        scale: 0.7
    },

    bigWinContainer: {
        children: ['bigWinAnim', 'bigWinParticles'],
        type: 'container',
    },

    bigWinAnim: {
        type: 'container',
    },

    bigWinParticles: {
        type: 'container',
        children: [
            'bigWinFireWorkContainer'
        ]
    },

    bigWinFireWorkContainer: {
        type: 'container',
        children: [
            'bigWinFireWork_1',
            'bigWinFireWork_2',
            'bigWinFireWork_3',
            'bigWinFireWork_4',
            'bigWinFireWork_5',
            'bigWinFireWork_6',
            'bigWinFireWork_7',
            'bigWinFireWork_8',
            'bigWinFireWork_9',
            'bigWinFireWork_10',
        ]
    },
    bigWinFireWork_1: {
        type: 'container'
    },
    bigWinFireWork_2: {
        type: 'container'
    },
    bigWinFireWork_3: {
        type: 'container'
    },
    bigWinFireWork_4: {
        type: 'container'
    },
    bigWinFireWork_5: {
        type: 'container'
    },
    bigWinFireWork_6: {
        type: 'container'
    },
    bigWinFireWork_7: {
        type: 'container'
    },
    bigWinFireWork_8: {
        type: 'container'
    },
    bigWinFireWork_9: {
        type: 'container'
    },
    bigWinFireWork_10: {
        type: 'container'
    },

    buyButton: {
        type: 'button',
        string: 'button_buy',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
    },
    tryButton: {
        type: 'button',
        string: 'button_try',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
    },

    // buttonBar:{
    //     type: 'container',
    //     portrait: {
    //         y: 1245,
    //     }
    // },

    ticketSelectBarSmall: {
        type: 'container',
        landscape: { x: 580, y: 710 },
        portrait: { x: 405, y: 1205 },
        children: [
            'ticketSelectBarBG',
            'ticketSelectCostValue',
            'ticketCostDownButtonStatic',
            'ticketCostUpButtonStatic',
            'ticketCostDownButton',
            'ticketCostUpButton',
            'ticketCostIndicators',
        ],
    },
    ticketCostDownButton: {
        type: 'button',
        portrait: { x: -208 },
        landscape: { x: -143 },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed',
        },
    },
    ticketCostUpButton: {
        type: 'button',
        portrait: { x: 208 },
        landscape: { x: 143 },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed',
        },
    },
    ticketCostDownButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: { x: -208 },
        landscape: { x: -143 },
        texture: 'minusButtonDisabled'
    },
    ticketCostUpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: { x: 208 },
        landscape: { x: 143 },
        texture: 'plusButtonDisabled'
    },
    footerContainer: {
        type: 'container',
        children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
        landscape: { y: 761 },
        portrait: { y: 1349 },
    },
    footerBG: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_footerBar',
            y: 5
        },
        portrait: {
            texture: 'portrait_footerBar',
            y: 5
        },
    },

    buttonBar: {
        type: 'container',
        landscape: { x: 0, y: 660 },
        portrait: { x: 0, y: 1250 },
        children: [
            'helpButtonStatic',
            'helpButton',
            'homeButtonStatic',
            'homeButton',
            'exitButton',
            'playAgainButton',
            'tryButtonAnim',
            'tryAgainButton',
            'buyButtonAnim',
            'buyButton',
            'tryButton',
            'moveToMoneyButton',
            'retryButton',
        ],
    },

    howToPlayContainer: {
        type: 'container',
        children: [
            'howToPlayOverlay',
            'howToPlayBackground',
            'howToPlayPages',
            'howToPlayTitle',
            'versionText',
            'audioButtonContainer',
            'howToPlayPrevious',
            'howToPlayNext',
            'howToPlayClose',
            'howToPlayIndicators',
        ],
        portrait: {
            y: 90
        },
        landscape: {
            y: 0
        }
    },

    howToPlayOverlay: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tutorialOverlay',
            y: 0
        },
        portrait: {
            texture: 'portrait_tutorialOverlay',
            y: -100
        },
        scale: 2
    },

    buyButtonAnim: {
        type: 'sprite',
        anchor: 0.5,
    },
    tryButtonAnim: {
        type: 'sprite',
        anchor: 0.5,
    },
    autoPlayButton_default: {
        type: 'point',
        landscape: { x: 720, y: 710 },
        portrait: { x: 405, y: 1304 },
    },
    autoPlayButton_multi: {
        type: 'point',
        landscape: { x: 918, y: 710 },
        portrait: { x: 405, y: 1304 },
    },

    ticketCostIndicators: {
        type: 'container',
        children: ['ticketCostIndicatorActive', 'ticketCostIndicatorInactive'],
        portrait: { y: 11 },
        landscape: { y: 11 },
    },

    resultPlaqueOverlay: {
        type: 'sprite',
        landscape: { x: 0, y: -19 },
        portrait: { x: 0, y: 165 },
        children: ['gameOverlay']
    },

    winPlaqueBG: {
        type: 'sprite',
        children: [
            'winPlaqueSprite',
            'winPlaqueValueBitmapTextContainer'
        ],
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'totalWin',
        landscape: {
            y: -70,
        },
        portrait: {
            y: 115,
        },
        anchor: 0.5,
        maxWidth: 350,
    },
    winPlaqueValueBitmapTextContainer: {
        type: 'container',
        landscape: {
            y: 12,
            scale: 0.8
        },
        portrait: {
            y: 195
        }
    },
    winPlaqueSprite: {
        type: 'sprite',
        texture: 'totalWin_Plaque',
        anchor: 0.5,
        landscape: {
            y: -18
        },
        portrait: {
            y: 166
        }
    },
    losePlaqueSprite: {
        type: 'sprite',
        texture: 'totalWin_Plaque',
        anchor: 0.5,
        landscape: {
            y: -18
        },
        portrait: {
            y: 166
        }
    },

    winPlaqueValue: {
        type: 'text',
        style: 'totalWin',
        maxWidth: 350,
        landscape: {
            y: 880,
        },
        portrait: {
            y: 330,
        },
        anchor: 0.5
    },
    winPlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_background',
                over: 'landscape_background',
                pressed: 'landscape_background',
            },
        },
        portrait: {
            textures: {
                enabled: 'portrait_background',
                over: 'portrait_background',
                pressed: 'portrait_background',
            },
            y: 110
        },
    },

    timeoutExit: {
        type: 'button',
        landscape: { x: 560, y: 550 },
        portrait: { x: 260, y: 775 },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed',
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed',
        },
    },
    timeoutContinue: {
        type: 'button',
        landscape: { x: 880, y: 550 },
        portrait: { x: 555, y: 775 },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed',
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed',
        },
    },

    losePlaqueBG: {
        type: 'sprite',
        anchor: 0.5,
        children: ['losePlaqueSprite'],
    },
    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        anchor: 0.5,
        portrait: { maxWidth: 750, y: 165 },
        landscape: { maxWidth: 750, y: -20, },
    },
    losePlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_background',
                over: 'landscape_background',
                pressed: 'landscape_background',
            },
        },
        portrait: {
            textures: {
                enabled: 'portrait_background',
                over: 'portrait_background',
                pressed: 'portrait_background',
            },
            y: 110
        },
    },

    resultPlaquesContainer: {
        type: 'container',
        children: [
            'resultPlaqueOverlay',
            'winPlaqueBG',
            'winPlaqueMessage',
            'winPlaqueValue',
            'winPlaqueCloseButton',
            'losePlaqueBG',
            'losePlaqueMessage',
            'losePlaqueCloseButton',
            'clickArea',
        ],
        landscape: { x: 720, y: 377 },
        portrait: { x: 405, y: 564 },
    },


    clickArea: {
        type: 'button',
        landscape: { x: -720, y: -377 },
        portrait: { x: -405, y: -564 },
        textures: {
            enabled: '',
            over: '',
            pressed: '',
        },
    }
});