describe('Filter: types', function(){
	
	beforeEach(module('blackat'));

	var filter,
		cards = [{type_code: 'a'}, {type_code: 'b'}, {type_code: 'c'}],
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

	beforeEach(inject(function(_typesFilter_) {
		filter = _typesFilter_;
	}));

	it('should filter by a single type code', function(){

		var results = filter(cards, ['a']);
		expect(results).to.have.length(1);

	});

	it('should filter by a multiple type codes', function(){

		var results = filter(cards, ['a', 'b']);
		expect(results).to.have.length(2);

	});
		
});
