angular.module('test', ['mongolabResource'])
    .constant('API_KEY', 'testkey')
    .constant('DB_NAME', 'testdb')
    .factory('Project', function ($mongolabResource) {
        return $mongolabResource('projects');
    });

describe("mongolab resource scenario", function () {

    var $httpBackend
    var createUrl = function (testPart) {
        return  'https://api.mongolab.com/api/1/databases/testdb/collections/projects' + testPart + '?apiKey=testkey';
    };

    beforeEach(module('test'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    it("should issue GET request for a query", inject(function (Project) {

        $httpBackend.expect('GET', createUrl('')).respond([{'_id':{'$oid':1}, 'key':'value'}]);

        var result = Project.query();
        $httpBackend.flush();

        expect(result.length).toEqual(1);
        expect(result[0].key).toEqual('value');
        expect(result[0]._id.$oid).toEqual(1);
    }));

    it("should issue GET request for the getById", inject(function (Project) {

        $httpBackend.expect('GET', createUrl('/1')).respond({'_id':{'$oid':1}, 'key':'value'});

        var result = Project.getById(1);
        $httpBackend.flush();

        expect(result.key).toEqual('value');
        expect(result._id.$oid).toEqual(1);
    }));

    it("should support 'update' on a resource", inject(function (Project) {

        $httpBackend.expect('PUT', createUrl('/1'), {'key':'Updated value'}).respond({'_id':{'$oid':1}, 'key':'Updated value'});

        var project = new Project({'_id':{'$oid':1}, 'key':'Updated value'});
        project.update();

        $httpBackend.flush();
    }));

    it("should support 'remove' on a resource", inject(function (Project) {

        $httpBackend.expect('DELETE', createUrl('/1')).respond({'_id':{'$oid':1}, 'key':'value'});

        var project = new Project({'_id':{'$oid':1}, 'key':'value'});
        project.remove();

        $httpBackend.flush();
    }));

    it("should support 'delete' on a resource", inject(function (Project) {

        $httpBackend.expect('DELETE', createUrl('/1')).respond({'_id':{'$oid':1}, 'key':'value'});

        var project = new Project({'_id':{'$oid':1}, 'key':'value'});
        project.delete();

        $httpBackend.flush();
    }));

    it("should save a new resource when issuing 'saveOrUpdate'", inject(function (Project) {

        $httpBackend.expect('POST', createUrl('')).respond({'_id':{'$oid':1}, 'key':'value'});

        var project = new Project({'key':'value'});
        project.saveOrUpdate();

        $httpBackend.flush();
    }));

    it("should update an existing resource when issuing 'saveOrUpdate'", inject(function (Project) {

        $httpBackend.expect('PUT', createUrl('/1')).respond({'_id':{'$oid':1}, 'key':'value'});

        var project = new Project({'_id':{'$oid':1}, 'key':'value'});
        project.saveOrUpdate();

        $httpBackend.flush();
    }));


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});