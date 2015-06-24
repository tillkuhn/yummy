angular.module('yummy', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate','ngTagsInput', 'mongolabResourceHttp']);

angular.module('yummy').config(function ($routeProvider) {

    $routeProvider.
        when('/dishes', {templateUrl: 'views/dish-overview.html', controller: "DishOverviewCtrl"}).
        when('/dishes/:id', {templateUrl: 'views/dish-detail.html', controller: "DishDetailCtrl"}).
        when('/settings', {templateUrl: 'views/setting.html', controller: "SettingCtrl"}).
        /* Add New Routes Above */
        otherwise({redirectTo: '/dishes'});

});
// Useful constants
angular.module('yummy').constant('MONGOLAB_CONFIG', {API_KEY: 'gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd', DB_NAME: 'yummy'});
angular.module('yummy').constant('DEFAULT_ROUTE', "/dishes");


// Main run block
angular.module('yummy').run(function ($rootScope, $log) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $log.debug("Yummy entering run state");


});

angular.module('yummy').directive('starRating', function () {
        return {
            restrict: 'A',
            template: '<ul class="rating"><li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)"><i class="fa fa-star-o"></i></li></ul>',

            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);
