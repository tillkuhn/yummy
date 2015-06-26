angular.module('yummy').controller('SettingCtrl', function ($scope, $log, mongolabResourceConfig, ipCookie, API_KEY_COOKIE_NAME) {

    $scope.alerts = [
        //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

	$scope.setting = {
        "apiKey" : mongolabResourceConfig.apiKey(),
        "dbUrl" : mongolabResourceConfig.dbUrl(),
        cookieExpires: 7
    };

    $scope.save = function(setting) {
        mongolabResourceConfig.apiKey(setting.apiKey);
        $log.debug("Settings saved" + mongolabResourceConfig.apiKey() );
        ipCookie(API_KEY_COOKIE_NAME, mongolabResourceConfig.apiKey(), { expires: parseInt(setting.cookieExpires) });
        $scope.alerts.push({type: 'success',msg: 'Well done'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
