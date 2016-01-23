module.exports = {
  
  cards : function(cards) {
    
    var out = [];
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.imagesrc) {
        out.push(card);
      }
    }
    
    return out;
  },
  
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
    var typeCodes = {
      corp: [],
      runner: []
    };
    var types = {};
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var side = card.side_code;
      if (typeCodes[side].indexOf(card.type_code) == -1) {
        typeCodes[side].push(card.type_code);
        if (typeof types[card.type_code] == 'undefined') {
          types[card.type_code] = {value: card.type_code, label: card.type, side: side};
        } else {
          types[card.type_code].side += side;
        }
      }
    }
    
    var out = [];
    for (type in types) {
      out.push(types[type]);
    }
    
    return out;
  },

  subtypes : function(cards) {
    var subtypeCodes = {
      corp: [],
      runner: []
    };
    var subtypes = {};
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var side = card.side_code;
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        var names = card.subtype.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          var code = codes[j];
          var name = names[j];
          if (subtypeCodes[side].indexOf(code) == -1) {
            subtypeCodes[side].push(code);
            if (typeof subtypes[code] == 'undefined') {
              subtypes[code] = {value: code, label: name, side: side};
            } else {
              subtypes[code].side += side;
            }
          }
        }
      }
    }
    
    var out = [];
    for (subtype in subtypes) {
      out.push(subtypes[subtype]);
    }
    
    return out;
  },

  factions : function(cards) {
    var factionCodes = {
      corp: [],
      runner: []
    };
    var factions = {};
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var side = card.side_code;
      if (factionCodes[side].indexOf(card.faction_code) == -1) {
        factionCodes[side].push(card.faction_code);
        if (typeof factions[card.faction_code] == 'undefined') {
          factions[card.faction_code] = {value: card.faction_code, label: card.faction, side: side};
        } else {
          factions[card.faction_code].side += side;
        }
      }
    }
    
    var out = [];
    for (faction in factions) {
      out.push(factions[faction]);
    }
    
    return out;
    
    return factions;
  }
}