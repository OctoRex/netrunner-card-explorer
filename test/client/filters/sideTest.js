describe('Filter: side', function(){
	
	beforeEach(module('blackat'));

	var filter,
		cards = [{side_code: 'corp'}, {side_code: 'corp'}, {side_code: 'runner'}];

	beforeEach(inject(function(_sideFilter_) {
		filter = _sideFilter_;
	}));

	it('should filter by one side', function(){

		var results = filter(cards, 'corp');
		expect(results).to.have.length(2);

	});
		
});