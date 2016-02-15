app.filter('groupBy', function (CardMemoize) {
  
  return function (cards, groupBy) {
    
    var createGroup = function(code, title) {
      return {
        title: title,
        cards: [],
        code: code
      }
    }
    
    var pluralString = function(num, item) {
      return num + ' ' + item + (num == 1 ? '' : 's');
    }

    var cls = function() {
      
      var groups = {};
      var out = [];
      
      cards.forEach(function(card){
        switch (groupBy) {
          
          case 'faction':
            if (!groups[card.faction_code]) {
              groups[card.faction_code] = createGroup(card.faction_code, card.faction);
              out.push(groups[card.faction_code]);
            }
            groups[card.faction_code].cards.push(card);
            break;
            
          case 'sets':
            if (!groups[card.set_code]) {
              groups[card.set_code] = createGroup(card.set_code, card.setname);
              out.push(groups[card.set_code]);
            }
            groups[card.set_code].cards.push(card);
            break;
            
          case 'type':
            if (!groups[card.type_code]) {
              groups[card.type_code] = createGroup(card.type_code, card.type);
              out.push(groups[card.type_code]);
            }
            groups[card.type_code].cards.push(card);
            break;
            
          case 'influence':
            if (!groups[card.factioncost]) {
              var title = '';
              for (var i = 0; i < 5; i++) title += (i < card.factioncost ? "\u25CF" : "\u25CB") + ' ';
              groups[card.factioncost] = createGroup(card.factioncost, title);
              out.push(groups[card.factioncost]);
            }
            groups[card.factioncost].cards.push(card);
            break;
            
          case 'agenda':
            var pts = '';
            if (card.hasOwnProperty('agendapoints')) {  
              pts = (card.agendapoints > 3) ? '4+' : card.agendapoints;
            } else {
              pts = 'non-agenda';
            }
            if (!groups[pts]) {
              groups[pts] = createGroup(pts, pluralString(pts, 'point'));
              out.push(groups[pts]);
            }
            groups[pts].cards.push(card);
            break;
            
          case 'cost':
            var cst = (card.cost > 9) ? '10+' : card.cost;
            if (!groups[cst]) {
              groups[cst] = createGroup(cst, pluralString(cst, 'credits'));
              out.push(groups[cst]);
            }
            groups[cst].cards.push(card);
            break;
            
          case 'strength':
            var str = (card.strength > 7) ? '8+' : card.strength;
            if (!groups[str]) {
              var title = str + ' strength';
              groups[str] = createGroup(card.strength, title);
              out.push(groups[str]);
            }
            groups[str].cards.push(card);
            break;
            
          case 'subroutines':
            if (!groups[card.subroutines]) {
              var title = card.subroutines + ' subroutine' + (card.subroutines != 1 ? 's' : '');
              groups[card.subroutines] = createGroup(card.subroutines, title);
              out.push(groups[card.subroutines]);
            }
            groups[card.subroutines].cards.push(card);
            break;
            
          case 'trash':
            var trs = (card.trash > 5) ? '6+' : card.trash;
            if (!groups[trs]) {
              groups[trs] = createGroup(trs, pluralString(trs, 'credits'));
              out.push(groups[trs]);
            }
            groups[trs].cards.push(card);
            break;
            
          case 'illustrator':
            var ill = card.illustrator || 'Not listed';
            if (!groups[ill]) {
              groups[ill] = createGroup(ill, ill);
              out.push(groups[ill]);
            }
            groups[ill].cards.push(card);
            break;
            
          default:
            if (!groups.all) {
              groups.all = createGroup('default', '');
              out.push(groups.all);
            }
            groups.all.cards.push(card);
            break;
        }
      });
      
      return out;
    }
    
    return CardMemoize.memo('types', [cards,groupBy], cls);
  };
});