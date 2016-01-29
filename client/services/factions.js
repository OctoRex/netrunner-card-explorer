app.service('FactionsSvc', function(){

  this.factions = {
    all: window.data.factions,
    selected: []
  };
  
  this.factions.all.forEach(function(faction){
    faction.selected = true;
  });
  
  this.factions.all.sort(function(a, b){
    if (a.value == 'neutral') {
      return 1;
    } else if (b.value == 'neutral') {
      return -1;
    } else {
      return a.label.localeCompare(b.label);
    }
  });
  
  this.setFactions = function() {
    this.factions.selected = [];
    this.factions.all.forEach(function(faction){
      if (faction.selected) {
        this.factions.selected.push(faction.value);
      }
    }, this);
  }
    
  this.setFactions();
});
