describe('Filter: subtypeOptions', function(){
	
	beforeEach(module('blackat'));

	var filter,
		subtypes = [
			{types: {corp: ['a', 'b'], runner: ['x']}},
			{types: {corp: ['b', 'c', 'd'], runner: ['x', 'y', 'z']}},
			{types: {corp: ['c', 'e'], runner: []}}
		],
		mockMemo = {
			memo: function(filter, args, closure) {
				return closure();
			}
		};

	beforeEach(inject(function(_subtypeOptionsFilter_) {
		filter = _subtypeOptionsFilter_;
	}));

	it('should filter by a single type code for runner', function(){

		var results = filter(subtypes, ['x'], 'runner');
		expect(results).to.have.length(2);

	});

	it('should filter by a single type code for corp', function(){

		var results = filter(subtypes, ['e'], 'corp');
		expect(results).to.have.length(1);

	});

	it('should filter by a multiple type codes', function(){

		var results = filter(subtypes, ['b', 'c'], 'corp');
		expect(results).to.have.length(3);

	});
		
});
