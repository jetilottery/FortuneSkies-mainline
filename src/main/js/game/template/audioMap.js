define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['MusicLoop', 0],
    winTerminator: ['MusicTermWin', 1],
    loseTerminator: ['MusicTermLose', 1],
    click: ['Click', 4],
    costDown: ['BetDown', 1],
    costUp: ['BetUp', 2],
    bonusWin: ['BonusWin', 2],
    bonusNoWin: ['BonusNoWin', 2],
    costMax: ['BetMax', 3],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    spinButton: ['SpinButtonPressed', 5],
    spinLoop: ['SpinLoop', 3],
    spinLoopEnd: ['SpinLoopEnd', 13],
    bonusTriggered: ['Bonus', 5],
    transition: ['BonusTransition', 14],
    transitionStart: ['BonusTriggered', 12],
    cashWin: ['CashWin', 14],
    picker_1: ['PickerExplosion_1', 5],
    picker_2: ['PickerExplosion_2', 7],
    picker_3: ['PickerExplosion_3', 8],
    match_1: ['Match1', 1],
    match_2: ['Match2', 2],
    match_3: ['Match3', 6],
    fireWorkReveal_1:['Reveal01', 7],
    fireWorkReveal_2:['Reveal02', 8],
    fireWorkReveal_3:['Reveal03', 9],
    fireWorkReveal_4:['Reveal04', 10],
    fireWorkReveal_5:['Reveal05', 11],
    collect:['LoseLife',6],

    nextWheel:['NewWheel', 9],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    //  buy: ['BuyButton', 4],
     revealAll: ['Reveal_ButtonTap', 4],
});
