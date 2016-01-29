app.service('CardsSvc', function(TypesSvc, sideFilter){
  
  var cards = window.data.cards;
  
  this.cards = {
    all: cards,
    corp: sideFilter(cards, 'corp'),
    runner: sideFilter(cards, 'runner'),
    display: []
  }
  
  var typeSort = function(card) {
    return TypesSvc.typeOrder.indexOf(card.type_code);
  }
  
  var numericSort = function (property) {
    return function(card) {
      return (typeof card[property] == 'undefined') ? 1 : card[property] * -1;
    }
  }
  
  var factionSort = function(card) {
    return (card.faction_code == 'neutral') ? 'ZZZ' : card.faction;
  }
  
  this.sort = {
    methods : {
      title: 'title',
      type: [typeSort, 'subtype_code', 'title'],
      faction: [factionSort, typeSort, 'title'],
      cost: [numericSort('cost'), factionSort, typeSort, 'title'],
      sets: 'code',
      strength: [numericSort('strength'), typeSort, 'title'] ,
      trash: [numericSort('trash'), typeSort, 'title'],
      agenda: [numericSort('agendapoints'), numericSort('advancementcost'), typeSort, 'title'],
      influence: [numericSort('factioncost'), factionSort, typeSort, 'title'],
      illustrator: ['illustrator', 'title']
    } 
  }

  this.sort.current = this.sort.methods.faction;
  this.sort.currentShorthand = 'faction';
  
  this.changeSort = function(value){
    this.sort.current = this.sort.methods[value];
    this.sort.currentShorthand = value;
  }
  
  this.setSide = function(side) {
    this.cards.display = this.cards[side];
  }
});