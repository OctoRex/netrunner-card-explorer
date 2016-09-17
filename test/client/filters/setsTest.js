describe('Filter: sets', function(){
	
	beforeEach(module('blackat'));

	var filter,
		cards = [{pack_code: 'a'}, {pack_code: 'b'}, {pack_code: 'c'}],
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

	beforeEach(inject(function(_setsFilter_) {
		filter = _setsFilter_;
	}));

	it('should filter by a single pack code', function(){

		var results = filter(cards, ['a']);
		expect(results).to.have.length(1);

	});

	it('should filter by a multiple pack codes', function(){

		var results = filter(cards, ['a', 'b']);
		expect(results).to.have.length(2);

	});
		
});
