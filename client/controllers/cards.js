app.controller('CardsCtrl', function($scope, sideFilter){
  
  $scope.fullSet = window.cards;
  
  $scope.cards = [];
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
  'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
  
  var typeSort = function(card) {
    return typeOrder.indexOf(card.type_code);
  }
  
  $scope.sort = {}
  
  $scope.sort.options = [
    {
      title: 'Alphabetically', 
      value: 'title'
    },
    {
      title: 'Type', 
      value: 'type'
    },
    {
      title: 'Faction', 
      value: 'faction'
    }
  ]
  
  $scope.sort.filters = {
    title: ['title'],
    type: [typeSort, 'subtype_code', 'title'],
    faction: ['faction', typeSort, 'title']
  }
  
  $scope.sort.option = $scope.sort.options[2].value;
  
  $scope.sort.filter = $scope.sort.filters.faction;
  
  $scope.sort.change = function(value){
    $scope.sort.filter = $scope.sort.filters[value];
  }
  
  $scope.changeSide = function(side) {
    $scope.cards = sideFilter($scope.fullSet, side);
  }
});