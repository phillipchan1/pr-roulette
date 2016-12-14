search.factory('searchFactory', function($http, tokenService) {
	return {
		searchTeam: function(teamName) {
			return $http({
				method: 'GET',
				url: '/api/public/teams/search',
				headers: {
					teamName: teamName
				}
			});
		}
	};
});