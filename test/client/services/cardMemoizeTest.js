describe('Service: CardMemoize', function() {

	beforeEach(module('blackat'));

	var CardMemoize;

	beforeEach(inject(function(_CardMemoize_) {
		CardMemoize = _CardMemoize_;
	}));

	describe('#memo', function() {
		it('should return the result of the closure', function() {

			var a = 1, b = 2;

			var results = CardMemoize.memo('test', [a,b], function() { return a + b });
			expect(results).to.equal(3);
		});

		it('should return a stored result', function() {

			var a = 1, b = 2;

			CardMemoize.memo('test', [a,b], function() { return a + b });
			var results = CardMemoize.memo('test', [a,b]);
			
			expect(results).to.equal(3);
		});

		it('should not return a mis-matched result', function() {

			var a = 1, b = 2, c = 3;

			CardMemoize.memo('test', [a,b], function() { return a + b });
			CardMemoize.memo('test', [b,c], function() { return b + c });
			var first = CardMemoize.memo('test', [a,b]);
			var second = CardMemoize.memo('test', [b,c]);
			
			expect(first).to.equal(3);
			expect(second).to.equal(5);
		});

	});
});