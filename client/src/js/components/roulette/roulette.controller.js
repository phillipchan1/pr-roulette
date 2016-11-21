roulette.controller('rouletteController', function($scope, rouletteFactory, $stateParams) {
	rouletteFactory
		.getTeam($stateParams.id)
		.then(function(response) {
			$scope.team = response.data.data;
			$scope.textToImages();
		});

	$scope.textToImages = function() {

		angular.element(document).ready(function () {
			var numOfNames = $('.member').length;

			$('.member').each(function(index, member) {
		 		$('.app-loading-icon').show();

		 		$(`<img class="name-${index}" />`).appendTo('.roulette');
		 		html2canvas(member, {
		 			onrendered: function(canvas) {
		 				var screenshot = canvas.toDataURL("image/png");
		 				$('.name-' + index).attr("src", screenshot);

		 				if (index === numOfNames - 1) {
		 					var roulette = $('.roulette');

			 				roulette.roulette(
								{
									speed : 100,
									duration : 2,
								}
							);

							$('.roulette-inner').show();
							$('.app-loading-icon').hide();

							$('.start').click(function(){
								roulette.roulette('start');
							});
		 				}
		 			}
		 		});
		 	});
		});
	 };

	$scope.activateRoulette = function() {


	};


});