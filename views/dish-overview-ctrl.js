
angular.module('yummy').factory('Recipe', function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('recipes');
});

angular.module('yummy').controller('DishOverviewCtrl', function ($scope, Recipe) {

	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchIngredients   = '';     // set the default search/filter term

	$scope.msg = "Loading all dishes from DB";
	$scope.recipe = new Recipe(); // for new entries
	$scope.recipe.rating = 3;
	$scope.recipes = [];
	// https://api.mongolab.com/api/1/databases/yummy/collections/recipes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd

	$scope.overview = function() {
        var options = { "fields" : { "name":1,"ingredients":1,"rating":1,"ingredients" : 1,"url":1}, "sort" : { "name": 1}, "limit":100};
		Recipe.all(options).then(function(recipes){
			$scope.recipes  = recipes;
		});

	};
	$scope.overview();

	$scope.saveRecipe = function(recipe) {
		$scope.msg = "Saving " + recipe.name;
		//        var project = new Project({'key':'value'});
		//project.saveOrUpdate();
		var resultPromise;
		if (recipe.ingredients && typeof recipe.ingredients === 'string') {
			recipe.ingredients = recipe.ingredients.split(/[,]+/);
		}
		if (!recipe.$id()) {
			recipe.created = new Date();
		}
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

	$scope.updateRating = function(recipe) {
		recipe.$saveOrUpdate().then(function (data) {
			var resultPromise = data;
			$scope.msg = recipe.name + " rating updated with " + recipe.rating + " stars";
		});
	};

	$scope.rateFunction = function(rating) {
		console.log("Rating selected: " + rating);
	};

});
