app.controller('ControlsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc){
  
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
    },
    {
      title: 'Cost', 
      value: 'cost'
    }
  ];
  
  $scope.sortOption = 'faction';
  
  $scope.changeSort = function(value){
    CardsSvc.changeSort(value);
  }
  
  $scope.changeSide = function(side) {
    CardsSvc.setSide(side);
  }
  
  
  
  
  
  $scope.sets = SetsSvc.sets;
  
  $scope.selectedSets = {};
  
  for (var i = 0; i < $scope.sets.all.length; i++) {
    $scope.selectedSets[$scope.sets.all[i].value] = true;
  }
  
  $scope.updateSets = function(updates) {
    SetsSvc.setSets(updates);
  }
  
  $scope.showSets = false;
  
  $scope.toggleSets = function() {
    $scope.showSets = !$scope.showSets;
  }
  
  
  
 
  
  $scope.types = TypesSvc.types;
  
  $scope.selectedTypes = {};
  
  for (var i = 0; i < $scope.types.all.length; i++) {
    $scope.selectedTypes[$scope.types.all[i].value] = true;
  }
  
  $scope.updateTypes = function(updates) {
    TypesSvc.setTypes(updates);
  }
  
  $scope.showTypes = false;
  
  $scope.toggleTypes = function() {
    $scope.showTypes = !$scope.showTypes;
  }
  
  
  
  
  
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.selectedSubtypes = {};
  
  for (var i = 0; i < $scope.subtypes.all.length; i++) {
    $scope.selectedSubtypes[$scope.subtypes.all[i].value] = true;
  }
  
  $scope.updateSubtypes = function(updates) {
    SubtypesSvc.setSubtypes(updates);
  }
  
  $scope.showSubtypes = false;
  
  $scope.toggleSubtypes = function() {
    $scope.showSubtypes = !$scope.showSubtypes;
  }
});