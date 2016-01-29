module.exports = {
  
  cards : function(cards) {
    
    var out = [];
    
    // var subs = /\\r\\n\[Subroutine\]/;
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.imagesrc) {
        
        // if (card.type_code == 'ice') {
            // card.
        // }
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
        sets.push({value: card.set_code, label: card.setname, cycle: card.cyclenumber});
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
      corp: ['none'],
      runner: ['none']
    };
    var subtypes = { 'none': {value: 'none', label: 'No subtype', side: 'corprunner', types:[]}};
    
    cards.forEach(function(card){
      var side = card.side_code;
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        var names = card.subtype.split(' - ');
        codes.forEach(function(code, index) {
          var name = names[index];
          if (typeof subtypes[code] == 'undefined') {
            subtypes[code] = {value: code, label: name, side: side, types: [card.type_code]};
          } else {
            if (subtypeCodes[side].indexOf(code) == -1) {
              subtypeCodes[side].push(code);
              subtypes[code].side += side;
            }
            if (subtypes[code].types.indexOf(card.type_code) == -1) {
              subtypes[code].types.push(card.type_code);
            }
          }
        });
      } else {
        if (subtypes['none'].types.indexOf(card.type_code) == -1) {
          subtypes['none'].types.push(card.type_code);
        }
      }
    });
    
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