teams.controller('teamsController', function($scope, $http, teamsFactory) {
	$scope.teams = [];

	$scope.getTeams = function() {
		teamsFactory.getTeams().then(function(response) {
			$scope.teams = response.data.data;
		});
	};

	$scope.makeTeam = function() {
		teamsFactory.makeTeam().then(function(response) {
			$scope.getTeams();
		});
	};

	$scope.getTeams();
});

teams.controller('teamController', function($scope, $http, teamsFactory, $stateParams) {
	$scope.team = {};

	teamsFactory.getTeam($stateParams.id).then(function(response) {
		$scope.team = response.data.data;
	});

	$scope.updateSettings = function(settingsObj) {
		teamsFactory
			.updateSettings({
				id: $stateParams.id,
				settingsObj: settingsObj
			})
			.then(function(response) {
				$scope.team = response.data.data;
			});
	};

	var memberFactory = function() {
		this.name = "member";
	};

	$scope.addMember = function() {
		var newMember = new memberFactory();

		$scope.team.members.push(newMember);
		$scope.updateMembers();
	};

	$scope.updateMembers = function() {
		teamsFactory
			.updateMembers({
				id: $stateParams.id,
				members: $scope.team.members
			})
			.then(function(response) {
				$scope.team = response.data.data;
			});
	};

	$scope.removeMember = function(index) {
		$scope.team.members.splice(index, 1);
		$scope.updateMembers();
	};
});