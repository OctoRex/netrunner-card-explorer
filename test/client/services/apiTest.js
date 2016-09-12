describe('Service: Api', function() {

	beforeEach(module('blackat'));

	var apiSvc, $httpBackend;

	beforeEach(inject(function(_$httpBackend_, _ApiSvc_) {
		$httpBackend = _$httpBackend_;
		ApiSvc = _ApiSvc_;
	}));

	afterEach(function() {	
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('#cards', function() {
		it('should return a list of 3 cards', function() {

			$httpBackend.expectGET('/api/cards').respond(200, '[{},{},{}]');
			ApiSvc.cards().then(function(results){
				expect(results.data).to.have.length(3);
			});
		});
	});

	describe('#factions', function() {
		it('should return a list of 3 factions', function() {

			$httpBackend.expectGET('/api/factions').respond(200, '[{},{},{}]');
			ApiSvc.factions().then(function(results){
				expect(results.data).to.have.length(3);
			});
		});
	});

	describe('#sets', function() {
		it('should return a list of 3 sets', function() {

			$httpBackend.expectGET('/api/sets').respond(200, '[{},{},{}]');
			ApiSvc.sets().then(function(results){
				expect(results.data).to.have.length(3);
			});
		});
	});

	describe('#types', function() {
		it('should return a list of 3 types', function() {

			$httpBackend.expectGET('/api/types').respond(200, '[{},{},{}]');
			ApiSvc.types().then(function(results){
				expect(results.data).to.have.length(3);
			});
		});
	});

	describe('#subtypes', function() {
		it('should return a list of 3 subtypes', function() {

			$httpBackend.expectGET('/api/subtypes').respond(200, '[{},{},{}]');
			ApiSvc.subtypes().then(function(results){
				expect(results.data).to.have.length(3);
			});
		});
	});
});