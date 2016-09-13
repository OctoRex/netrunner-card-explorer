app.filter('side', function(){
  return function (cards, side) {
  	// pick out all the cards from one side by matching the
  	// side code, no array provided here as an array would 
  	// just  be all cards
  	// no memoize on this one either as it's only used as the
  	// beginning once
    return cards.filter(function(card){
      return card.side_code == side;
    });
  };
});
