const prroulette = angular.module(
    'prroulette', [
        // vendors
        'ngAnimate',
        'ui.router',
        'anim-in-out',

        // modules
        'authentication',
        'home',
        'dashboard',
        'teams',
        'roulette'

    ]
);


prroulette.provider('runtimeStates', function runtimeStates($stateProvider) {
    // runtime dependencies for the service can be injected here, at the provider.$get() function.
    this.$get = function($q, $timeout, $state) { // for example
        return {
            addState: function(name, state) {
                $stateProvider.state(name, state);
            }
        };
    };
});

prroulette.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: ["$scope", function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane) {
                if (panes.length == 0) $scope.select(pane);
                panes.push(pane);
            };
        }],
        template: `<div class="tabs-component">
		<div class="nav nav-tabs">
		<div class="tab" ng-repeat="pane in panes" ng-class="{active:pane.selected}">
		<a href="" ng-click="select(pane)">{{pane.title}}</a>
		</div>
		</div>
		<div class="tab-content" ng-transclude></div>
		</div>`,
        replace: true
    };
});

prroulette.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
        replace: true
    };
});

prroulette.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

