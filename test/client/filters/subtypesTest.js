describe('Filter: subtypes', function(){
	
	beforeEach(module('blackat'));

	var filter,
		cards = [
			{keywords: 'one'}, 
			{keywords: 'one - two'}, 
			{keywords: 'two - three'}, 
			{keywords: ''}
		],
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

	beforeEach(inject(function(_subtypesFilter_) {
		filter = _subtypesFilter_;
	}));

	it('should filter by a single subtype code', function(){

		var results = filter(cards, ['one']);
		expect(results).to.have.length(2);

	});

	it('should filter by a multiple subtype codes', function(){

		var results = filter(cards, ['two', 'three']);
		expect(results).to.have.length(2);

	});

	it('should include cards with no subtypes when provided with "none"', function(){

		var results = filter(cards, ['none']);
		expect(results).to.have.length(1);

	});
		
});
