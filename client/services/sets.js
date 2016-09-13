app.service('SetsSvc', function(ApiSvc, HelperSvc){
  
  this.helper = HelperSvc;
  
  this.sets = {
    all: [],
    selected: [],
    available: [],
    spoilers: [],
    display: [],
    showSpoilers: false,
    loaded: false
  };

  this.setSets = function() {
    this.sets.selected = [];
    this.sets.display.forEach(function(set){
      if (set.selected) {
        
        this.sets.selected.push(set.value);
      }
    }, this);
  };
  
  this.allSets = function(){
    this.sets.display.forEach(this.helper.checkAll(true));
    this.setSets();
  };
  
  this.noSets = function() {
    this.sets.display.forEach(this.helper.checkAll(false));
    this.setSets();
  };
  
  this.find = function(code) {
    return this.sets.all.find((set, index, array) => {
      return set.value == code;
    });
  };
  
  this.setSpoilers = function(spoilers) {
    if (spoilers) {
      this.sets.display = this.sets.all;
    } else {
      this.sets.display = this.sets.available;
    }
    this.sets.spoilers.forEach(function(set){
      set.selected = spoilers;
    });
    this.setSets();
  };
  
  ApiSvc.sets().then(response => {
    
    let sets = response.data;
    
    this.sets.all = sets;

    let now = new Date();
    
    this.sets.all.forEach(function(set){
      set.selected = true;
      this.sets.selected.push(set.value);
      if (set.available && now >= new Date(set.available)) {
        this.sets.available.push(set);
      } else {
        this.sets.spoilers.push(set);
      }
    }, this);
    
    this.sets.display = this.sets.all;
  
    this.setSets();
    
    this.sets.loaded = true;
    
  }).catch(err => {
    console.log(err);
  });

});