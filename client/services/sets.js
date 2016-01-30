app.service('SetsSvc', function(HelperSvc){
  
  this.helper = HelperSvc;
  
  this.sets = {
    all: window.data.sets,
    selected: []
  }
  
  this.sets.all.forEach(function(set){
    set.selected = true;
    this.sets.selected.push(set.value);
  }, this);
  
  this.setSets = function() {
    this.sets.selected = [];
    this.sets.all.forEach(function(set){
      if (set.selected) {
        this.sets.selected.push(set.value);
      }
    }, this);
  }
  
  this.allSets = function(){
    this.sets.all.forEach(this.helper.checkAll(true));
    this.setSets();
  }
  
  this.noSets = function() {
    this.sets.all.forEach(this.helper.checkAll(false));
    this.setSets();
  }
  
  this.setSets();
});