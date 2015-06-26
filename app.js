angular.module('yummy', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate','ngTagsInput', 'mongolabResourceHttp']);

angular.module('yummy').config(function ($routeProvider) {

    $routeProvider.
        when('/dishes', {templateUrl: 'views/dish-overview.html', controller: "DishOverviewCtrl"}).
        when('/dishes/:id', {templateUrl: 'views/dish-detail.html', controller: "DishDetailCtrl"}).
        when('/settings', {templateUrl: 'views/setting.html', controller: "SettingCtrl"}).
        when('/tags', {templateUrl: 'views/tag-overview.html', controller: "TagOverviewCtrl"}).
        /* Add New Routes Above */
        otherwise({redirectTo: '/dishes'});

});
// Useful constants
angular.module('yummy').constant('DEFAULT_ROUTE', "/dishes");
angular.module('yummy').constant('MONGOLAB_CONFIG',{API_KEY:'gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd', DB_NAME:'yummy'});

// Main run block
angular.module('yummy').run(function ($rootScope, $log, $location, mongolabResourceConfig) {

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

    if (mongolabResourceConfig.configured() === false) {
        $log.warn("yummy is not configured");
        $location.path("/settings");
    } else {
        // mongolabResourceConfig.apiKey("klaus");
        $log.debug("Yummy entering run state");
    }


});
