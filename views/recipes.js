
angular.module('yummy').factory('Recipe', function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('recipes');
});

angular.module('yummy').controller('RecipesCtrl', function ($scope, Recipe) {
	$scope.msg = "Loading all dishes from DB";
	$scope.recipe = new Recipe(); // for new entries
	$scope.recipe.rating = 3;
	$scope.recipes = [];
	// https://api.mongolab.com/api/1/databases/yummy/collections/recipes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd
	//$scope.recipes = Recipe.query();

	$scope.overview = function() {
		Recipe.all().then(function(recipes){
			$scope.recipes  = recipes;
		});

	};
	$scope.overview();

	$scope.saveRecipe = function(recipe) {
		$scope.msg = "Saving " + recipe.name;
		//        var project = new Project({'key':'value'});
		//project.saveOrUpdate();
		var resultPromise;
		recipe.$saveOrUpdate().then(function (data) {
			resultPromise = data;
			$scope.overview(); // refresh
			$scope.msg = recipe.name + " saved";
		});
	};

	$scope.removeRecipe = function(recipe) {
		//var project = new Project({'_id':{'$oid':1}, 'key':'value'});
		var resultPromise;
		recipe.$remove().then(function (data) {
			resultPromise = data;
			$scope.msg = recipe.name + " removed";
			$scope.overview(); // refresh
		});
	};

	$scope.rateFunction = function(rating) {
		console.log("Rating selected: " + rating);
	};

});
