roulette.factory('rouletteFactory', function($http, tokenService) {
	return {
		getTeam: function(id) {
			return $http({
				method: 'GET',
				url: '/api/public/team/view/' + id
			});
		}
	};
});