app.service('SetsSvc', function(){
  
  this.sets = {
    all: window.data.sets,
    selected: []
  }
  
  var s = this.sets;
  
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
  
  this.setSets();
});