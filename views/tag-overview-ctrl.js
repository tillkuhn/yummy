angular.module('yummy').controller('TagOverviewCtrl', function ($scope, $log, Tag, $location) {

    var limit = 100;

    $scope.msg = "Loading alltags from DB";
    $scope.tags = [];
    $scope.addTag = new Tag();
    // https://api.mongolab.com/api/1/databases/yummy/collections/dishes?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd

    $scope.overview = function () {
        var options = {
            "sort": {"text":1},
            "limit":limit };
        Tag.all(options).then(function (tags) {
        $scope.tags = tags;
        });
    };
    $scope.overview();

    $scope.add = function (addTag) {
      addTag.$saveOrUpdate().then(function (data) {
          $scope.msg = addTag.text  + " saved";
          $scope.overview();
      });
    };

    $scope.remove  = function (tag) {
      tag.$remove().then(function (data) {
          $scope.msg = tag.text + " removed";
          $scope.overview();
      });

    }

})
;
