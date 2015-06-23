angular.module('yummy').controller('SettingCtrl', function ($scope, MONGOLAB_CONFIG) {


	$scope.setting = {
        "API_KEY" : MONGOLAB_CONFIG.API_KEY,
        "DB_NAME" : MONGOLAB_CONFIG.DB_NAME
    };


});
