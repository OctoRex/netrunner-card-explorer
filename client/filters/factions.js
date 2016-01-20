app.filter('factions', function(){
  return function (input, selected) {
    var l = input.length;
    var out = [];
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (selected.indexOf(card.faction_code) != -1) {
        out.push(card);
      }
    }
    return out;
  }
});
