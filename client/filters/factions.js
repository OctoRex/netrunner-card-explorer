app.filter('factions', function(CardMemoize){
  return function (cards, selected) {
  	// iterate over the cards and pick out all those with a faction
  	// code that's in the list you passed in
    var cls = function(){
      return cards.filter(function(card){
        return selected.indexOf(card.faction_code) != -1;
      });
    };
    
    // memoize it so that we don't keep doing it over and over again
    return CardMemoize.memo('factions', [cards,selected], cls);
  };
});
