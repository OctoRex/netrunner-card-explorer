app.service('TypesSvc', function(sideFilter){
  
  var initTypes = function(input) {
    var typeCodes = [];
    var types = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (typeCodes.indexOf(card.type_code) == -1) {
        typeCodes.push(card.type_code);
        types.all.push({value: card.type_code, label: card.type});
        types.selected.push(card.type_code);
      }
    }
    
    return types;
  }
  
  this.types = initTypes(window.data.cards);
  
  this.setTypes = function(updates) {
    this.types.selected = [];
    for(type in updates) {
      if (updates[type]) {
        this.types.selected.push(type);
      }
    }
  }

});