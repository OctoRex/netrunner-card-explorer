app.service('SpecialsSvc', function(HelperSvc){
  
  this.helper = HelperSvc;
  
  this.specials = {
    all :[
      {
        value: 'unique',
        label: 'Unique Cards',
        selected: false
      },
      {
        value: 'available',
        label: 'Available Sets',
        selected: false
      }
    ],
    selected:[]
  }
  
  this.setSpecials = function() {
    this.specials.selected = [];
    this.specials.all.forEach(function(special){
      if (special.selected) {
        this.specials.selected.push(special.value);
      }
    }, this);
  }
  
  this.noSpecials = function() {
    this.specials.all.forEach(this.helper.checkAll(false));
    this.setSpecials();
  }
});