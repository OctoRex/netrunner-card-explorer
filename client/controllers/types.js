
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
  
  $scope.$watch('types.loaded', function(newValue) {
    if (newValue) $scope.loaded.loaded++;
  });
});
