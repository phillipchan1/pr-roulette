roulette.controller('rouletteController', function($scope, rouletteFactory, $stateParams) {
	rouletteFactory
		.getTeam($stateParams.id)
		.then(function(response) {
			$scope.team = response.data.data;
			$scope.textToImages();
		});

	$scope.data = "phil";

	angular.element(document).ready(function () {

    });

	$scope.textToImages = function() {

		angular.element(document).ready(function () {
			var numOfNames = $('.member').length;

			console.log(numOfNames);

			$('.member').each(function(index, member) {
		 		console.log(member.innerHTML);
		 		$(`<img class="name-${index}" />`).appendTo('.roulette');
		 		html2canvas(member, {
		 			onrendered: function(canvas) {
		 				var screenshot = canvas.toDataURL("image/png");
		 				$('.name-' + index).attr("src", screenshot);

		 				if (index === numOfNames - 1) {
		 					var roulette = $('.roulette');

			 				roulette.roulette(
								{
									speed : 1,
									duration : 1,
								}
							);

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