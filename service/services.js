// Configure mongolab resources
angular.module('yummy').factory('Dish', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('dishes');
});

angular.module('yummy').factory('Tag', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('tags');
});
