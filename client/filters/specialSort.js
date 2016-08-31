app.filter('specialSort', function(CardMemoize){
  return function (cards, type) {
    
    var cls = function() {
      return cards.filter(function(card){
        switch (type) {
          case 'agenda':
            return card.hasOwnProperty('agendapoints') || card.text.match(/as an agenda/);
          case 'influence':
            return card.hasOwnProperty('factioncost');
          case 'subroutines':
          case 'strength':
            return card.hasOwnProperty('strength');
          case 'cost':
            return card.hasOwnProperty('cost');
          case 'trash':
            return card.hasOwnProperty('trash');
          default:
            return true;
        }
      });
    }
    
    return CardMemoize.memo('specialSort', [cards,type], cls);
  }
});
