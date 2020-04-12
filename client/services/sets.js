app.service('SetsSvc', function(ApiSvc, HelperSvc){
  
  this.helper = HelperSvc;
  
  this.sets = {
    all: [],
    selected: [],
    official: [],
    fanmade: [],
    display: [],
    showFanmade: false,
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
  
  this.setFanmade = function(fanmade) {
    if (fanmade) {
      this.sets.display = this.sets.all;
    } else {
      this.sets.display = this.sets.official;
    }
    this.sets.fanmade.forEach(function(set){
      set.selected = fanmade;
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
      if (set.ffg_id) {
        this.sets.official.push(set);
      } else {
        this.sets.fanmade.push(set);
      }
    }, this);
    
    this.sets.display = this.sets.all;
  
    this.setSets();
    
    this.sets.loaded = true;
    
  }).catch(err => {
    console.log(err);
  });

});