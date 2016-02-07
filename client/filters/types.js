app.filter('types', function(CardMemoize){
  return function (cards, selected) {
    var cls = function() {
      return cards.filter(function(card){
        return selected.indexOf(card.type_code) != -1;
      });
    }
    
    return CardMemoize.memo('types', [cards,selected], cls);
  }
});
