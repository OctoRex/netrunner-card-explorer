app.service('CardsSvc', function(sideFilter){
  
  var cards = window.data.cards;
  
  this.cards = {
    all: cards,
    corp: sideFilter(cards, 'corp'),
    runner: sideFilter(cards, 'runner'),
    display: []
  }
});