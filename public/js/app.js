var app = angular.module('app', []);
app.controller('CardsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc){

  $scope.cards = CardsSvc.cards;
  
  $scope.sort = CardsSvc.sort;
  
  $scope.sets = SetsSvc.sets;
  
  $scope.types = TypesSvc.types;
  
  $scope.subtypes = SubtypesSvc.subtypes;
});
app.controller('ControlsCtrl', function($scope, CardsSvc, SetsSvc, TypesSvc, SubtypesSvc){
  
  $scope.sortOptions = [
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
    },
    {
      title: 'Cost', 
      value: 'cost'
    }
  ];
  
  $scope.sortOption = 'faction';
  
  $scope.changeSort = function(value){
    CardsSvc.changeSort(value);
  }
  
  $scope.changeSide = function(side) {
    CardsSvc.setSide(side);
  }
  
  
  
  
  
  $scope.sets = SetsSvc.sets;
  
  $scope.selectedSets = {};
  
  for (var i = 0; i < $scope.sets.all.length; i++) {
    $scope.selectedSets[$scope.sets.all[i].value] = true;
  }
  
  $scope.updateSets = function(updates) {
    SetsSvc.setSets(updates);
  }
  
  $scope.showSets = false;
  
  $scope.toggleSets = function() {
    $scope.showSets = !$scope.showSets;
  }
  
  
  
 
  
  $scope.types = TypesSvc.types;
  
  $scope.selectedTypes = {};
  
  for (var i = 0; i < $scope.types.all.length; i++) {
    $scope.selectedTypes[$scope.types.all[i].value] = true;
  }
  
  $scope.updateTypes = function(updates) {
    TypesSvc.setTypes(updates);
  }
  
  $scope.showTypes = false;
  
  $scope.toggleTypes = function() {
    $scope.showTypes = !$scope.showTypes;
  }
  
  
  
  
  
  
  $scope.subtypes = SubtypesSvc.subtypes;
  
  $scope.selectedSubtypes = {};
  
  for (var i = 0; i < $scope.subtypes.all.length; i++) {
    $scope.selectedSubtypes[$scope.subtypes.all[i].value] = true;
  }
  
  $scope.updateSubtypes = function(updates) {
    SubtypesSvc.setSubtypes(updates);
  }
  
  $scope.showSubtypes = false;
  
  $scope.toggleSubtypes = function() {
    $scope.showSubtypes = !$scope.showSubtypes;
  }
});
app.filter('sets', function(){
  return function (input, selected) {
    var l = input.length;
    var out = [];
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (selected.indexOf(card.set_code) != -1) {
        out.push(card);
      }
    }
    return out;
  }
});

app.filter('side', function(){
  return function (input, side) {
    input = input || [];
    var out = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i].side_code == side){
        out.push(input[i]);
      }
    }
    
    return out;
  }
});

app.filter('subtypes', function(){
  return function (input, selected) {
    
    var l = input.length;
    var out = [];
    
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          if (selected.indexOf(codes[j]) != -1) {
            out.push(card);
            break;
          }
        }
      }
    }
    return out;
  }
});

app.filter('types', function(){
  return function (input, selected) {
    var l = input.length;
    var out = [];
    for (var i = 0; i < l; i++) {
      var card = input[i];
      if (selected.indexOf(card.type_code) != -1) {
        out.push(card);
      }
    }
    return out;
  }
});

app.service('CardsSvc', function(sideFilter){
  
  var initCards = function(input) {
    var cards = {
      all: [],
      corp: {
        all: [],
        filtered: []
      },
      runner: {
        all: [],
        filtered: []
      },
      display: []
    }
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (card.set_code != 'draft') {
        cards.all.push(card);
        cards[card.side_code].all.push(card);
        cards[card.side_code].filtered.push(card);
      }
    }
    
    return cards;
  }
  
  this.cards = initCards(window.data.cards);
  
  var typeOrder = ['identity', 'program', 'hardware', 'resource', 
    'event', 'agenda', 'ice', 'asset', 'upgrade', 'operation'];
  
  var typeSort = function(card) {
    return typeOrder.indexOf(card.type_code);
  }
  
  var costSort = function(card) {
    return (typeof card.cost == 'undefined') ? 1 : card.cost * -1;
  }
  
  this.sort = {
    methods : {
      title: ['title'],
      type: [typeSort, 'subtype_code', 'title'],
      faction: ['faction', typeSort, 'title'],
      cost: [costSort, 'faction', typeSort, 'title']
    } 
  }

  this.sort.current = this.sort.methods.faction;
  
  this.changeSort = function(value){
    this.sort.current = this.sort.methods[value];
  }
  
  this.setSide = function(side) {
    this.cards.display = this.cards[side].filtered;
  }
  
  // set the corp to show first
  this.setSide('corp');
});
app.service('SetsSvc', function(sideFilter){
  
  var initSets = function(input) {
    var setCodes = ['draft'];
    var sets = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var set = input[i];
      if (setCodes.indexOf(set.value) == -1) {
        setCodes.push(set.value);
        sets.all.push(set);
        sets.selected.push(set.value);
      }
    }
    
    return sets;
  }
  
  this.sets = initSets(window.data.sets);
  
  this.setSets = function(updates) {
    this.sets.selected = [];
    for(set in updates) {
      if (updates[set]) {
        this.sets.selected.push(set);
      }
    }
  }
});
app.service('SubtypesSvc', function(sideFilter){
  
  var initSubtypes = function(input) {
    var subtypeCodes = [];
    var subtypes = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (card.subtype_code) {
        var codes = card.subtype_code.split(' - ');
        var names = card.subtype.split(' - ');
        for (var j = 0; j < codes.length; j++) {
          if (subtypeCodes.indexOf(codes[j]) == -1) {
            subtypeCodes.push(codes[j]);
            subtypes.all.push({value: codes[j], label: names[j]});
            subtypes.selected.push(codes[j]);
          }
        }
      }
    }
    
    return subtypes;
  }
  
  this.subtypes = initSubtypes(window.data.cards);
  
  this.setSubtypes = function(updates) {
    this.subtypes.selected = [];
    for(subtype in updates) {
      if (updates[subtype]) {
        this.subtypes.selected.push(subtype);
      }
    }
  }
});
app.service('TypesSvc', function(sideFilter){
  
  var initTypes = function(input) {
    var typeCodes = [];
    var types = {
      all: [],
      selected: []
    };
    
    for (var i = 0; i < input.length; i++) {
      var card = input[i];
      if (typeCodes.indexOf(card.type_code) == -1) {
        typeCodes.push(card.type_code);
        types.all.push({value: card.type_code, label: card.type});
        types.selected.push(card.type_code);
      }
    }
    
    return types;
  }
  
  this.types = initTypes(window.data.cards);
  
  this.setTypes = function(updates) {
    this.types.selected = [];
    for(type in updates) {
      if (updates[type]) {
        this.types.selected.push(type);
      }
    }
  }

});