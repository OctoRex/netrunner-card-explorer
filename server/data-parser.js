module.exports = {
  
  cards : function(cards) {
    return cards.filter(function(card){
      if (typeof card.text == 'undefined') {
        card.text = '';
      }
      return card.imagesrc && card.cycle_code != 'draft';
    });
  },
  
  sets : function(cards, sets) {
    var setCodes = ['draft'];
    var out = [];
    
    cards.forEach(function(card){
      if (setCodes.indexOf(card.set_code) == -1) {
        var data = sets.find(function(set){
          return set.code == card.set_code;
        });
        setCodes.push(card.set_code);
        out.push({value: card.set_code, label: card.setname, cycle: card.cyclenumber, available: data.available});
      }
    });
    
    return out;
  },

  types : function(cards) {
    var typeCodes = {
      corp: [],
      runner: []
    };
    var types = {};
    
    cards.forEach(function(card){
      var side = card.side_code;
      if (typeCodes[side].indexOf(card.type_code) == -1) {
        typeCodes[side].push(card.type_code);
        if (typeof types[card.type_code] == 'undefined') {
          types[card.type_code] = {value: card.type_code, label: card.type, side: side};
        } else {
          types[card.type_code].side += side;
        }
      }
    });
    
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
    // start our array off with none as that will never be picked up
    var subtypes = { 'none': {value: 'none', label: 'No subtype', side: 'corprunner', types: {'corp':[], 'runner':[]}}};
    
    cards.forEach(function(card){
      // get the side of the card, we'll need it later
      var side = card.side_code;
      // if the card has subtypes ...
      if (card.subtype_code) {
        // get an array of the codes
        var codes = card.subtype_code.split(' - ');
        // get an array of the display names
        var names = card.subtype.split(' - ');
        // handle each code separately
        codes.forEach(function(code, index) {
          // get the display name from the other array
          var name = names[index];
          // if this subtype is not defined in our list yet, we need to initialise it
          // and populate it with the data for this code
          if (typeof subtypes[code] == 'undefined') {
            // note that the types apply to each side separately
            // otherwise it looks weird on the filter list
            var subtype = {value: code, label: name, side: side, types: {corp:[], runner:[]}};
            subtype.types[side].push(card.type_code);
            // after we've created the subtype, add it to the list, keying by the codename
            subtypes[code] = subtype;
            // add it to our list that keeps a track of whether we added the text for that
            // side or not
            subtypeCodes[side].push(code);
          } else {
            // if we have the code already in the list then we need to check a couple things
            // 1. is this from a different side from before, if so add it the subtype
            if (subtypeCodes[side].indexOf(code) == -1) {
              subtypeCodes[side].push(code);
              subtypes[code].side += side;
            }
            // 2. is this a card that has new types that apply to the subtype
            if (subtypes[code].types[side].indexOf(card.type_code) == -1) {
              subtypes[code].types[side].push(card.type_code);
            }
          }
        });
      } else {
        // ... but if it doesn't then we need to add it to the 'none' subtype
        // note that 'none' is already in the subtypes-per-side list so we don't have to add it
        if (subtypes['none'].types[side].indexOf(card.type_code) == -1) {
          subtypes['none'].types[side].push(card.type_code);
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
    
    cards.forEach(function(card){
      var side = card.side_code;
      if (factionCodes[side].indexOf(card.faction_code) == -1) {
        factionCodes[side].push(card.faction_code);
        if (typeof factions[card.faction_code] == 'undefined') {
          factions[card.faction_code] = {value: card.faction_code, label: card.faction, side: side};
        } else {
          factions[card.faction_code].side += side;
        }
      }
    });
    
    var out = [];
    for (faction in factions) {
      out.push(factions[faction]);
    }
    
    return out;
    
    return factions;
  }
}