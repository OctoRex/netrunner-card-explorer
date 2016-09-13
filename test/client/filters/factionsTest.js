describe('Filter: factions', function(){
	
	beforeEach(module('blackat'));

	var filter,
		cards = [{faction_code: 'a'}, {faction_code: 'b'}, {faction_code: 'c'}],
		mockMemo = {
			memo: function(filter, args, closure) {
				return closure();
			}
		};

	beforeEach(function() {
		module(function($provide) {
			$provide.value('CardMemoize', mockMemo);
		});
	});

	beforeEach(inject(function(_factionsFilter_) {
		filter = _factionsFilter_;
	}));

	it('should filter by a single faction code', function(){

		var results = filter(cards, ['a']);
		expect(results).to.have.length(1);

	});

	it('should filter by a multiple faction codes', function(){

		var results = filter(cards, ['a', 'b']);
		expect(results).to.have.length(2);

	});
		
});
