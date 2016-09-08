app.service('TypesSvc', function(ApiSvc, HelperSvc){
  
  this.helper = HelperSvc;
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
    'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
    
  this.typeOrder = typeOrder;
  
  this.types = {
    all: [],
    selected: [],
    loaded: false
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
  
  this.find = function(code) {
    return this.types.all.find((type, index, array) => {
      return type.value == code;
    });
  }
  
  ApiSvc.types().then(response => {
    
    let types = response.data;
    
    this.types.all = types;
  
    this.types.all.forEach(function(type){
      type.selected = true;
    });
    
    this.types.all.sort(function(a, b){
      return typeOrder.indexOf(a.value) - typeOrder.indexOf(b.value)
    });
  
    this.setTypes();
    
    this.types.loaded = true;
    
  }).catch(err => {
    console.log(err)
  });
});