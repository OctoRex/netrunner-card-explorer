app.controller('CardsCtrl', function($scope, CardsSvc){

  $scope.cards = CardsSvc.cards;
  
  $scope.sort = CardsSvc.sort;
  
  $scope.sets = CardsSvc.sets;
});