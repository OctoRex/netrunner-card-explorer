app.service('TypesSvc', function($http, HelperSvc){
  
  this.helper = HelperSvc;
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
    'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
    
  this.typeOrder = typeOrder;
  
  this.types = {
    all: [],
    selected: []
  }
  
  this.setTypes = function() {
    this.types.selected = [];
    this.types.all.forEach(function(type){
      if (type.selected) {
        this.types.selected.push(type.value);
      }
    }, this);
  }
  
  this.allTypes = function(){
    this.types.all.forEach(this.helper.checkAll(true));
    this.setTypes();
  }
  
  this.noTypes = function() {
    this.types.all.forEach(this.helper.checkAll(false));
    this.setTypes();
  }
  
  $http.get('/api/types').then(response => {
    
    let types = response.data;
    
    this.types.all = types;
  
    this.types.all.forEach(function(type){
      type.selected = true;
    });
    
    this.types.all.sort(function(a, b){
      return typeOrder.indexOf(a.value) - typeOrder.indexOf(b.value)
    });
  
    this.setTypes();
    
  }).catch(err => {
    console.log(err)
  });
});