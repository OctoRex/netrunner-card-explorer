app.service('FactionsSvc', function(){
  
  var initFactions = function(input) {
    var factionCodes = [];
    var factions = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var faction = input[i];
      if (factionCodes.indexOf(faction.value) == -1) {
        factionCodes.push(faction.value);
        factions.all.push(faction);
        factions.selected.push(faction.value);
      }
    }
    
    return factions;
  }
  
  this.factions = initFactions(window.data.factions);
  
  this.setFactions = function(updates) {
    this.factions.selected = [];
    for(faction in updates) {
      if (updates[faction]) {
        this.factions.selected.push(faction);
      }
    }
  }

});