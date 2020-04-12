app.filter('groupBy', function (CardMemoize, TypesSvc, SetsSvc, FactionsSvc) {
  
  return function (cards, groupBy) {
    
    var createGroup = function(code, title) {
      return {
        title: title,
        cards: [],
        code: code
      };
    };
    
    var icon = function (code) {
      return '<span class="icon icon-' + code + '"></span>';
    };
    
    var pluralString = function(num, item) {
      return num + ' ' + item + (num == 1 ? '' : 's');
    };

    var addOrReplaceCard = function(cards, candidate) {
      var i = cards.findIndex(function(card) {
        return card.title == candidate.title
      });
      if (i !== -1) {
        cards.splice(i, 1, candidate);
      } else {
        cards.push(candidate);
      }

      return cards;
    }

    var cls = function() {
      
      var groups = {};
      var out = [];
      
      cards.forEach(function(card){
        var title = '';
        switch (groupBy) {
          
          case 'faction':
            let factionCode = card.faction_code;
            if (!groups[factionCode]) {
              let faction = FactionsSvc.find(factionCode);
              groups[factionCode] = createGroup(factionCode, 
                icon(factionCode) + ' ' + faction.label);
              out.push(groups[factionCode]);
            }
            addOrReplaceCard(groups[factionCode].cards, card);
            break;
            
          case 'sets':
            let packCode = card.pack_code; 
            if (!groups[packCode]) {
              let pack = SetsSvc.find(packCode);
              groups[packCode] = createGroup(packCode, pack.label);
              out.push(groups[packCode]);
            }
            groups[packCode].cards.push(card);
            break;
            
          case 'type':
            let typeCode = card.type_code;
            if (!groups[typeCode]) {
              let type = TypesSvc.find(typeCode);
              groups[typeCode] = createGroup(typeCode, type.label);
              out.push(groups[typeCode]);
            }
            addOrReplaceCard(groups[typeCode].cards, card);
            break;
            
          case 'influence':
            if (!groups[card.faction_cost]) {
              for (var i = 0; i < 5; i++) {
                title += (i < card.faction_cost ? "\u25CF" : "\u25CB") + ' ';
              }
              groups[card.faction_cost] = createGroup(card.faction_cost, title);
              out.push(groups[card.faction_cost]);
            }
            addOrReplaceCard(groups[card.faction_cost].cards, card);
            break;
            
          case 'agenda':
            var pts = '';
            if (card.hasOwnProperty('agenda_points')) {  
              pts = (card.agenda_points > 3) ? '4+' : card.agenda_points;
            } else {
              pts = 'non-agenda';
            }
            if (!groups[pts]) {
              groups[pts] = createGroup(pts, pluralString(pts, 'point'));
              out.push(groups[pts]);
            }
            addOrReplaceCard(groups[pts].cards, card);
            break;
            
          case 'cost':
            var cst = (card.cost > 9) ? '10+' : (card.cost === null ? 'X' : card.cost);
            if (!groups[cst]) {
              groups[cst] = createGroup(cst, cst + ' ' + icon('credit'));
              out.push(groups[cst]);
            }
            addOrReplaceCard(groups[cst].cards, card);
            break;
            
          case 'strength':
            var str = (card.strength > 7) ? '8+' : (card.strength === null ? 'X' : card.strength);
            if (!groups[str]) {
              title = str + ' strength';
              groups[str] = createGroup(card.strength, title);
              out.push(groups[str]);
            }
            addOrReplaceCard(groups[str].cards, card);
            break;
            
          case 'subroutines':
            if (!groups[card.subroutines]) {
              title = card.subroutines + ' ' + icon('subroutine');
              groups[card.subroutines] = createGroup(card.subroutines, title);
              out.push(groups[card.subroutines]);
            }
            addOrReplaceCard(groups[card.subroutines].cards, card);
            break;
            
          case 'trash':
            var trs = (card.trash_cost > 5) ? '6+' : card.trash_cost;
            if (!groups[trs]) {
              groups[trs] = createGroup(trs, trs + ' ' + icon('trash'));
              out.push(groups[trs]);
            }
            addOrReplaceCard(groups[trs].cards, card);
            break;
            
          case 'illustrator':
            var ill = card.illustrator || 'Not listed';
            if (!groups[ill]) {
              groups[ill] = createGroup(ill, ill);
              out.push(groups[ill]);
            }
            addOrReplaceCard(groups[ill].cards, card);
            break;
            
          default:
            if (!groups.all) {
              groups.all = createGroup('default', '');
              out.push(groups.all);
            }
            addOrReplaceCard(groups.all.cards, card);
            break;
        }
      });
      
      return out;
    };
    
    return CardMemoize.memo('types', [cards,groupBy], cls);
  };
});