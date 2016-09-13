app.filter('subtypeOptions', function(){
  return function (subtypes, types, side) {
  	// each subtype comes with an object of types
  	// split by side on it, so we need to find out 
  	// what side we're on currently and if any of
  	// the current types are in the list for that side
    return subtypes.filter(function(subtype){
      return subtype.types[side].filter(function(type) {
        return types.indexOf(type) != -1;
      }).length;
    });
    // doesn't require memoizing as it's such a small list
  };
});