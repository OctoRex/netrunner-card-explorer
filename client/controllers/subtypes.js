
app.controller('SubtypesCtrl', function($scope, CookiesSvc, SubtypesSvc, TypesSvc, SidesSvc){
 
  $scope.subtypes = SubtypesSvc.subtypes;
  $scope.types = TypesSvc.types;
  $scope.sides = SidesSvc.sides;
  
  $scope.updateSubtypes = function() {
    SubtypesSvc.setSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  };
  
  $scope.allSubtypes = function(){
    SubtypesSvc.allSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  };
  
  $scope.noSubtypes = function() {
    SubtypesSvc.noSubtypes();
    CookiesSvc.saveFilter('subtypes', $scope.subtypes.selected);
  };
  
  $scope.$watch('subtypes.loaded', function(newValue) {
    $scope.subtypes.selected = CookiesSvc.getFilter('subtypes', $scope.subtypes.selected);
    $scope.subtypes.all.forEach(function(subtype){
      subtype.selected = $scope.subtypes.selected.indexOf(subtype.value) != -1;
    });
    if (newValue) $scope.loaded.loaded++;
  });
});
