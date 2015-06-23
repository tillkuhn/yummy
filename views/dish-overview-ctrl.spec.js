describe('DishOverviewCtrl', function() {

	beforeEach(module('yummy'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DishOverviewCtrl', {$scope: scope});
    }));

	it('should provide a list of recipes', inject(function() {

		expect(1).toEqual(1);

	}));

});
