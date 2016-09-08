app.service('SubtypesSvc', function(ApiSvc, HelperSvc){
  
  this.helper = HelperSvc;
  
  this.subtypes = {
    all: [],
    selected: [],
    loaded: false
  }
  
  this.setSubtypes = function() {
    this.subtypes.selected = [];
    this.subtypes.all.forEach(function(subtype){
      if (subtype.selected) {
        this.subtypes.selected.push(subtype.value);
      }
    }, this);
  }
  
  this.allSubtypes = function(){
    this.subtypes.all.forEach(this.helper.checkAll(true));
    this.setSubtypes();
  }
  
  this.noSubtypes = function() {
    this.subtypes.all.forEach(this.helper.checkAll(false));
    this.setSubtypes();
  }
  
  ApiSvc.subtypes().then(response => {
    
    let subtypes = response.data;
    
    this.subtypes.all = subtypes;
  
    this.subtypes.all.forEach(function(subtype){
      subtype.selected = true;
    });
    
    this.subtypes.all.sort(function(a, b){
      if (a.value == 'none') {
        return -1;
      } else if (b.value == 'none') {
        return 1;
      } else {
        return a.label.localeCompare(b.label);
      }
    });
  
    this.setSubtypes();
    
    this.subtypes.loaded = true;
    
  }).catch(err => {
    console.log(err)
  });
  
});