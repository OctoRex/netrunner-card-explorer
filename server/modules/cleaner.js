module.exports = {
  
  cards : function(cards, img) {
    return cards.filter(function(card){
      // sunny lebeau has no card text, so for this and others
      // it's simplist to just add the card text field as it's
      // not empty, it's just missing
      if (typeof card.text == 'undefined') {
        card.text = '';
      }
      if (typeof card.keywords == 'undefined') {
        card.keywords = '';
      }
      // might as well remove unneeded fields
      delete card['last-modified'];
      delete card.deck_limit;
      delete card.influence_limit;
      delete card.minimum_deck_size;
      delete card.flavor;
      delete card.minimumdecksize;
      delete card.position;
      delete card.quantity;
      delete card.uniqueness;
      delete card.base_link;
      delete card.influencelimit;
      delete card.quantity;
      
      if (card.hasOwnProperty('strength') && card.side_code == 'corp') {
        
        // let's count the subroutines
        var subsMatch = card.text.match(/\[subroutine\]/g);
        
        var addSubsMatch = card.text.match(/("|“)\[subroutine\]/g);
        
        var subs = 0;
        
        if (subsMatch) {
          subs = subsMatch.length;
          
          if (addSubsMatch) {
            if (addSubsMatch.length == subs) {
              subs = 'X';
            } else {
              subs -= addSubsMatch.length;
            }
          }
        }
        
        card.subroutines = subs;
      }
      
      card.imagesrc = img.replace('{code}', card.code);

      return card.imagesrc && card.pack_code != 'draft';
    });
  },
  
  sets : function(sets) {
    var out = [];
    
    sets.forEach(function(set){
      // all we're doing here is skipping draft as we don't want that 
      // in our lists
      if (set.code != 'draft') {
        // we're going to re-label a few properties for legacy reasons
        out.push({
          value: set.code, 
          label: set.name, 
          cycle: set.cycle_code,
          available: set.date_release
        });
      }
    });
    
    return out;
  },

  types : function(types) {
    
    var out = [];
    
    types.forEach(function(type){
      if (!type.is_subtype) {
        out.push({
          value: type.code, 
          label: type.name, 
          side: (type.side_code ? type.side_code : 'corprunner')
        });
      }
    });

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
      if (card.keywords) {
        // get an array of the codes
        var codes = card.keywords.split(' - ');
        // handle each code separately
        codes.forEach(function(code, index) {
          // if this subtype is not defined in our list yet, we need to initialise it
          // and populate it with the data for this code
          if (typeof subtypes[code] == 'undefined') {
            // note that the types apply to each side separately
            // otherwise it looks weird on the filter list
            var subtype = {value: code, label: code, side: side, types: {corp:[], runner:[]}};
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
        if (subtypes.none.types[side].indexOf(card.type_code) == -1) {
          subtypes.none.types[side].push(card.type_code);
        }
      }
    });
    
    var out = [];
    for (var subtype in subtypes) {
      out.push(subtypes[subtype]);
    }
    
    return out;
  },

  factions : function(factions) {
    
    var out = [];
    
    factions.forEach(function(faction){
      out.push({
        value: faction.code, 
        label: faction.name, 
        side: faction.side_code
      });
    });
    
    return out;
  }
};