app.controller('CardsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc){

  $scope.cards = CardsSvc.cards;
  
  $scope.sort = CardsSvc.sort;
  
  $scope.sets = SetsSvc.sets;
  
  $scope.types = TypesSvc.types;
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.factions = FactionsSvc.factions;
});