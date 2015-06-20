
angular.module('yummy').factory('Recipe', function ($mongolabResource) {
	return $mongolabResource('recipes');
});

angular.module('yummy').controller('RecipesCtrl', function ($scope, Recipe) {
	$scope.msg = "Loading all dishes from DB";
	$scope.recipe = new Recipe();

	// https://api.mongolab.com/api/1/databases/yummy/collections/recipes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd
	$scope.recipes = Recipe.query();

	$scope.saveRecipe = function(recipe) {
		$scope.msg = "Saving " + recipe.name;
		//        var project = new Project({'key':'value'});
		//project.saveOrUpdate();
		recipe.saveOrUpdate();
		$scope.msg = recipe.name + " saved";
		$scope.recipes = Recipe.query(); // refresh
	};

	$scope.removeRecipe = function(recipe) {
		//var project = new Project({'_id':{'$oid':1}, 'key':'value'});
		recipe.remove();
		$scope.msg = recipe.name + " removed";
		$scope.recipes = Recipe.query();
	};

	$scope.rateFunction = function(rating) {
		console.log("Rating selected: " + rating);
	};

});
