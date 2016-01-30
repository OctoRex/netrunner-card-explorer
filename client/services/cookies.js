app.service('CookiesSvc', function($cookies){
  
  // these don't need to be accessible outside of the service
  // so leave them private
  var storedFilters = $cookies.getObject('filters');
  // angular extend can play really funny with some objects which seems a bit
  // lame to me, so we have to check like this apparently
  storedFilters = angular.isObject(storedFilters) ? storedFilters : {};
  
  this.saveFilters = function(data) {
    
    // overlay whatever filters we do have onto the current ones
    storedFilters = angular.extend(storedFilters, data);
    
    // get a date 30 days from now
    var month = new Date();
    month.setDate(month.getDate() + 30)
    // save them all to the cookies
    $cookies.putObject('filters', storedFilters, {'expires': month});
  }
  
  // saving one filter just utilises the main save function handling
  // the formatting for us
  this.saveFilter = function(filter, value) {
    var filters = {}
    filters[filter] = value;
    this.saveFilters(filters);
  }
  
  this.getFilter = function(prop, def) {
    // small workaround for non-optional args in JS
    def = (typeof def != 'undefined') ? def : null;
    // only return the value if it's a valid value, otherwise use the default
    return (typeof storedFilters[prop] != 'undefined' && storedFilters[prop] != null) ? storedFilters[prop] : def;
  }
  
});