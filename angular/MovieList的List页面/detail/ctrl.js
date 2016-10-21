var detailModule = angular.module('s7.ml.detail', ['ngRoute', 's7.ml.model']);
// 电影id需要通过路由参数传递过来
detailModule.controller('DetailController', function ($scope, $routeParams, modelService) {
    //var id = $routeParams.id; // 路由参数中，应该有id一项

    var id = $routeParams.id; // 暂时没有把路由搭起来，所以写了个临时的id
    $scope.routeParams = $routeParams;
    modelService.getSubject(id, function (data) {
        $scope.data = data;
        console.log(data);
    })
});