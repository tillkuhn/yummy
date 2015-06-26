angular.module('yummy').controller('SettingCtrl', function ($scope, $log, mongolabResourceConfig) {

    $scope.alerts = [
        //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

	$scope.setting = {
        "apiKey" : "klaus",
        "dbUrl" : mongolabResourceConfig.dbUrl()
    };

    $scope.save = function(setting) {
        mongolabResourceConfig.apiKey(setting.apiKey);
        $log.debug("Settings saved");
        $scope.alerts.push({type: 'success',msg: 'Well done'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
