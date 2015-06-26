/* see https://github.com/pkozlowski-opensource/angularjs-mongolab */
angular.module('mongolabResourceHttp', [])

    .factory('mongolabResourceConfig', ['MONGOLAB_CONFIG', function (MONGOLAB_CONFIG) {

        var config = angular.extend({
            BASE_URL: 'https://api.mongolab.com/api/1/databases/'
        }, MONGOLAB_CONFIG);

        var _apiKey = config.API_KEY; // default
        var _dbUrl = config.BASE_URL + config.DB_NAME;

        return {
            apiKey: function(key) {
                _apiKey = key;
            },
            defaultParams: function() {
                return {"apiKey" : _apiKey}
            },
            collectionUrl: function (collectionName) {
                return _dbUrl + '/collections/' + collectionName;
            },
            dbUrl: function() {
                return _dbUrl;
            },
            configured: function() {
                return _apiKey  && 0 !== _apiKey.length;
            }
        };

    }])

    .factory('$mongolabResourceHttp', ['mongolabResourceConfig','$http', '$q', function (mongolabResourceConfig, $http) {

        function MmongolabResourceFactory(collectionName) {

            var resourceRespTransform = function (response) {
                return new Resource(response.data);
            };

            var resourcesArrayRespTransform = function (response) {
                return response.data.map(function (item) {
                    return new Resource(item);
                });
            };

            var preparyQueryParam = function (queryJson) {
                return angular.isObject(queryJson) && Object.keys(queryJson).length ? {q: JSON.stringify(queryJson)} : {};
            };

            var Resource = function (data) {
                angular.extend(this, data);
            };

            Resource.query = function (queryJson, options) {

                var prepareOptions = function (options) {

                    var optionsMapping = {sort: 's', limit: 'l', fields: 'f', skip: 'sk'};
                    var optionsTranslated = {};

                    if (options && !angular.equals(options, {})) {
                        angular.forEach(optionsMapping, function (targetOption, sourceOption) {
                            if (angular.isDefined(options[sourceOption])) {
                                if (angular.isObject(options[sourceOption])) {
                                    optionsTranslated[targetOption] = JSON.stringify(options[sourceOption]);
                                } else {
                                    optionsTranslated[targetOption] = options[sourceOption];
                                }
                            }
                        });
                    }
                    return optionsTranslated;
                };

                var requestParams = angular.extend({}, mongolabResourceConfig.defaultParams(), preparyQueryParam(queryJson), prepareOptions(options));
                return $http.get(mongolabResourceConfig.collectionUrl(collectionName), {params: requestParams}).then(resourcesArrayRespTransform);
            };

            Resource.all = function (options, successcb, errorcb) {
                return Resource.query({}, options || {});
            };

            Resource.count = function (queryJson) {
                return $http.get(mongolabResourceConfig.collectionUrl(collectionName), {
                    params: angular.extend({}, mongolabResourceConfig.defaultParams(), preparyQueryParam(queryJson), {c: true})
                }).then(function (response) {
                    return response.data;
                });
            };

            Resource.distinct = function (field, queryJson) {
                return $http.post(mongolabResourceConfig.dbUrl() + '/runCommand', angular.extend({}, queryJson || {}, {
                    distinct: collectionName,
                    key: field
                }), {
                    params: mongolabResourceConfig.defaultParams()
                }).then(function (response) {
                    return response.data.values;
                });
            };

            Resource.getById = function (id) {
                return $http.get(mongolabResourceConfig.collectionUrl(collectionName) + '/' + id, {params: mongolabResourceConfig.defaultParams()}).then(resourceRespTransform);
            };

            Resource.getByObjectIds = function (ids) {
                var qin = [];
                angular.forEach(ids, function (id) {
                    qin.push({$oid: id});
                });
                return Resource.query({_id: {$in: qin}});
            };

            //instance methods

            Resource.prototype.$id = function () {
                if (this._id && this._id.$oid) {
                    return this._id.$oid;
                } else if (this._id) {
                    return this._id;
                }
            };

            Resource.prototype.$save = function () {
                return $http.post(mongolabResourceConfig.collectionUrl(collectionName), this, {params: mongolabResourceConfig.defaultParams()}).then(resourceRespTransform);
            };

            Resource.prototype.$update = function () {
                return $http.put(mongolabResourceConfig.collectionUrl(collectionName) + "/" + this.$id(), angular.extend({}, this, {_id: undefined}), {params: mongolabResourceConfig.defaultParams()})
                    .then(resourceRespTransform);
            };

            Resource.prototype.$saveOrUpdate = function () {
                return this.$id() ? this.$update() : this.$save();
            };

            Resource.prototype.$remove = function () {
                return $http['delete'](mongolabResourceConfig.collectionUrl(collectionName) + "/" + this.$id(), {params: mongolabResourceConfig.defaultParams()}).then(resourceRespTransform);
            };

            return Resource;
        }

        return MmongolabResourceFactory;
    }]);
