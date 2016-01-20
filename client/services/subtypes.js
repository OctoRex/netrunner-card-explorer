app.service('SubtypesSvc', function(){
  
  var initSubtypes = function(input) {
    var subtypeCodes = [];
    var subtypes = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var subtype = input[i];
      if (subtypeCodes.indexOf(subtype.value) == -1) {
        subtypeCodes.push(subtype.value);
        subtypes.all.push(subtype);
        subtypes.selected.push(subtype.value);
      }
    }
    
    return subtypes;
  }
  
  this.subtypes = initSubtypes(window.data.subtypes);
  
  this.setSubtypes = function(updates) {
    this.subtypes.selected = [];
    for(subtype in updates) {
      if (updates[subtype]) {
        this.subtypes.selected.push(subtype);
      }
    }
  }
});