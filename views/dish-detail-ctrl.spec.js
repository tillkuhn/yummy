describe('DishDetailCtrl', function () {

    beforeEach(module('yummy'));

    var scope, ctrl, $httpBackend, Dish, mongolabResourceConfig;

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _Dish_, _mongolabResourceConfig_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        mongolabResourceConfig = _mongolabResourceConfig_;
        Dish = _Dish_;
        ctrl = $controller('DishDetailCtrl', {$scope: scope, Dish: Dish});
        mongolabResourceConfig.apiKey("test");
    }));

    it('should load countries on init', inject(function () {
        var api = new RegExp('service/countries.json');
        $httpBackend.expectGET(api).respond(200,[{code: 'ly',name: 'Laos',area: 'Asien'}]);
        $httpBackend.expectGET(new RegExp("https://api.mongolab.com/api/1/databases/yummy/collections/dishes/.+")).respond(200,{});
        $httpBackend.flush();
        //expect(angular.isFunction(scope.loadTags2)).toBe(true);
    }));

    /*
    it('should provide a list of dishes', inject(function () {
        var api = new RegExp('https://api.mongolab.com/api/1/databases/yummy/collections/dishes.+');
        $httpBackend.expectGET(api).respond(200, [{"name": "test"}]);
        $httpBackend.flush();

        expect(1).toEqual(1);

    }));
    */

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


});
