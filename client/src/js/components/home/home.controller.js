home.controller('homeController', function($scope, $state, prrouletteModel) {
	$scope.config = prrouletteModel.config;

	if (prrouletteModel.loggedIn) {
		$state.go('dashboard.teams');
		console.log('were logged in')
	}
});