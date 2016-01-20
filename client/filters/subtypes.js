app.filter('subtypes', function(){
  return function (input, selected) {
    
    var l = input.length;
    var out = [];
    
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          if (selected.indexOf(codes[j]) != -1) {
            out.push(card);
            break;
          }
        }
      }
    }
    return out;
  }
});
