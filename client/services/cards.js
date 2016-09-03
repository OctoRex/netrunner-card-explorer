app.service('CardsSvc', function($http, sideFilter){
  
  this.cards = {
    all: [],
    corp: [],
    runner: [],
    display: []
  }
    
  $http.get('/api/cards').then(response => {
    
    let cards = response.data;
    
    this.cards = {
      all: cards,
      corp: sideFilter(cards, 'corp'),
      runner: sideFilter(cards, 'runner'),
      display: []
    }
    
  }).catch(err => {
    console.log(err)
  });
 
});