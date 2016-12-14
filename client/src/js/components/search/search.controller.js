search.controller('searchController', function($scope, searchFactory) {
	$scope.searchResults = [];

	$scope.searchTeam = function(searchTerm) {

		searchFactory.searchTeam(searchTerm)
			.then(function(response) {
				console.log(response.data);
				$scope.searchResults = [];
				$scope.searchResults = response.data;
			}
		);
	};
});