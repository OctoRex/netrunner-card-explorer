
app.controller('SetsCtrl', function($scope, CookiesSvc, SetsSvc){
  
  $scope.sets = SetsSvc.sets;
  
  $scope.updateSets = function() {
    SetsSvc.setSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  };
  
  $scope.allSets = function(){
    SetsSvc.allSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  };
  
  $scope.noSets = function() {
    SetsSvc.noSets();
    CookiesSvc.saveFilter('sets', $scope.sets.selected);
  };
  
  $scope.setFanmade = function() {
    SetsSvc.setFanmade($scope.sets.showFanmade);
    CookiesSvc.saveFilter('fanmade', $scope.sets.showFanmade);
  };
  
  $scope.$watch('sets.loaded', function(newValue) {
  
    $scope.sets.selected = CookiesSvc.getFilter('sets', $scope.sets.selected);
    $scope.sets.showFanmade = CookiesSvc.getFilter('fanmade', $scope.sets.showFanmade);
    
    $scope.sets.all.forEach(function(set){
      set.selected = $scope.sets.selected.indexOf(set.value) != -1;
    });
    SetsSvc.setFanmade($scope.sets.showFanmade);
    
    if (newValue) $scope.loaded.loaded++;
  });
});
