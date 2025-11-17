define([], function() {
  
  const effects = [];

  return {
    registerEffect: function(effectFunction) {
      effects.push(effectFunction);
    }, // end registerEffect

    notifyAllEffects: function(eventName, data) {
      effects.forEach(function(effectFunction) {
        effectFunction(eventName, data);
      });
    }, // end notifyAllEffects

  }; // end module object

});