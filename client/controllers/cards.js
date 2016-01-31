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
});