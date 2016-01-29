app.filter('specialSort', function(){
  return function (cards, type) {
    return cards.filter(function(card){
      switch (type) {
        case 'agenda':
          return card.hasOwnProperty('agendapoints');
        case 'influence':
          return card.hasOwnProperty('factioncost');
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
});
