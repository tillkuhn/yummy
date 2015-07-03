describe('DishDetailCtrl', function() {

    beforeEach(module('yummy'));

    var scope, ctrl, $httpBackend, Dish, mongolabResourceConfig;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _Dish_, _mongolabResourceConfig_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        mongolabResourceConfig = _mongolabResourceConfig_;
        Dish = _Dish_;
        ctrl = $controller('DishDetailCtrl', {
            $scope: scope,
            Dish: Dish
        });
        mongolabResourceConfig.apiKey("test");
        var api = new RegExp('resources/countries.json');
        $httpBackend.expectGET(api).respond(200, [{
            code: 'ly',
            name: 'Laos',
            area: 'Asien'
        }]);
        $httpBackend.expectGET(new RegExp("https://api.mongolab.com/api/1/databases/yummy/collections/dishes/.+")).respond(200, {});
    }));

    it('should load countries on init', inject(function() {
        $httpBackend.flush();
        //expect(angular.isFunction(scope.loadTags2)).toBe(true);
    }));


    it('should increment served count', inject(function() {
        $httpBackend.flush();
        scope.dish = new Dish();
        scope.dish.timesServed = 1;
        scope.justServed(scope.dish);
        expect(scope.dish.timesServed).toEqual(2);

    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


});
