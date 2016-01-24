app.filter('types', function(){
  return function (cards, selected) {
    return cards.filter(function(card){
      return selected.indexOf(card.type_code) != -1;
    });
  }
});
