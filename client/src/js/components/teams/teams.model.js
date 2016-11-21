teams.factory('teamsFactory', function($http, tokenService) {
	return {
		getTeams: function() {
			return $http({
				method: 'GET',
				url: '/api/teams/',
				headers: {
					token: tokenService.getJWToken()
				}
			});
		},
		makeTeam: function() {
			return $http({
				method: 'POST',
				url: '/api/teams/',
				data: {
					token: tokenService.getJWToken()
				}
			});
		},
		getTeam: function(id) {
			return $http({
				method: 'GET',
				url: '/api/team/' + id,
				headers: {
					token: tokenService.getJWToken()
				}
			});
		},
		removeTeam: function(teamID) {
			return $http({
				method: 'PUT',
				url: `/api/team/${teamID}`,
				headers: {
					token: tokenService.getJWToken(),
					teamID: teamID
				}
			});
		},
		updateMembers: function(options) {
			return $http({
				method: 'POST',
				url: `/api/team/${options.id}/member`,
				data: {
					token: tokenService.getJWToken(),
					members: options.members
				}
			});
		},
		updateSettings: function(options) {
			return $http({
				method: 'POST',
				url: `/api/team/${options.id}/settings/`,
				data: {
					token: tokenService.getJWToken(),
					settings: options.settingsObj
				}
			});
		},
	};
});