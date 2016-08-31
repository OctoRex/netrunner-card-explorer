app.service('SidesSvc', function(CardsSvc){
  
  this.sides = {
    current: 'corp'
  }
  
  this.setSide = function(side) {
    this.sides.current = side;
    CardsSvc.cards.display = CardsSvc.cards[side];
  }
});