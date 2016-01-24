app.filter('sets', function(){
  return function (cards, selected) {
    return cards.filter(function(card){
      return selected.indexOf(card.set_code) != -1;
    });
  }
});
