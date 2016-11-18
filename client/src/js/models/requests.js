prroulette.factory('requestsModel', function(runtimeStates, $http, tokenService) {

	var getRequestLists = function() {
		return $http({
			method: 'GET',
			url: '/api/requests/requestlist',
			headers : {
				token: tokenService.getJWToken()
			}
		});
	};

	return {
		getRequestLists: getRequestLists
	};
});