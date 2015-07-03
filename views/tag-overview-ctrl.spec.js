describe('TagOverviewCtrl', function () {

    beforeEach(module('yummy'));

    var scope, ctrl, $httpBackend, Tag, mongolabResourceConfig;

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _Tag_, _mongolabResourceConfig_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        mongolabResourceConfig = _mongolabResourceConfig_;
        Tag = _Tag_;
        ctrl = $controller('TagOverviewCtrl', {$scope: scope, Tag: Tag});
        mongolabResourceConfig.apiKey("test");
    }));

    it('should provide a list of dishes', inject(function () {
        var api = new RegExp('https://api.mongolab.com/api/1/databases/yummy/collections/tags.+');
        $httpBackend.expectGET(api).respond(200, [{"name": "testtag"}]);
        $httpBackend.flush();
        expect(scope.tags.length).toEqual(1);

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


});
