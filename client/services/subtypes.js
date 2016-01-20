app.service('SubtypesSvc', function(sideFilter){
  
  var initSubtypes = function(input) {
    var subtypeCodes = [];
    var subtypes = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        var names = card.subtype.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          if (subtypeCodes.indexOf(codes[j]) == -1) {
            subtypeCodes.push(codes[j]);
            subtypes.all.push({value: codes[j], label: names[j]});
            subtypes.selected.push(codes[j]);
          }
        }
      }
    }
    
    return subtypes;
  }
  
  this.subtypes = initSubtypes(window.data.cards);
  
  this.setSubtypes = function(updates) {
    this.subtypes.selected = [];
    for(subtype in updates) {
      if (updates[subtype]) {
        this.subtypes.selected.push(subtype);
      }
    }
  }
});