prroulette.factory('tokenService', function() {
	return {
		storeJWToken: function(token) {
			if (token) {
				localStorage.setItem('jwtoken', token);
			}
		},
		getJWToken: function() {
			return localStorage.getItem('jwtoken');
		},
		removeJWToken: function() {
			localStorage.removeItem('jwtoken');
		}
	};
});