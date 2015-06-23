angular.module('yummy').controller('DishOverviewCtrl', function ($scope, Dish, $location) {

    var fields = {"name": 1, "rating": 1, "ingredients": 1, "url": 1};
    var limit = 100;

    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchIngredients = '';     // set the default search/filter term

    $scope.msg = "Loading all dishes from DB";
    $scope.dishes = [];
    // https://api.mongolab.com/api/1/databases/yummy/collections/dishes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd

    $scope.overview = function () {
        var options = {
            "fields": fields,
            "sort": {"name":1},
            "limit":limit };
        Dish.all(options).then(function (dishes) {
        $scope.dishes = dishes;
        });
    };
    $scope.overview();

    $scope.add = function () {
        $location.path("/dishes/new");
    };

})
;
