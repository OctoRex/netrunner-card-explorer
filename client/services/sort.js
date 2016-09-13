app.service('SortSvc', function(TypesSvc, HelperSvc, CardsSvc){
  
  this.helper = HelperSvc;
  var cards = CardsSvc.cards;
 
  var typeSort = function(card) {
    return TypesSvc.typeOrder.indexOf(card.type_code);
  };
  
  var numericSort = function (property) {
    return function(card) {
      return (typeof card[property] == 'undefined') ? 1 : card[property] * -1;
    };
  };
  
  var factionSort = function(card) {
    return card.faction_code.match('neutral') ? 'ZZZ' : card.faction_code;
  };
  
  var subroutineSort = function(card) {
    return (card.subroutines == 'X') ? -100 : card.subroutines * -1;
  };
  
  this.sort = {
    methods : {
      title: 'title',
      type: [typeSort, 'keywords', 'title'],
      faction: [factionSort, typeSort, 'title'],
      cost: [numericSort('cost'), factionSort, typeSort, 'title'],
      sets: 'code',
      strength: [numericSort('strength'), subroutineSort, typeSort, 'title'],
      subroutines: [subroutineSort, numericSort('strength'), typeSort, 'title'],
      trash: [numericSort('trash_cost'), typeSort, 'title'],
      agenda: [numericSort('agenda_points'), factionSort, numericSort('advancementcost'), typeSort, 'title'],
      influence: [numericSort('faction_cost'), factionSort, typeSort, 'title'],
      illustrator: ['illustrator', 'title'],
      random: []
    },
    options: [
      {
        title: 'Sort by Faction', 
        value: 'faction',
        side: 'corprunner'
      },
      {
        title: 'Sort by Type', 
        value: 'type',
        side: 'corprunner'
      },
      {
        title: 'Sort by Name', 
        value: 'title',
        side: 'corprunner'
      },
      {
        title: 'Sort by Set Order', 
        value: 'sets',
        side: 'corprunner'
      },
      {
        title: 'Sort by Cost', 
        value: 'cost',
        side: 'corprunner'
      },
      {
        title: 'Sort by Strength', 
        value: 'strength',
        side: 'corprunner'
      },
      {
        title: 'Sort by Subroutines', 
        value: 'subroutines',
        side: 'corp'
      },
      {
        title: 'Sort by Trash Cost', 
        value: 'trash',
        side: 'corp'
      },
      {
        title: 'Sort by Agenda Points', 
        value: 'agenda',
        side: 'corp'
      },
      {
        title: 'Sort by Influence Cost', 
        value: 'influence',
        side: 'corprunner'
      },
      {
        title: 'Sort by Illustrator', 
        value: 'illustrator',
        side: 'corprunner'
      },
      {
        title: 'Randomize', 
        value: 'random',
        side: 'corprunner'
      }
    ]
  };

  this.sort.current = this.sort.methods.faction;
  this.sort.currentShorthand = 'faction';
  
  this.checkSideFilter = function(side) {

    var current = this.sort.options.find(function(option) {
      return option.value == this.sort.currentShorthand;
    }, this);
    if (current.side.search(side) == -1) {
      this.changeSort('faction');
      return 'faction';
    }
  };
  
  this.changeSort = function(value){
    this.sort.current = this.sort.methods[value];
    this.sort.currentShorthand = value;
    if (value == 'random') {
      this.helper.shuffle(cards.corp);
      this.helper.shuffle(cards.runner);
    }
  };
});