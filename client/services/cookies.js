app.service('CookiesSvc', function($cookies){
  
  var storedFilters = $cookies.getObject('filters');
  storedFilters = angular.isObject(storedFilters) ? storedFilters : {};
  
  this.saveFilters = function(data) {
    
    storedFilters = angular.extend(storedFilters, data);
    
    var now = new Date();
    now.setDate(now.getDate() + 30)
    $cookies.putObject('filters', storedFilters, {'expires': now});
  }
  
  this.saveFilter = function(filter, value) {
    var filters = {}
    filters[filter] = value;
    this.saveFilters(filters);
  }
  
  this.getFilter = function(prop, def) {
    def = (typeof def != 'undefined') ? def : null;
    return (typeof storedFilters[prop] != 'undefined') ? storedFilters[prop] : def;
  }
  
});