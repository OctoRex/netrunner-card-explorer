var controls = angular.module('blackat.controls', ['ngCookies']);

controls.controller('ControlsCtrl', function($scope){
  
  $scope.loaded = {
    loaded : 0
  };
});
