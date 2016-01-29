app.filter('subtypeOptions', function(){
  return function (filters, types) {
    return filters.filter(function(filter){
      return filter.types.filter(function(type) {
        return types.indexOf(type) != -1;
      }).length;
    });
  }
});