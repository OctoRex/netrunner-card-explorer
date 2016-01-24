app.filter('side', function(){
  return function (cards, side) {
    return cards.filter(function(card){
      return card.side_code == side;
    });
  }
});
