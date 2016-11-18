prroulette.controller('sidebarController', function($scope, $location) {
	$scope.getClass = function (path) {
	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	};

	$scope.fullScreen = false;

	$scope.goFullScreen = function() {
		el = document.documentElement

		if ($scope.fullScreen) {
		    let rfs = el.requestFullscreen
		        || el.webkitRequestFullScreen
		        || el.mozRequestFullScreen
		        || el.msRequestFullscreen;

		    rfs.call(el);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}

		$scope.fullScreen = !$scope.fullScreen;
	};
});