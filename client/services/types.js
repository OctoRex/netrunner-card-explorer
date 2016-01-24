app.service('TypesSvc', function(){
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
    'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
    
  this.typeOrder = typeOrder;
  
  this.types = {
    all: window.data.types,
    selected: []
  }
  
  this.types.all.forEach(function(type){
    type.selected = true;
  });
  
  this.types.all.sort(function(a, b){
    return typeOrder.indexOf(a.value) - typeOrder.indexOf(b.value)
  });
  
  this.setTypes = function() {
    this.types.selected = [];
    this.types.all.forEach(function(type){
      if (type.selected) {
        this.types.selected.push(type.value);
      }
    }, this);
  }
  
  this.setTypes();
});