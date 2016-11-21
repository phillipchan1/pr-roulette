prroulette.controller('mainController',
	function(
		$http,
		$location,
		$rootScope,
		$scope,
		$state,
		prrouletteModel,
		requestsModel,
		runtimeStates,
		tokenService
	) {

	// first check to see if we're logged in
	var checkJWToken = (function() {

		var token = tokenService.getJWToken();

		if (token) {
			return $http({
				method: 'GET',
				url: '/api/verify',
				headers: {
					token: token
				}
			}).then(function(response) {
				if (response.data.success === true) {
					prrouletteModel.login({
						token: token,
						user: response.data.user
					});
				}
			});
		}
	})();

	// watch if we're logged in
	$scope.$watch(function() {
		return prrouletteModel.loggedIn;
	}, function(newVal, oldValue) {
		$scope.loggedIn = prrouletteModel.loggedIn;
	});

	$scope.userConfig = prrouletteModel.config;

	// watch if config object changes
	$scope.$watch(function() {
		return prrouletteModel.config;
	}, function(newVal, oldValue) {
		$scope.userConfig = prrouletteModel.config;
	});

	$scope.logout = function() {
		tokenService.removeJWToken();
		prrouletteModel.logout();
		$location.path('home');
	};

	$scope.notify = function(options) {
		var notificationBar = $('.notification-bar');

		// change message
		notificationBar.html(options.message);

		// add type
		if (options.type) {
			notificationBar.addClass(options.type);
		}

		notificationBar.addClass('show');

		// closing function
		setTimeout(function() {
			notificationBar.removeClass('show');

			if (options.type) {
				notificationBar.removeClass(options.type);
			}
		}, 3000);

	};

	// loading icon for all ajax requests
	$rootScope.$on('loading:progress', function (){
		$('.app-loading-icon').show();
	});

	$rootScope.$on('loading:finish', function (){
	    $('.app-loading-icon').hide();
	})


});