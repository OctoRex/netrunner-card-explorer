app.service('CardsSvc', function($http, sideFilter){
  
  this.cards = {
    all: [],
    corp: [],
    runner: [],
    display: [],
    loaded: false
  }
    
  $http.get('/api/cards').then(response => {
    
    let cards = response.data;
    
    this.cards.all = cards;
    let side = 'corp';
    if (this.cards.display == this.cards.runner) {
      side = 'runner';
    } 
    this.cards.corp = sideFilter(cards, 'corp');
    this.cards.runner = sideFilter(cards, 'runner');
    this.cards.display = this.cards[side];
    this.cards.loaded = true;
    
  }).catch(err => {
    console.log(err)
  });
 
});