app.service('FactionsSvc', function(ApiSvc, HelperSvc){
  
  this.helper = HelperSvc;

  this.factions = {
    all: [],
    selected: [],
    loaded: false
  };
  
  this.setFactions = function() {
    this.factions.selected = [];
    this.factions.all.forEach(function(faction){
      if (faction.selected) {
        this.factions.selected.push(faction.value);
      }
    }, this);
  };
  
  this.allFactions = function(){
    this.factions.all.forEach(this.helper.checkAll(true));
    this.setFactions();
  };
  
  this.noFactions = function() {
    this.factions.all.forEach(this.helper.checkAll(false));
    this.setFactions();
  };
  
  this.find = function(code) {
    return this.factions.all.find((faction, index, array) => {
      return faction.value == code;
    });
  };
  
  ApiSvc.factions().then(response => {
    
    let factions = response.data;
    
    this.factions.all = factions;
  
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
  
    this.setFactions();
    
    this.factions.loaded = true;
    
  }).catch(err => {
    console.log(err);
  });
});
