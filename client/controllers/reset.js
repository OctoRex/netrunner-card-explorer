
app.controller('ResetCtrl', function($scope, CookiesSvc, SidesSvc, SortSvc, SearchSvc, SetsSvc, FactionsSvc, TypesSvc, SubtypesSvc){
  $scope.resetAll = function() {
    SortSvc.changeSort('faction');
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
  };
  
  $scope.clearCookie = function() {
    CookiesSvc.clear();
  };
});
