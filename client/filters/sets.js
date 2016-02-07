app.filter('sets', function(CardMemoize){
  return function (cards, selected) {
    
    var cls = function() {
      return cards.filter(function(card){
        return selected.indexOf(card.set_code) != -1;
      });
    }
    
    return CardMemoize.memo('sets', [cards,selected], cls);
  }
});
