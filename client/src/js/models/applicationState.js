prroulette.factory('prrouletteModel', function(tokenService, $http) {
	var data = {
		config: {},
		email: undefined,
		getConfig: function() {
			$http({
				method: 'GET',
				url: '/api/config',
				headers: {
					token: tokenService.getJWToken
				}
			}).success(function(response) {
				data.config = response.data;
			});
		},
		loggedIn: false,
		logout: function() {
			data.loggedIn = false;
		},
		update: function(key, value) {
			data[key] = value;
		},
		login: function(info) {
			// store jwtoken in localstorage
			tokenService.storeJWToken(info.token);

			data.getConfig();

			// change application state to logged in
			data.loggedIn = true;
		},
		tell: function() {
			return data;
		}
	};

	return data;
});