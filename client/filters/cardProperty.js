app.filter('cardProperty', function(){
  return function (cards, property, selected) {
    console.log(arguments);
    return cards.filter(function(card){
      return selected.indexOf(card[property]) != -1;
    });
  }
});

app.filter('cardPropertyList', function(){
  return function (cards, property, selected) {
    return cards.filter(function(card){
      var items = card[property].split(' - ');
      return subtypes.filter(function(item) {
        return selected.indexOf(item) != -1;
      }).length;
    });
  }
});
