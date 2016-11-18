settings.controller('settingsController', function($scope, $http, tokenService) {

	$scope.settingsUpdateStatus = '';

	$scope.updateSettings = function(configObject) {
		console.log($scope.userConfig.shopifyAPI);
		$http({
			method: 'POST',
			url: '/api/config',
			data: {
				token: tokenService.getJWToken(),
				config: $scope.userConfig
			}
		}).success(function(response) {
			$scope.notify({
				type: 'warning',
				message: 'Settings Saved!'
			});
			// $scope.settingsUpdateStatus = 'Settings Successfully changed';
		});
	};
});