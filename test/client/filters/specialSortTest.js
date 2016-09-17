describe('Filter: specialSort', function(){
	
	beforeEach(module('blackat'));

	var filter,
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

	beforeEach(inject(function(_specialSortFilter_) {
		filter = _specialSortFilter_;
	}));

	describe('#default', function(){

		it('should not filter any cards in default mode', function(){

			var cards = [{trash_cost: 1},{agenda_points:2},{}];

			var results = filter(cards, 'random-test');
			expect(results).to.have.length(3);

		});

	});

	describe('#agendas', function(){

		it('should filter cards with agenda points', function(){

			var cards = [{agenda_points: 1,text:''},{text:''}];

			var results = filter(cards, 'agenda');
			expect(results).to.have.length(1);

		});

		it('should filter cards with agenda text', function(){

			var cards = [{text:'as an agenda'},{text:''}];

			var results = filter(cards, 'agenda');
			expect(results).to.have.length(1);

		});

		it('should include agendas even if they have 0 points', function(){

			var cards = [{agenda_points: 0,text:''},{text:''}];

			var results = filter(cards, 'agenda');
			expect(results).to.have.length(1);

		});

	});

	describe('#influence', function(){

		it('should filter cards that have influence', function(){

			var cards = [{faction_cost: 1},{}];

			var results = filter(cards, 'influence');
			expect(results).to.have.length(1);

		});

		it('should filter cards that have even zero influence', function(){

			var cards = [{faction_cost: 0},{}];

			var results = filter(cards, 'influence');
			expect(results).to.have.length(1);

		});

	});

	describe('#strength', function(){

		it('should filter cards that have strength', function(){

			var cards = [{strength: 1},{}];

			var results = filter(cards, 'strength');
			expect(results).to.have.length(1);

		});

		it('should filter cards that have even zero strength', function(){

			var cards = [{strength: 0},{}];

			var results = filter(cards, 'strength');
			expect(results).to.have.length(1);

		});

	});

	describe('#subroutines', function(){

		it('should filter cards that have subroutines', function(){

			var cards = [{subroutines: 1},{}];

			var results = filter(cards, 'subroutines');
			expect(results).to.have.length(1);

		});

		it('should filter cards that have even zero subroutines', function(){

			var cards = [{subroutines: 0},{}];

			var results = filter(cards, 'subroutines');
			expect(results).to.have.length(1);

		});

	});

	describe('#cost', function(){

		it('should filter cards that have cost', function(){

			var cards = [{cost: 1},{}];

			var results = filter(cards, 'cost');
			expect(results).to.have.length(1);

		});

		it('should filter cards that have even zero cost', function(){

			var cards = [{cost: 0},{}];

			var results = filter(cards, 'cost');
			expect(results).to.have.length(1);

		});

	});

	describe('#trash', function(){

		it('should filter cards that have trash cost', function(){

			var cards = [{trash_cost: 1},{}];

			var results = filter(cards, 'trash');
			expect(results).to.have.length(1);

		});

		it('should filter cards that have even zero trash cost', function(){

			var cards = [{trash_cost: 0},{}];

			var results = filter(cards, 'trash');
			expect(results).to.have.length(1);

		});

	});
		
});
