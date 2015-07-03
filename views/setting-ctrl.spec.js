describe('SettingCtrl', function () {

    beforeEach(module('yummy'));

    var scope, ctrl, $httpBackend, mongolabResourceConfig;

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _mongolabResourceConfig_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        mongolabResourceConfig = _mongolabResourceConfig_;
        ctrl = $controller('SettingCtrl', {$scope: scope});
        mongolabResourceConfig.apiKey("test");
    }));

    it('should provide a list of dishes', inject(function () {
        //var api = new RegExp('https://api.mongolab.com/api/1/databases/yummy/collections/tags.+');
        scope.save('klaus');
        //$httpBackend.expectGET(api).respond(200, [{"name": "testtag"}]);
        //$httpBackend.flush();
        expect(scope.alerts.length).toEqual(1);

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


});
