app.controller('ControlsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc){
  
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
    },
    {
      title: 'Set Order', 
      value: 'sets'
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
  
  $scope.checkAllSets = function() {
    for (var i = 0; i < $scope.sets.all.length; i++) {
      $scope.selectedSets[$scope.sets.all[i].value] = true;
    }
  }
  
  $scope.checkAllSets();
  
  $scope.allSets = function(){
    $scope.checkAllSets();
    $scope.updateSets();
  }
  
  $scope.noSets = function(){
    for (set in $scope.selectedSets) {
      $scope.selectedSets[set] = false;
    }
    $scope.updateSets();
  }
  
  $scope.updateSets = function() {
    SetsSvc.setSets($scope.selectedSets);
  }
  
  $scope.showSets = false;
  
  $scope.toggleSets = function() {
    $scope.showSets = !$scope.showSets;
  }
  
  
  
 
  
  $scope.types = TypesSvc.types;
  
  $scope.selectedTypes = {};
  
  $scope.checkAllTypes = function() {
    for (var i = 0; i < $scope.types.all.length; i++) {
      $scope.selectedTypes[$scope.types.all[i].value] = true;
    }
  }
  
  $scope.checkAllTypes();
  
  $scope.updateTypes = function() {
    TypesSvc.setTypes($scope.selectedTypes);
  }
  
  $scope.showTypes = false;
  
  $scope.toggleTypes = function() {
    $scope.showTypes = !$scope.showTypes;
  }
  
  $scope.allTypes = function(){
    $scope.checkAllTypes();
    $scope.updateTypes();
  }
  
  $scope.noTypes = function(){
    for (type in $scope.selectedTypes) {
      $scope.selectedTypes[type] = false;
    }
    $scope.updateTypes();
  }
  
  
  
  
  
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.selectedSubtypes = {};
  
  $scope.checkAllSubtypes = function(){
    for (var i = 0; i < $scope.subtypes.all.length; i++) {
      $scope.selectedSubtypes[$scope.subtypes.all[i].value] = true;
    }
  }
  
  $scope.checkAllSubtypes();
  
  $scope.updateSubtypes = function() {
    SubtypesSvc.setSubtypes($scope.selectedSubtypes);
  }
  
  $scope.showSubtypes = false;
  
  $scope.toggleSubtypes = function() {
    $scope.showSubtypes = !$scope.showSubtypes;
  }
  
  $scope.allSubtypes = function(){
    $scope.checkAllSubtypes();
    $scope.updateSubtypes();
  }
  
  $scope.noSubtypes = function(){
    for (subtype in $scope.selectedSubtypes) {
      $scope.selectedSubtypes[subtype] = false;
    }
    $scope.updateSubtypes();
  }
  
  
  
  
  $scope.factions = FactionsSvc.factions;
  
  $scope.selectedFactions = {};
  
  for (var i = 0; i < $scope.factions.all.length; i++) {
    $scope.selectedFactions[$scope.factions.all[i].value] = true;
  }
  
  $scope.updateFactions = function(updates) {
    FactionsSvc.setFactions(updates);
  }
  
  $scope.showFactions = false;
  
  $scope.toggleFactions = function() {
    $scope.showFactions = !$scope.showFactions;
  }
  
  $scope.search = SearchSvc.search;
});