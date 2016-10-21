var jsonpModule = angular.module('s7.ml.services.jsonp', []);

jsonpModule.factory('jsonpService', function ($rootScope) {
    var count = 0;
    // url: 要访问的资源:callback=JSON_CALLBACK的JSON_CALLBACK需要替换成真正的函数名
    // callback： 获得资源之后，把数据传给回调函数
    return function (url, callback) {
        //手写jsonp的步骤：
        //1. 确定这一次jsonp访问所使用的函数名。
        var fnName = '_jsonp_' + count++; // 每一次访问count的值都加一，能够保证每次访问都有自己的函数名
        //2. 创建服务器传回的js文件所需要调用的函数。window[函数名] = function() { ... }
        window[fnName] = function (data) {
            callback(data);
            // 等用户操作完数据之后，调用$rootScope.$apply()去通知AngularJs用户可能做过数据操作，快去检查
            document.body.removeChild(scriptEl);
            $rootScope.$apply();

        };
        //3. 创建script标签，设置src，放到document.body上。
        var scriptEl = document.createElement('script');
        var newUrl = url.replace('JSON_CALLBACK', fnName);
        scriptEl.src = newUrl;
        document.body.appendChild(scriptEl);
    };
});