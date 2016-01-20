app.service('CardsSvc', function(sideFilter){
  
  var initCards = function(input) {
    var cards = {
      all: [],
      corp: {
        all: [],
        filtered: []
      },
      runner: {
        all: [],
        filtered: []
      },
      display: []
    }
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (card.set_code != 'draft') {
        cards.all.push(card);
        cards[card.side_code].all.push(card);
        cards[card.side_code].filtered.push(card);
      }
    }
    
    return cards;
  }
  
  this.cards = initCards(window.data.cards);
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
    'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
  
  var typeSort = function(card) {
    return typeOrder.indexOf(card.type_code);
  }
  
  var costSort = function(card) {
    return (typeof card.cost == 'undefined') ? 1 : card.cost * -1;
  }
  
  this.sort = {
    methods : {
      title: ['title'],
      type: [typeSort, 'subtype_code', 'title'],
      faction: ['faction', typeSort, 'title'],
      cost: [costSort, 'faction', typeSort, 'title']
    } 
  }

  this.sort.current = this.sort.methods.faction;
  
  this.changeSort = function(value){
    this.sort.current = this.sort.methods[value];
  }
  
  this.setSide = function(side) {
    this.cards.display = this.cards[side].filtered;
  }
  
  // set the corp to show first
  this.setSide('corp');
});