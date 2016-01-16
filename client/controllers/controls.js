app.controller('ControlsCtrl', function($scope, CardsSvc){
  
  $scope.sortOptions = [
    {
      title: 'Alphabetically', 
      value: 'title'
    },
    {
      title: 'Type', 
      value: 'type'
    },
    {
      title: 'Faction', 
      value: 'faction'
    }
  ]
  
  $scope.sortOption = 'faction';
  
  $scope.changeSort = function(value){
    CardsSvc.changeSort(value);
  }
  
  $scope.changeSide = function(side) {
    CardsSvc.setSide(side);
  }
  
  $scope.sets = CardsSvc.sets;
  
  $scope.selectedSets = {};
  
  for (var i = 0; i < CardsSvc.sets.all.length; i++) {
    $scope.selectedSets[$scope.sets.all[i].value] = true;
  }
  
  $scope.updateSets = function(updates) {
    CardsSvc.setSets(updates);
  }
  
  $scope.updateSets($scope.selectedSets);
  
  $scope.showSets = false;
  
  $scope.toggleSets = function() {
    $scope.showSets = !$scope.showSets;
  }
});