app.filter('factions', function(){
  return function (cards, selected) {
    return cards.filter(function(card){
      return selected.indexOf(card.faction_code) != -1;
    });
  }
});
