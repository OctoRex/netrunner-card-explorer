app.filter('side', function(){
  return function (input, side) {
    input = input || [];
    var out = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i].side_code == side){
        out.push(input[i]);
      }
    }
    
    return out;
  }
});
