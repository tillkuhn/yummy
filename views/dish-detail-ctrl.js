angular.module('yummy').controller('DishDetailCtrl', function($scope, $location, $log, $q, $routeParams, DEFAULT_ROUTE, Dish, Tag, Country) {

    var dishId = $routeParams['id'];

    $scope.maxRating = 10;
    $scope.dish = null;
    $scope.msg = null;
    $scope.countries = null;

    Country.all().success(function(data) {
        $scope.countries = data;
    });


    $scope.loadTags = function(query) {

        var deferred = $q.defer();
        Tag.all().then(function(data) {
            var results = [];
            angular.forEach(data, function(element) {
                if (element.text.indexOf(query) > -1) {
                    results.push(element);
                }
            });
            deferred.resolve(results);
        });
        return deferred.promise;
    };

    $scope.$watch("dish.rating", function(newValue, oldValue) {
        if (oldValue !== undefined) {
            if (newValue > oldValue) {
                $scope.msg = "Rated up";
            } else {
                $scope.msg = "Rated down" + newValue + " " + oldValue;
            }
            $scope.dishForm.$pristine = false;
        }

    });

    // If new dish create fresg dish object, otherwhise load from DB
    if (dishId === "new") {
        $scope.dish = new Dish(); // for new entries
        $scope.dish.rating = 3; // default rating is rather low
        $scope.dish.timesServed = 0;
        $scope.dish.created = new Date();
        $scope.msg = "New dish ready to be served";
    } else {
        Dish.getById(dishId).then(function(dish) {
            $scope.dish = dish;
            $scope.msg = "Dish " + dishId + " loaded";
        });
    }

    $scope.cancel = function() {
        $scope.overview();
    };

    $scope.overview = function() {
        $location.path(DEFAULT_ROUTE);
    };

    $scope.justServed = function(dish) {
        dish.lastServedDate = new Date();
        if (isNaN(dish.timesServed)) {
            dish.timesServed = 1;
        } else {
            dish.timesServed += 1;
        }
    };

    $scope.remove = function(dish) {
        //var project = new Project({'_id':{'$oid':1}, 'key':'value'});
        var resultPromise;
        dish.$remove().then(function(data) {
            resultPromise = data;
            $scope.msg = dish.name + " removed";
            // $scope.overview(); // refresh
            $location.path(DEFAULT_ROUTE);
        });
    };

    $scope.save = function(dish) {
        $scope.msg = "Saving " + dish.name;
        //        var project = new Project({'key':'value'});
        //project.saveOrUpdate();
        var resultPromise;
        if (dish.ingredients && typeof dish.ingredients === 'string') {
            dish.ingredients = dish.ingredients.split(/[,]+/);
        }
        if (!dish.$id()) {
            dish.created = new Date();
        }
        dish.$saveOrUpdate().then(function(data) {
            $scope.dish = data; // important for new so we get id etc.
            //console.log(angular.toJson(data));
            $scope.msg = dish.name + " saved";
        });
    };

    $scope.imageUrl = function(dish) {
        return dish.imageUrl ? dish.imageUrl : "";
    };

    $scope.countryImageUrl = function(countryCode) {
        if (!countryCode || countryCode === 'xx') {
            return "img/flags/xx.png";
        } else {
            return "img/flags/" + countryCode + ".png";
        }
    };

    $scope.rateFunction = function(rating) {
        console.log("Rating selected: " + rating);
    };


});
