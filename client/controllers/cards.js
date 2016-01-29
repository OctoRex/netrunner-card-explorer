app.controller('CardsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc){

  $scope.cards = CardsSvc.cards;
  
  $scope.sort = CardsSvc.sort;
  
  $scope.sets = SetsSvc.sets;
  
  $scope.types = TypesSvc.types;
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.factions = FactionsSvc.factions;
  
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
});