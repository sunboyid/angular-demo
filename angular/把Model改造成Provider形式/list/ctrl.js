var listModule = angular.module('s7.ml.list', ['ngRoute', 's7.ml.model']);
listModule.controller('ListController', function ($scope, $routeParams, modelService) {
    $scope.name = 'list';
    $scope.routeParams = $routeParams;

    // 当前的分类
    var fenlei = $routeParams.fenlei;
    // 当前的分页
    var page = $routeParams.page - 0; // 把字符型转换成数值型

    // 每一页有多少项
    var itemsPerPage = 12;
    // 计算这一页的开始条目是第几条
    var start = (page - 1) * itemsPerPage;

    // 总页数
    var totalPages = 0;

    // 加载标记
    $scope.isWaiting = 'true';


    // modelService的这三个函数，就是用来从豆瓣的服务器上获取电影列表的。
    // 它们前两个参数都是start和count，从第几条开始取数据，一共取多少条
    // 它们的第三个参数是获取数据之后的回调函数
    switch (fenlei) {
        case 'in_theaters':
            modelService.getInTheaters(start, itemsPerPage, function (data) {
                $scope.listData = data;
                $scope.isWaiting = false; // 加载完毕，把加载标记改成false表示没有在加载中
                totalPages = Math.ceil(data.total / itemsPerPage);
                $scope.totalPage = totalPages;
                $scope.prev = '/list/in_theaters/' + (page - 1 < 1 ? 1 : page - 1);
                $scope.next = '/list/in_theaters/' + (page + 1 > totalPages ? totalPages : page + 1);
            });
            break;
        case 'top250':
            modelService.getTop250(start, itemsPerPage, function (data) {
                $scope.listData = data;
                console.log(data)
                $scope.isWaiting = false; // 加载完毕，把加载标记改成false表示没有在加载中
                totalPages = Math.ceil(data.total / itemsPerPage);
                $scope.totalPage = totalPages;
                $scope.prev = '/list/top250/' + (page - 1 < 1 ? 1 : page - 1);
                $scope.next = '/list/top250/' + (page + 1 > totalPages ? totalPages : page + 1);
            });
            break;
        case 'coming_soon':
            modelService.getComingSoon(start, itemsPerPage, function (data) {
                $scope.listData = data;
                console.log(data);
                $scope.isWaiting = false; // 加载完毕，把加载标记改成false表示没有在加载中
                totalPages = Math.ceil(data.total / itemsPerPage);
                $scope.totalPage = totalPages;
                $scope.prev = '/list/coming_soon/' + (page - 1 < 1 ? 1 : page - 1);
                $scope.next = '/list/coming_soon/' + (page + 1 > totalPages ? totalPages : page + 1);
            });
            break;
    }
});