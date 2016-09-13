app.filter('subtypes', function(CardMemoize){
	return function (cards, selected) {
		// originally these came on a property called subtype_codes
		// but now it's called keywords in the 2.0 NRDB API, which is 
		// fair enough because it better represents the data - there's
		// no really subtype entity to speak of in the cards, it's 
		// only implied
		var cls = function() {
			return cards.filter(function(card){
				if (card.keywords === "") {
					return selected.indexOf('none') != -1;
				} else {
					// the keywords property comes separated by '-' symbols so these
					// need to be split out
					var subtypes = card.keywords.split(' - ');
					return subtypes.filter(function(subtype) {
						return selected.indexOf(subtype) != -1;
					}).length;
				}
			});
		};
		
		return CardMemoize.memo('subtypes', [cards,selected], cls);
	};
});