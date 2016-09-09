
app.controller('SetsCtrl', function($scope, CookiesSvc, SetsSvc){
  
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
  
  $scope.$watch('sets.loaded', function(newValue) {
  
    $scope.sets.selected = CookiesSvc.getFilter('sets', $scope.sets.selected);
    $scope.sets.showSpoilers = CookiesSvc.getFilter('spoilers', $scope.sets.showSpoilers);
    
    $scope.sets.all.forEach(function(set){
      set.selected = $scope.sets.selected.indexOf(set.value) != -1;
    });
    SetsSvc.setSpoilers($scope.sets.showSpoilers);
    
    if (newValue) $scope.loaded.loaded++;
  });
});
