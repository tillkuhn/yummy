// Configure mongolab resources
angular.module('yummy').factory('Dish', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('dishes');
});

angular.module('yummy').factory('Tag', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('tags');
});

angular.module('yummy').factory('DiaryEntry', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('diary-entries');
});

angular.module('yummy').factory('Country', function ($http) {
    return {
        all: function() {
            return $http.get("resources/countries.json");
        }
    };
});
