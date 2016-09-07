
controls.controller('SortCtrl', function($scope, CookiesSvc, SortSvc, SidesSvc){
  
  $scope.sort = SortSvc.sort;
  $scope.sides = SidesSvc.sides;
  
  $scope.changeSort = function(){
    SortSvc.changeSort($scope.sort.currentShorthand);
    CookiesSvc.saveFilter('sort', $scope.sort.currentShorthand);
  }
  
  $scope.sort.currentShorthand = CookiesSvc.getFilter('sort', 'faction');
  
  $scope.changeSort();
  
  $scope.loaded.loaded++;
});
