angular.module('yummy', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate','mongolabResource']);

angular.module('yummy').config(function($routeProvider) {

    $routeProvider.
    when('/recipes',{templateUrl: 'views/recipes.html'}).
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});

angular.module('yummy').constant('API_KEY', 'gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd');
angular.module('yummy').constant('DB_NAME', 'yummy');

angular.module('yummy').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
