app.controller('CardsCtrl', function($scope, CardsSvc, SortSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc, SpecialsSvc){

  $scope.cards = CardsSvc.cards;
  
  $scope.sort = SortSvc.sort;
  
  $scope.sets = SetsSvc.sets;
  
  $scope.types = TypesSvc.types;
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.factions = FactionsSvc.factions;
  
  $scope.specials = SpecialsSvc.specials;
  
  $scope.search = SearchSvc.search;

  $scope.cardHeader = function(card, previous, sort) {
    
    var column = '';
    switch (sort) {
      case 'type':
        column = 'type';
        break;
      default:
        return false;
    }
    
    if (typeof previous == 'undefined') {
      return card[column];
    }
    
    if (card[column] != previous[column]) {
      console.log(card[column], previous[column]);
      return card[column];
    }
  }
  
  $scope.getDividerHeader = function(card) {
    return card.index;
    return card.title;
  }
  
  $scope.checkHeaderDiff = function(card, prev) {
    console.log(card, prev);
    return true;
    var i = $scope.cards.display.indexOf(card);
    console.log(index, i);
    return false;
    // console.log(card, )
    // if (!prev || (prev && card.type_code != prev.type_code)) {
      // if (prev) console.log(card.type_code, prev.type_code);
      // return true;
    // }
  }
});