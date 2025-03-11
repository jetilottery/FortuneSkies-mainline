define({
    /*
     * Game configuration options
     * Anything defined here could be overwritten either based on the channel in
     * assetPacks/CHANNEL/layout/gameConfig.js or at an operator level by gameConfig.json in i18n
     */
    showHowToPlayOnLoad: false,
    // Use AutoPlay with toggle start/stop rather than single use RevealAll
    toggleAutoPlay: false,
    // Time between each number being reveal
    //ed in autoplay. 0 for instant reaveal.
    autoPlayWinningNumberInterval: 0.1,

    idleIntervalVariation: 0.25,
    // Time over which the music will fade out on entering the result screen
    resultMusicFadeOutDuration: 0,
    // Time between entering the result screen and the terminator audio starting
    resultTerminatorFadeInDelay: 0,
    // Time over which the terminator audio will fade in
    resultTerminatorFadeInDuration: 1,
    // Should the Result screen show when ticket is complete
    showResultScreen: true,

    ticketCostMeterVisibleWhilePlaying: true,
    // Bypass the play again button
    bypassPlayAgain: true,

    fastFadeButtons: true,
    fastFadeDuration: 0.20,

    fireWorkMaxDelay: 3,
    fireWorkMinDelay: 1,

    showlosingValue: true,
    suppressNonWinResultPlaque: false,

    delayBeforeWinResult: 1
});
