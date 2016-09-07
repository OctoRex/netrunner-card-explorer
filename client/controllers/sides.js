
controls.controller('SidesCtrl', function($scope, CookiesSvc, SidesSvc, SortSvc){
  
  $scope.sides = SidesSvc.sides;
  
  $scope.changeSide = function(side) {
    
    SidesSvc.setSide(side);
    var sort = SortSvc.checkSideFilter(side);
    if (sort) {
      CookiesSvc.saveFilter('sort', sort);
    }

    CookiesSvc.saveFilter('side', side);
  }
  
  $scope.changeSide(CookiesSvc.getFilter('side', 'corp'));
  
  $scope.loaded.loaded++;
});
