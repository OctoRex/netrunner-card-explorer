app.filter('specials', function(){
  return function (cards, selected) {
    
    var filters = { 
      uniqueness: function(card) {
        return card.uniqueness;
      },
      available: function(card) {
        var now = new Date();
        var release = new Date(card.available);
        return now >= release;
      }
    }
    
    cards.filter(function(card){
      
      if (selected.length == 0) {
        return true;
      }
      
      var keep = false;
      selected.forEach(function(selected){
        if (filter[selected](card)) {
          keep = true;
        }
      });
      
      return keep;
      
    });
  }
});
