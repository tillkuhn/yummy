
angular.module('yummy').factory('Recipe', function ($mongolabResource) {
            return $mongolabResource('recipes');
        });

angular.module('yummy').controller('RecipesCtrl', function ($scope, Recipe) {
			$scope.msg = "Loading all recipes";
			$scope.recipe = new Recipe();
			
            // https://api.mongolab.com/api/1/databases/yummy/collections/recipes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd
			$scope.recipes = Recipe.query();
			
			$scope.saveRecipe = function(recipe) {
				$scope.msg = recipe.name + " saved";
				//        var project = new Project({'key':'value'});
				//project.saveOrUpdate();
				recipe.saveOrUpdate();
				$scope.recipes = Recipe.query(); // refresh
			}
			
		$scope.removeRecipe = function(recipe) {
			//var project = new Project({'_id':{'$oid':1}, 'key':'value'});
			$msg = recipe.name + " removed";
			recipe.remove();
			$scope.recipes = Recipe.query();
		}
			
});
