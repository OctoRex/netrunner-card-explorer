describe('Filter: groupBy', function(){
	
	beforeEach(module('blackat'));

	var filter,
		mockMemo = {
			memo: function(filter, args, closure) {
				return closure();
			}
		},
		mockFactions = {
			find: function(code) {
				switch (code) {
					case 'a':
						return {code: 'a', label: 'Faction A'};
					case 'b':
						return {code: 'b', label: 'Faction B'};
					case 'c':
						return {code: 'c', label: 'Faction C'};
				}
			}
		},
		mockTypes = {
			find: function(code) {
				switch (code) {
					case 'a':
						return {code: 'a', label: 'Type A'};
					case 'b':
						return {code: 'b', label: 'Type B'};
					case 'c':
						return {code: 'c', label: 'Type C'};
				}
			}
		},
		mockSets = {
			find: function(code) {
				switch (code) {
					case 'a':
						return {code: 'a', label: 'Set A'};
					case 'b':
						return {code: 'b', label: 'Set B'};
					case 'c':
						return {code: 'c', label: 'Set C'};
				}
			}
		};

	beforeEach(function() {
		module(function($provide) {
			$provide.value('CardMemoize', mockMemo);
			$provide.value('FactionsSvc', mockFactions);
			$provide.value('TypesSvc', mockFactions);
			$provide.value('SetsSvc', mockFactions);
		});
	});

	beforeEach(inject(function(_groupByFilter_) {
		filter = _groupByFilter_;
	}));

	describe('#default', function(){
		
		var cards = [
			{faction_code: 'a'},{faction_code: 'b'},{faction_code: 'c'},
			{faction_code: 'a'},{faction_code: 'a'},{faction_code: 'a'},
			{faction_code: 'b'},{faction_code: 'b'},{faction_code: 'c'}
		];

		it('should group all the cards into one group "all"', function(){
			var results = filter(cards, 'random-test');
			expect(results[0].cards).to.have.length(9);
		});

		it('should not have any groups other than "all"', function(){
			var results = filter(cards, 'random-test');
			expect(results).to.have.length(1);
		});

		it('should not provide a title for the "all" group', function(){
			var results = filter(cards, 'random-test');
			expect(results[0].title).to.equal('');
		});

	});

	describe('#factions', function(){

		var cards = [
			{faction_code: 'a'},{faction_code: 'b'},{faction_code: 'c'},
			{faction_code: 'a'},{faction_code: 'a'},{faction_code: 'a'},
			{faction_code: 'b'},{faction_code: 'b'},{faction_code: 'c'}
		];

		it('should group all the cards into three groups"', function(){
			var results = filter(cards, 'faction');
			expect(results).to.have.length(3);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'faction');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(3);
			expect(results[2].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'faction');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
		});

	});

	describe('#sets', function(){

		var cards = [
			{pack_code: 'a'},{pack_code: 'b'},{pack_code: 'c'},
			{pack_code: 'a'},{pack_code: 'a'},{pack_code: 'a'},
			{pack_code: 'b'},{pack_code: 'b'},{pack_code: 'c'}
		];

		it('should group all the cards into three groups', function(){
			var results = filter(cards, 'sets');
			expect(results).to.have.length(3);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'sets');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(3);
			expect(results[2].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'sets');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
		});

	});

	describe('#types', function(){

		var cards = [
			{type_code: 'a'},{type_code: 'b'},{type_code: 'c'},
			{type_code: 'a'},{type_code: 'a'},{type_code: 'a'},
			{type_code: 'b'},{type_code: 'b'},{type_code: 'c'}
		];

		it('should group all the cards into three groups', function(){
			var results = filter(cards, 'type');
			expect(results).to.have.length(3);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'type');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(3);
			expect(results[2].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'type');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
		});

	});

	describe('#influence', function(){

		var cards = [
			{faction_cost: 1},{faction_cost: 2},{faction_cost: 3},
			{faction_cost: 1},{faction_cost: 1},{faction_cost: 1},
			{faction_cost: 2},{faction_cost: 2},{faction_cost: 3},
			{faction_cost: 0},{faction_cost: 0},{faction_cost: 0}
		];

		it('should group all the cards into four groups', function(){
			var results = filter(cards, 'influence');
			expect(results).to.have.length(4);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'influence');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(3);
			expect(results[2].cards).to.have.length(2);
			expect(results[3].cards).to.have.length(3);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'influence');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
		});

	});

	describe('#agenda', function(){

		var cards = [
			{agenda_points: 1},{agenda_points: 2},{agenda_points: 5},
			{agenda_points: 1},{agenda_points: 2},{agenda_points: 1},
			{},{},{}
		];

		it('should group all the cards into four groups', function(){
			var results = filter(cards, 'agenda');
			expect(results).to.have.length(4);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'agenda');
			expect(results[0].cards).to.have.length(3);
			expect(results[1].cards).to.have.length(2);
			expect(results[2].cards).to.have.length(1);
			expect(results[3].cards).to.have.length(3);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'agenda');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
		});

		it('should have group 4 or more together', function(){
			var cards = [
				{agenda_points: 3},{agenda_points: 4},{agenda_points: 5},
				{agenda_points: 6}
			];
			var results = filter(cards, 'agenda');
			expect(results).to.have.length(2);
			expect(results[0].cards).to.have.length(1);
			expect(results[1].cards).to.have.length(3);
		});

	});

	describe('#cost', function(){

		var cards = [
			{cost: 1},{cost: 2},{cost: 5},
			{cost: 13},{cost: 2},{cost: 1},
			{cost: 5},{cost: 10},{cost: 20},
			{cost: 3},{cost: null},{cost: null}
		];

		it('should group all the cards into six groups', function(){
			var results = filter(cards, 'cost');
			expect(results).to.have.length(6);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'cost');
			expect(results[0].cards).to.have.length(2);
			expect(results[1].cards).to.have.length(2);
			expect(results[2].cards).to.have.length(2);
			expect(results[3].cards).to.have.length(3);
			expect(results[4].cards).to.have.length(1);
			expect(results[5].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'cost');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
			expect(results[4].title).to.be.a('string');
			expect(results[5].title).to.be.a('string');
		});

		it('should have group 10 or more together', function(){
			var cards = [
				{cost: 7},{cost: 8},{cost: 9},
				{cost: 10},{cost: 11},{cost: 12}
			];
			var results = filter(cards, 'cost');
			expect(results).to.have.length(4);
			expect(results[0].cards).to.have.length(1);
			expect(results[1].cards).to.have.length(1);
			expect(results[2].cards).to.have.length(1);
			expect(results[3].cards).to.have.length(3);
		});

	});

	describe('#strength', function(){

		var cards = [
			{strength: 1},{strength: 2},{strength: 5},
			{strength: 13},{strength: 2},{strength: 1},
			{strength: 5},{strength: 10},{strength: 20},
			{strength: 3}, {strength: null}, {strength: null}
		];

		it('should group all the cards into six groups', function(){
			var results = filter(cards, 'strength');
			expect(results).to.have.length(6);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'strength');
			expect(results[0].cards).to.have.length(2);
			expect(results[1].cards).to.have.length(2);
			expect(results[2].cards).to.have.length(2);
			expect(results[3].cards).to.have.length(3);
			expect(results[4].cards).to.have.length(1);
			expect(results[5].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'strength');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
			expect(results[4].title).to.be.a('string');
			expect(results[5].title).to.be.a('string');
		});

		it('should have group 8 or more together', function(){
			var cards = [
				{strength: 5},{strength: 6},{strength: 7},
				{strength: 8},{strength: 9},{strength: 10}
			];
			var results = filter(cards, 'strength');
			expect(results).to.have.length(4);
			expect(results[0].cards).to.have.length(1);
			expect(results[1].cards).to.have.length(1);
			expect(results[2].cards).to.have.length(1);
			expect(results[3].cards).to.have.length(3);
		});

	});

	describe('#subroutines', function(){

		var cards = [
			{subroutines: 1},{subroutines: 2},{subroutines: 3},
			{subroutines: 1},{subroutines: 1},{subroutines: 'X'},
			{subroutines: 1},{subroutines: 2},{subroutines: 3}
		];

		it('should group all the cards into four groups', function(){
			var results = filter(cards, 'subroutines');
			expect(results).to.have.length(4);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'subroutines');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(2);
			expect(results[2].cards).to.have.length(2);
			expect(results[3].cards).to.have.length(1);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'subroutines');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
		});

	});

	describe('#trash', function(){

		var cards = [
			{trash_cost: 1},{trash_cost: 2},{trash_cost: 5},
			{trash_cost: 13},{trash_cost: 2},{trash_cost: 1},
			{trash_cost: 6},{trash_cost: 7},{trash_cost: 8},
			{trash_cost: 3}
		];

		it('should group all the cards into five groups', function(){
			var results = filter(cards, 'trash');
			expect(results).to.have.length(5);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'trash');
			expect(results[0].cards).to.have.length(2);
			expect(results[1].cards).to.have.length(2);
			expect(results[2].cards).to.have.length(1);
			expect(results[3].cards).to.have.length(4);
			expect(results[4].cards).to.have.length(1);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'trash');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
			expect(results[3].title).to.be.a('string');
			expect(results[4].title).to.be.a('string');
		});

		it('should have group 6 or more together', function(){
			var cards = [
				{trash_cost: 3},{trash_cost: 4},{trash_cost: 5},
				{trash_cost: 6},{trash_cost: 7},{trash_cost: 8}
			];
			var results = filter(cards, 'trash');
			expect(results).to.have.length(4);
			expect(results[0].cards).to.have.length(1);
			expect(results[1].cards).to.have.length(1);
			expect(results[2].cards).to.have.length(1);
			expect(results[3].cards).to.have.length(3);
		});

	});

	describe('#illustrator', function(){

		var cards = [
			{illustrator: 'a'},{illustrator: 'b'},{illustrator: 'c'},
			{illustrator: 'a'},{illustrator: 'a'},{illustrator: 'a'},
			{illustrator: 'b'},{illustrator: 'b'},{illustrator: 'c'}
		];

		it('should group all the cards into three groups"', function(){
			var results = filter(cards, 'illustrator');
			expect(results).to.have.length(3);
		});

		it('should have the right numbers in each group', function(){
			var results = filter(cards, 'illustrator');
			expect(results[0].cards).to.have.length(4);
			expect(results[1].cards).to.have.length(3);
			expect(results[2].cards).to.have.length(2);
		});

		it('should have titles on each group', function(){
			var results = filter(cards, 'illustrator');
			expect(results[0].title).to.be.a('string');
			expect(results[1].title).to.be.a('string');
			expect(results[2].title).to.be.a('string');
		});

	});

});
