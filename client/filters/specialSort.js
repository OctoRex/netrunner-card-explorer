app.filter('specialSort', function(CardMemoize){
	return function (cards, type) {
		
		// sometimes we need to filter the cards out depending
		// on various properties they have. Why might we be
		// doing this? Well if we're ordering in certain ways e.g.
		// agenda points then it's nice if we remove all those that
		// don't have any and so are irrelevant
		var cls = function() {
			return cards.filter(function(card){
				switch (type) {
					case 'agenda':
						// either agendas (of course) or cards that might get you agenda points if
						// played correctly (bit simplisitc, but it'll do)
						return card.hasOwnProperty('agenda_points') || card.text.match(/as an agenda/);
					case 'influence':
						return card.hasOwnProperty('faction_cost');
					case 'subroutines':
						return card.hasOwnProperty('subroutines');
					case 'strength':
						return card.hasOwnProperty('strength');
					case 'cost':
						return card.hasOwnProperty('cost');
					case 'trash':
						return card.hasOwnProperty('trash_cost');
					default:
						return true;
				}
			});
		};
		
		return CardMemoize.memo('specialSort', [cards,type], cls);
	};
});
