app.filter('types', function(){
  return function (input, selected) {
    var l = input.length;
    var out = [];
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (selected.indexOf(card.type_code) != -1) {
        out.push(card);
      }
    }
    return out;
  }
});
