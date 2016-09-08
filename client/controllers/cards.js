app.controller('CardsCtrl', function($scope, CardsSvc, SortSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc){

  $scope.cards = CardsSvc.cards;
    
  $scope.sort = SortSvc.sort;
  
  $scope.sets = SetsSvc.sets;
  
  $scope.types = TypesSvc.types;
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.factions = FactionsSvc.factions;
  
  $scope.search = SearchSvc.search;
  
});