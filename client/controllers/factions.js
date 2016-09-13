
app.controller('FactionCtrl', function($scope, CookiesSvc, FactionsSvc, SidesSvc){
  
  $scope.sides = SidesSvc.sides;
  $scope.factions = FactionsSvc.factions;
  
  $scope.updateFactions = function() {
    FactionsSvc.setFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  };
  
  $scope.allFactions = function(){
    FactionsSvc.allFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  };
  
  $scope.noFactions = function() {
    FactionsSvc.noFactions();
    CookiesSvc.saveFilter('factions', $scope.factions.selected);
  };
  
  $scope.$watch('factions.loaded', function(newValue) {
  
    $scope.factions.selected = CookiesSvc.getFilter('factions', $scope.factions.selected);
    $scope.factions.all.forEach(function(faction){
      faction.selected = $scope.factions.selected.indexOf(faction.value) != -1;
    });
    if (newValue) $scope.loaded.loaded++;
  });
});
