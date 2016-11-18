authentication.controller('loginController', function($http, $stateParams, $state, $scope, $location, prrouletteModel, tokenService) {
	$scope.errorMessage = "";

	$scope.resetError = function() {
		$scope.errorMessage = "";
	};

    $scope.login = function(user) {
		return $http({
			method: 'POST',
			url: '/api/login',
			data: user
		}).then(function(response) {
			if (response.data.success === true) {

				// change application state
				prrouletteModel.login({
					token: response.data.token,
					user: response.data.user
				});

				// if user is trying to access protected route prior to login
				if ($stateParams.prevPage) {
					$location.path($stateParams.prevPage);
				} else {
					$state.go('dashboard');
				}
			}
				// show error message
			else {
				$scope.errorMessage = response.data.message;
			}
		});
	};
});