angular.module('yummy').controller('SettingCtrl', function ($scope, $log, MONGOLAB_CONFIG) {


	$scope.setting = {
        "API_KEY" : MONGOLAB_CONFIG.API_KEY,
        "DB_NAME" : MONGOLAB_CONFIG.DB_NAME
    };

    $scope.save = function(setting) {
        MONGOLAB_CONFIG.setApiKey(setting.API_KEY);
        MONGOLAB_CONFIG.setDbName(setting.DB_NAME);
        $log.debug("Settings saved");
    }


});
