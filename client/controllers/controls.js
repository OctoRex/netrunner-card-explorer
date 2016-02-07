var controls = angular.module('blackat.controls', ['ngCookies']);

controls.checkAll = function(selected) {
  return function(item){
    item.selected = selected;
  }
}

controls.controller('SortCtrl', function($scope, CookiesSvc, SortSvc, SidesSvc){
  
  $scope.sort = SortSvc.sort;
  $scope.sides = SidesSvc.sides;
  
  $scope.changeSort = function(){
    SortSvc.changeSort($scope.sort.currentShorthand);
    CookiesSvc.saveFilter('sort', $scope.sort.currentShorthand);
  }
  
  $scope.sort.currentShorthand = CookiesSvc.getFilter('sort', 'faction');
  
  $scope.changeSort();
});

controls.controller('SidesCtrl', function($scope, CookiesSvc, SidesSvc, SortSvc){
  
  $scope.sides = SidesSvc.sides;
  
  $scope.changeSide = function(side) {
    
    SidesSvc.setSide(side);
    SortSvc.checkSideFilter(side);

    CookiesSvc.saveFilter('side', side);
  }
  
  $scope.changeSide(CookiesSvc.getFilter('side', 'corp'));
});

controls.controller('TypesCtrl', function($scope, CookiesSvc, TypesSvc, SidesSvc){
  
  $scope.sides = SidesSvc.sides;
  $scope.types = TypesSvc.types;
  
  $scope.updateTypes = function() {
    TypesSvc.setTypes();
    CookiesSvc.saveFilter('types', $scope.types.selected);
  }
  
  $scope.allTypes = function(){
    TypesSvc.allTypes();
    CookiesSvc.saveFilter('types', $scope.types.selected);
  }
  
  $scope.noTypes = function() {
    TypesSvc.noTypes();
    CookiesSvc.saveFilter('types', $scope.types.selected);
  }
  
  $scope.types.selected = CookiesSvc.getFilter('types', $scope.types.selected);
  
  $scope.types.all.forEach(function(type){
    type.selected = $scope.types.selected.indexOf(type.value) != -1;
  });
  TypesSvc.setTypes();
});

controls.controller('SubtypesCtrl', function($scope, CookiesSvc, SubtypesSvc, TypesSvc, SidesSvc){
 
  $scope.subtypes = SubtypesSvc.subtypes;
  $scope.types = TypesSvc.types;
  $scope.sides = SidesSvc.sides;
  
  $scope.updateSubtypes = function() {
    SubtypesSvc.setSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  }
  
  $scope.allSubtypes = function(){
    SubtypesSvc.allSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  }
  
  $scope.noSubtypes = function() {
    SubtypesSvc.noSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  }
  
  $scope.subtypes.selected = CookiesSvc.getFilter('subtypes', $scope.subtypes.selected);
  
  $scope.subtypes.all.forEach(function(subtype){
    subtype.selected = $scope.subtypes.selected.indexOf(subtype.value) != -1;
  });
  SubtypesSvc.setSubtypes();
});

controls.controller('SetsCtrl', function($scope, CookiesSvc, SetsSvc){
  
  $scope.sets = SetsSvc.sets;
  
  $scope.updateSets = function() {
    SetsSvc.setSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  }
  
  $scope.allSets = function(){
    SetsSvc.allSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  }
  
  $scope.noSets = function() {
    SetsSvc.noSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  }
  
  $scope.setSpoilers = function() {
    SetsSvc.setSpoilers($scope.sets.showSpoilers);
    CookiesSvc.saveFilter('spoilers', $scope.sets.showSpoilers);
  }
  
  $scope.sets.selected = CookiesSvc.getFilter('sets', $scope.sets.selected);
  $scope.sets.showSpoilers = CookiesSvc.getFilter('spoilers', $scope.sets.showSpoilers);
  
  $scope.sets.all.forEach(function(set){
    set.selected = $scope.sets.selected.indexOf(set.value) != -1;
  });
  SetsSvc.setSets();
  SetsSvc.setSpoilers($scope.sets.showSpoilers);
});

controls.controller('FactionCtrl', function($scope, CookiesSvc, FactionsSvc, SidesSvc){
  
  $scope.sides = SidesSvc.sides;
  $scope.factions = FactionsSvc.factions;
  
  $scope.updateFactions = function() {
    FactionsSvc.setFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  }
  
  $scope.allFactions = function(){
    FactionsSvc.allFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  }
  
  $scope.noFactions = function() {
    FactionsSvc.noFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  }
  
  $scope.factions.selected = CookiesSvc.getFilter('factions', $scope.factions.selected);
  
  $scope.factions.all.forEach(function(faction){
    faction.selected = $scope.factions.selected.indexOf(faction.value) != -1;
  });
  FactionsSvc.setFactions();
});

controls.controller('SearchCtrl', function($scope, CookiesSvc, SearchSvc){
  
  $scope.search = SearchSvc.search;
  $scope.searchTitle = function() {
    CookiesSvc.saveFilter('search-title', $scope.search.title);
  }
  $scope.searchText = function() {
    CookiesSvc.saveFilter('search-text', $scope.search.text);
  }
  SearchSvc.search.title = CookiesSvc.getFilter('search-title', '');
  SearchSvc.search.text = CookiesSvc.getFilter('search-text', '');
});

controls.controller('PrefsCtrl', function($scope, CookiesSvc, SpecialsSvc){
  
  $scope.specials = SpecialsSvc.specials;
  
  $scope.updateSpecials = function()
  {
    SpecialsSvc.setSpecials();
    CookiesSvc.saveFilter('specials', $scope.specials.selected);
  }
  
  $scope.specials.selected = CookiesSvc.getFilter('specials', $scope.specials.selected);
  
  $scope.specials.all.forEach(function(special){
    special.selected = $scope.specials.selected.indexOf(special.value) != -1;
  });
  SpecialsSvc.setSpecials();
});

controls.controller('SpecialCtrl', function($scope, CookiesSvc, SpecialsSvc){
  
  $scope.specials = SpecialsSvc.specials;
  
  $scope.updateSpecials = function()
  {
    SpecialsSvc.setSpecials();
    CookiesSvc.saveFilter('specials', $scope.specials.selected);
  }
  
  $scope.specials.selected = CookiesSvc.getFilter('specials', $scope.specials.selected);
  
  $scope.specials.all.forEach(function(special){
    special.selected = $scope.specials.selected.indexOf(special.value) != -1;
  });
  SpecialsSvc.setSpecials();
});



controls.controller('ResetCtrl', function($scope, CookiesSvc, SidesSvc, SortSvc, SearchSvc, SetsSvc, FactionsSvc, TypesSvc, SubtypesSvc){
  $scope.resetAll = function() {
    SortSvc.changeSort('faction')    
    SearchSvc.search.title = '';
    SearchSvc.search.text = '';
    SetsSvc.allSets();
    TypesSvc.allTypes();
    SubtypesSvc.allSubtypes();
    FactionsSvc.allFactions();
    CookiesSvc.saveFilters({
      'search-title': '',
      'search-text': '',
      'sets': SetsSvc.sets.selected,
      'types': TypesSvc.types.selected,
      'subtypes': SubtypesSvc.subtypes.selected,
      'factions': FactionsSvc.factions.selected
    });
  }
  
  $scope.clearCookie = function() {
    CookiesSvc.clear();
  }
});