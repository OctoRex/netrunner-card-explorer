app.service('SearchSvc', function(){
  
  this.search = {
    term: ''
  }
  
  this.clear = function() {
    this.search.term = '';
  }
});