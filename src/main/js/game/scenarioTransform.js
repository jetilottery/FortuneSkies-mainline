define(() => {
  // const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

  return function scenarioTransform(scenarioString) {
    // split the string into the three components; winning, instant and player numbers
    const [baseGameString, wheelGameString, pickerString] = scenarioString.split('|');

    const baseGame = baseGameString.split('');

    const wheelGame = wheelGameString.length > 0 ? wheelGameString.split(',') : null;
    const pickerGame = pickerString.length > 0 ? pickerString : null;

    return {
        baseGame,
        wheelGame,
        pickerGame,
    };
  };
});
