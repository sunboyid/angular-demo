void function () {
    var modelModule = angular.module('s7.ml.model', ['s7.ml.services.jsonp']);
    modelModule.provider('modelService',function(){
        var host = 'api.douban.com';
        return {
            $get:function(jsonpService){
                return{
                    // 根据start和count获取正在上映的电影的列表
                    getInTheaters: function (start, count, callback) {
                        var url = 'https://api.douban.com/v2/movie/in_theaters?'
                            + 'start=' + start
                            + '&count=' + count
                            + '&callback=JSON_CALLBACK';
                        jsonpService(url,function(data){
                            callback(data);
                            //return data; 不可以这个回调函数的返回值用户拿不到
                        })
                    },
                    getComingSoon:function(start, count, callback){
                        var url = 'https://api.douban.com/v2/movie/coming_soon?'
                            + 'start=' + start
                            + '&count=' + count
                            + '&callback=JSON_CALLBACK';
                        jsonpService(url,function(data){
                            callback(data);
                        })
                    },
                    getTop250:function(start, count, callback){
                        var url = 'https://api.douban.com/v2/movie/top250?'
                            + 'start=' + start
                            + '&count=' + count
                            + '&callback=JSON_CALLBACK';
                        jsonpService(url,function(data){
                            callback(data);
                        })
                    },
                    // 获取电影详情
                    getSubject:function(id,callback){
                        var url = `https://api.douban.com/v2/movie/subject/${id}?&callback=JSON_CALLBACK`;
                        jsonpService(url,function(data){
                            callback(data);
                        })
                    }

                }
            },
            setHost:function(newHost){
                host = newHost;
            }
        }
    });

}();