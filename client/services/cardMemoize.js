app.service('CardMemoize', function(){
  
  var $$cache = {};
  
  function getHash(filter, args) {
    var str = JSON.stringify(args, function(key, value) {
      if (angular.isObject(value) && typeof value.code != 'undefined') {
        return value.code;
      } else {
        return value;
      }
    });
    
    return filter + ':' + str;
  }
  
  this.memo = function(filter, args, closure) {
    
    var hash = getHash(filter, args);
    
    if (!$$cache[hash]) {
      $$cache[hash] = closure();
    }
    
    return $$cache[hash];
  };
  
});
