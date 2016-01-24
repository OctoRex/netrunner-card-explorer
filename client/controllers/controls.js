app.controller('ControlsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc){
  
  $scope.sortOptions = [
    {
      title: 'Sort by Faction', 
      value: 'faction',
      side: 'corprunner'
    },
    {
      title: 'Sort by Type', 
      value: 'type',
      side: 'corprunner'
    },
    {
      title: 'Sort by Name', 
      value: 'title',
      side: 'corprunner'
    },
    {
      title: 'Sort by Set Order', 
      value: 'sets',
      side: 'corprunner'
    },
    {
      title: 'Sort by Cost', 
      value: 'cost',
      side: 'corprunner'
    },
    {
      title: 'Sort by Strength', 
      value: 'strength',
      side: 'corprunner'
    },
    {
      title: 'Sort by Trash Cost', 
      value: 'trash',
      side: 'corp'
    },
    {
      title: 'Sort by Agenda Points', 
      value: 'agenda',
      side: 'corp'
    },
    {
      title: 'Sort by Influence Cost', 
      value: 'influence',
      side: 'corprunner'
    },
    {
      title: 'Sort by Illustrator', 
      value: 'illustrator',
      side: 'corprunner'
    }
  ];
  
  $scope.sortOption = 'faction';
  $scope.currentSide = 'corp';
  
  $scope.changeSort = function(){
    CardsSvc.changeSort($scope.sortOption);
  }
  
  $scope.changeSide = function(side) {
    $scope.currentSide = side;
    CardsSvc.setSide(side);
    var current = $scope.sortOptions.find(function(option) {
      return option.value == $scope.sortOption;
    });
    if (current.side.search(side) == -1) {
      $scope.sortOption = 'faction';
      
      $scope.changeSort();
    }
  }
  
  
  var checkAll = function(selected) {
    return function(item){
      item.selected = selected;
    }
  }
  
  $scope.sets = SetsSvc.sets;
  $scope.updateSets = SetsSvc.setSets;
  
  $scope.sets.all.forEach(checkAll(true));;
  
  $scope.allSets = function(){
    $scope.sets.all.forEach(checkAll(true));
    $scope.updateSets();
  }
  
  $scope.noSets = function() {
    $scope.sets.all.forEach(checkAll(false));
    $scope.updateSets();
  }
  
  
  
  
  $scope.types = TypesSvc.types;
  $scope.updateTypes = TypesSvc.setTypes;
  
  $scope.types.all.forEach(checkAll(true));;
  
  $scope.allTypes = function(){
    $scope.types.all.forEach(checkAll(true));
    $scope.updateTypes();
  }
  
  $scope.noTypes = function() {
    $scope.types.all.forEach(checkAll(false));
    $scope.updateTypes();
  }
 
  
  $scope.subtypes = SubtypesSvc.subtypes;
  $scope.updateSubtypes = SubtypesSvc.setSubtypes;
  
  $scope.subtypes.all.forEach(checkAll(true));;
  
  $scope.allSubtypes = function(){
    $scope.subtypes.all.forEach(checkAll(true));
    $scope.updateSubtypes();
  }
  
  $scope.noSubtypes = function() {
    $scope.subtypes.all.forEach(checkAll(false));
    $scope.updateSubtypes();
  }
  
  
  $scope.factions = FactionsSvc.factions;
  $scope.updateFactions = FactionsSvc.setFactions;
  
  $scope.factions.all.forEach(checkAll(true));;
  
  $scope.allFactions = function(){
    $scope.factions.all.forEach(checkAll(true));
    $scope.updateFactions();
  }
  
  $scope.noFactions = function() {
    $scope.factions.all.forEach(checkAll(false));
    $scope.updateFactions();
  }
  
  $scope.search = SearchSvc.search;
});