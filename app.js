angular.module('yummy', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate','ngTagsInput','ngCookies','ipCookie','mongolabResourceHttp','angular-confirm']);

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
angular.module('yummy').constant('MONGOLAB_CONFIG',{API_KEY:null, DB_NAME:'yummy','API_KEY_COOKIE_NAME':'YUMMY_API_KEY'});
angular.module('yummy').constant('API_KEY_COOKIE_NAME',"YUMMY_API_KEY");

// Main run block
angular.module('yummy').run(function ($rootScope, $log, $location, mongolabResourceConfig,$cookies, API_KEY_COOKIE_NAME) {

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

    console.log(mongolabResourceConfig.configured());
    if (mongolabResourceConfig.configured() === false) {
        var cookieApiKey = $cookies[API_KEY_COOKIE_NAME];
        if (cookieApiKey && 0 !== cookieApiKey.length ) {
            $log.info("Using api key from cookie");
            mongolabResourceConfig.apiKey(cookieApiKey);
        } else {
            $log.warn("yummy api key is not yet configured, rerouting to settings view");
            $location.path("/settings");
        }
    }

});
