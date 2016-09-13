app.filter('subtypeOptions', function(){
  return function (filters, types, side) {
    return filters.filter(function(filter){
      return filter.types[side].filter(function(type) {
        return types.indexOf(type) != -1;
      }).length;
    });
  };
});