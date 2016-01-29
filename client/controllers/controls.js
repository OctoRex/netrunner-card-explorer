app.controller('ControlsCtrl', function($scope, CookiesSvc, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc, FactionsSvc, SearchSvc){
  
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
  
  $scope.sortOption = CookiesSvc.getFilter('sort', 'faction');
  $scope.currentSide = CookiesSvc.getFilter('side', 'corp');
  
  $scope.changeSort = function(){
    CardsSvc.changeSort($scope.sortOption);
    CookiesSvc.saveFilter('sort', $scope.sortOption);
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
    CookiesSvc.saveFilter('side', side);
  }
  
  $scope.changeSide($scope.currentSide);
  
  
  var checkAll = function(selected) {
    return function(item){
      item.selected = selected;
    }
  }
  
  $scope.sets = SetsSvc.sets;
  $scope.updateSets = function() {
    SetsSvc.setSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  }
  
  $scope.sets.selected = CookiesSvc.getFilter('sets', $scope.sets.selected);
  
  $scope.sets.all.forEach(function(set){
    set.selected = $scope.sets.selected.indexOf(set.value) != -1;
  });
  SetsSvc.setSets();
  
  $scope.allSets = function(){
    $scope.sets.all.forEach(checkAll(true));
    $scope.updateSets();
  }
  
  $scope.noSets = function() {
    $scope.sets.all.forEach(checkAll(false));
    $scope.updateSets();
  }
  
  
  $scope.types = TypesSvc.types;
  $scope.updateTypes = function() {
    TypesSvc.setTypes();
    CookiesSvc.saveFilter('types', $scope.types.selected);
  }
  
  $scope.types.selected = CookiesSvc.getFilter('types', $scope.types.selected);
  
  $scope.types.all.forEach(function(type){
    type.selected = $scope.types.selected.indexOf(type.value) != -1;
  });
  TypesSvc.setTypes();
  
  $scope.allTypes = function(){
    $scope.types.all.forEach(checkAll(true));
    $scope.updateTypes();
  }
  
  $scope.noTypes = function() {
    $scope.types.all.forEach(checkAll(false));
    $scope.updateTypes();
  }
 
  
  $scope.subtypes = SubtypesSvc.subtypes;
  $scope.updateSubtypes = function() {
    SubtypesSvc.setSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  }
  
  $scope.subtypes.selected = CookiesSvc.getFilter('subtypes', $scope.subtypes.selected);
  
  $scope.subtypes.all.forEach(function(subtype){
    subtype.selected = $scope.subtypes.selected.indexOf(subtype.value) != -1;
  });
  SubtypesSvc.setSubtypes();
  
  $scope.allSubtypes = function(){
    $scope.subtypes.all.forEach(checkAll(true));
    $scope.updateSubtypes();
  }
  
  $scope.noSubtypes = function() {
    $scope.subtypes.all.forEach(checkAll(false));
    $scope.updateSubtypes();
  }
  
  
  $scope.factions = FactionsSvc.factions;
  $scope.updateFactions = function() {
    FactionsSvc.setFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  }
  
  $scope.factions.selected = CookiesSvc.getFilter('factions', $scope.factions.selected);
  
  $scope.factions.all.forEach(function(faction){
    faction.selected = $scope.factions.selected.indexOf(faction.value) != -1;
  });
  FactionsSvc.setFactions();
  
  $scope.allFactions = function(){
    $scope.factions.all.forEach(checkAll(true));
    $scope.updateFactions();
  }
  
  $scope.noFactions = function() {
    $scope.factions.all.forEach(checkAll(false));
    $scope.updateFactions();
  }
  
  $scope.search = SearchSvc.search;
  $scope.setSearch = function() {
    CookiesSvc.saveFilter('search', $scope.search.term);
  }
  SearchSvc.search.term = CookiesSvc.getFilter('search', '');
  
  $scope.resetAll = function() {
    $scope.search.term = '';
    $scope.allSets();
    $scope.allTypes();
    $scope.allSubtypes();
    $scope.allFactions();
  }
});
