app.filter('subtypes', function(CardMemoize){
  return function (cards, selected) {
    var cls = function() {
      return cards.filter(function(card){
        if (card.subtype_code == "") {
          return selected.indexOf('none') != -1;
        } else {
          var subtypes = card.subtype_code.split(' - ');
          return subtypes.filter(function(subtype) {
            return selected.indexOf(subtype) != -1;
          }).length;
        }
      });
    }
    
    return CardMemoize.memo('subtypes', [cards,selected], cls);
  }
});