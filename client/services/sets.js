app.service('SetsSvc', function(sideFilter){
  
  var initSets = function(input) {
    var setCodes = ['draft'];
    var sets = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var set = input[i];
      if (setCodes.indexOf(set.value) == -1) {
        setCodes.push(set.value);
        sets.all.push(set);
        sets.selected.push(set.value);
      }
    }
    
    return sets;
  }
  
  this.sets = initSets(window.data.sets);
  
  this.setSets = function(updates) {
    this.sets.selected = [];
    for(set in updates) {
      if (updates[set]) {
        this.sets.selected.push(set);
      }
    }
  }
});