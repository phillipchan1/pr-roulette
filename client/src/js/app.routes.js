prroulette.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'src/js/components/home/home.view.html'
		})

		.state('search', {
			url: '/search',
			templateUrl: '/src/js/components/search/search.view.html'
		})

		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'src/js/components/dashboard/dashboard.html'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'src/js/components/authentication/login.html',
			params: {
				prevPage: null
			}
		})

		.state('registration', {
			url: '/registration',
			templateUrl: 'src/js/components/authentication/registration.html'
		})

		.state('public', {
			url: '/public/:id/:email',
			templateUrl: 'src/js/components/publicListPage/publicListPage.view.html'
		})

		.state('dashboard.teams', {
			url: '/teams',
			templateUrl: 'src/js/components/teams/teams.view.html'
		})

		.state('dashboard.team', {
			url: '/team/edit/:id',
			templateUrl: 'src/js/components/teams/team.view.html'
		})



		.state('team/view', {
			url: '/team/view/:id',
			templateUrl: 'src/js/components/roulette/roulette.view.html'
		})

		.state('dashboard.settings', {
			url: '/settings',
			templateUrl: 'src/js/components/settings/settings.view.html'
		})

		.state('404', {
			url: '/404',
			templateUrl: 'src/js/components/authentication/404.html'
		})
});
