app.service('ApiSvc', function($http){
  
  this.cards = function() {
    return $http.get('/api/cards');
  }
  
  this.factions = function() {
    return $http.get('/api/factions');
  }
  
  this.sets = function() {
    return $http.get('/api/sets');
  }
    
  this.types = function() {
    return $http.get('/api/types');
  }
    
  this.subtypes = function() {
    return $http.get('/api/subtypes');
  }
    
});