
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
