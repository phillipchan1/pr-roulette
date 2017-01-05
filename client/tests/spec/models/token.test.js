describe('tokenService', function() {

	var tokenService;

	// Before each test load our our module
	beforeEach(module('prroulette'));
	beforeEach(inject(function(_tokenService_) {
	    tokenService = _tokenService_;
	}));

	it('storeJWToken() store a token when provided', function() {
		tokenService.storeJWToken('myToken');
		localStorage.getItem('jwtoken').should.equal('mytoken');
	});

	it('getJWToken() retrieve a token when provided', function() {
		let sampleToken = 'myToken';

		tokenService.storeJWToken(sampleToken);
		tokenService.getJWToken().should.equal(sampleToken);
	});

	it('removeJWToken() remove a token when provided', function() {
		tokenService.storeJWToken('myToken');
		tokenService.removeJWToken();
		should.not.exist(localStorage.getItem('jwtoken'));
	});

});
