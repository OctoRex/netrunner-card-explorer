app.service('HelperSvc', function(){

  this.checkAll = function(selected) {
    return function(item){
      item.selected = selected;
    }
  }
});
