app.filter('factions', function(CardMemoize){
  return function (cards, selected) {
    var cls = function(){
      return cards.filter(function(card){
        return selected.indexOf(card.faction_code) != -1;
      });
    }
    
    return CardMemoize.memo('factions', [cards,selected], cls);
  }
});
