app.filter('sets', function(CardMemoize){
  return function (cards, selected) {
    
    // iterate over the cards and pick out all those with a pack code
    // this is in the list (originally called set_code in the 1.0 NRDB API)
    var cls = function() {
      return cards.filter(function(card){
        return card.pack_code.filter(function(pack_code) {
          return selected.indexOf(pack_code) != -1;
        }).length;
      });
    };
    
    // memoize it so we don't do it over and over again and slow the
    // app down
    return CardMemoize.memo('sets', [cards,selected], cls);
  };
});
