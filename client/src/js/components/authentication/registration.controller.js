authentication.controller('registrationController', function($http, $scope, $location) {
	$scope.errorMessage = "";

	$scope.resetError = function() {
		$scope.errorMessage = "";
	};

    $scope.register = function(user) {
		return $http({
			method: 'POST',
			url: '/api/register',
			data: user
		}).then(function(response) {
			
			if (response.data.success === true) {
				// login and redirect
				 $location.path('home')
			}		
				// show error message
			else {
				$scope.errorMessage = response.data.message;
			}
		});
	};
});