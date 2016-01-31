app.filter('available', function(){
  return function (cards, available) {
    
    if (!available){
      return cards;
    }
    
    return cards.filter(function(card){
      var now = new Date();
      return now >= new Date(card.available);
    });
  }
});
