module.exports = {
  sets : function(cards) {
    var setCodes = ['draft'];
    var sets = [];
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (setCodes.indexOf(card.set_code) == -1) {
        setCodes.push(card.set_code);
        sets.push({value: card.set_code, label: card.setname});
      }
    }
    
    return sets;
  },

  types : function(cards) {
    var typeCodes = [];
    var types = [];
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (typeCodes.indexOf(card.type_code) == -1) {
        typeCodes.push(card.type_code);
        types.push({value: card.type_code, label: card.type});
      }
    }
    
    return types;
  },

  subtypes : function(cards) {
    var subtypeCodes = [];
    var subtypes = [];
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        var names = card.subtype.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          if (subtypeCodes.indexOf(codes[j]) == -1) {
            subtypeCodes.push(codes[j]);
            subtypes.push({value: codes[j], label: names[j]});
          }
        }
      }
    }
    
    return subtypes;
  },

  factions : function(cards) {
    var factionCodes = ['neutral'];
    var factions = [];
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (factionCodes.indexOf(card.faction_code) == -1) {
        factionCodes.push(card.faction_code);
        factions.push({value: card.faction_code, label: card.faction});
      }
    }
    
    return factions;
  }
}