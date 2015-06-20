angular.module('yummy', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate','mongolabResource']);

angular.module('yummy').config(function($routeProvider) {

    $routeProvider.
    when('/recipes',{templateUrl: 'views/recipes.html'}).
    when('/home',{templateUrl: 'views/home.html'}).
    /* Add New Routes Above */
    otherwise({redirectTo:'/recipes'});

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

angular.module('yummy').directive('starRating',function() {
return {
restrict : 'A',
template : '<ul class="rating"><li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)"><i class="fa fa-star-o"></i></li></ul>',

scope : {
 ratingValue : '=',
 max : '=',
 onRatingSelected : '&'
},
link : function(scope, elem, attrs) {
 var updateStars = function() {
  scope.stars = [];
  for ( var i = 0; i < scope.max; i++) {
   scope.stars.push({
    filled : i < scope.ratingValue
   });
  }
 };

 scope.toggle = function(index) {
  scope.ratingValue = index + 1;
  scope.onRatingSelected({
   rating : index + 1
  });
 };

 scope.$watch('ratingValue',
  function(oldVal, newVal) {
   if (newVal) {
    updateStars();
   }
  }
 );
}
};
}
);
