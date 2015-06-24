// Configure mongolab resources
angular.module('yummy').factory('Dish', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('dishes');
});

angular.module('yummy').factory('Tag', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('tags');
});


// angular.module('yummy').constant('MONGOLAB_CONFIG', {API_KEY: 'gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd', DB_NAME: 'yummy'});
angular.module('yummy').factory('MONGOLAB_CONFIG', function ($log) {

    // $http, $location, $routeParams, $q, $log, CONFIG
    // Valid Domains INTERNET and INTRANET
    var apiKey = "gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd";
    var dbName = "yummy";


    return {
        API_KEY: apiKey,
        DB_NAME: dbName,
        isConfigured: function() {
            return (dbName !== null) && (apiKey !== null);
        },
        setApiKey: function(key) {
            apiKey = key;
            $log.debug("set " + key);
        },
        setDbName: function(name) {
            dbName = name;
        }
    };
});
