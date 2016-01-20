app.service('TypesSvc', function(){
  
  var initTypes = function(input) {
    var typeCodes = [];
    var types = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var type = input[i];
      if (typeCodes.indexOf(type.value) == -1) {
        typeCodes.push(type.value);
        types.all.push(type);
        types.selected.push(type.value);
      }
    }
    
    return types;
  }
  
  this.types = initTypes(window.data.types);
  
  this.setTypes = function(updates) {
    this.types.selected = [];
    for(type in updates) {
      if (updates[type]) {
        this.types.selected.push(type);
      }
    }
  }

});