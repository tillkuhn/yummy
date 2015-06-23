angular.module('yummy').controller('DishDetailCtrl', function ($scope, Recipe,$routeParams) {


	$scope.dish = null;

	Recipe.getById($routeParams['id']).then(function(dish) {
			$scope.dish = dish;
	});

});
