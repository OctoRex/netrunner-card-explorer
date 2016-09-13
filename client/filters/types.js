app.filter('types', function(CardMemoize){
	return function (cards, selected) {

		// iterate over the cards and pickout all those with a type
		// code in the list
		var cls = function() {
			return cards.filter(function(card){
				return selected.indexOf(card.type_code) != -1;
			});
		};
		
		// memoize it for later to avoid slowdown
		return CardMemoize.memo('types', [cards,selected], cls);
	};
});
