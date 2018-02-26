    // 不用的
    (function () {
        $.ajax({
            async:false,
            url : "./json.txt",
            type : "POST",//加上post报405错误，有了限制    
            // headers : "{}",
            // timeout : 20000,
            data : {
                    "source_order" : "E18012615355251817",
                    "ofc_order" : null
                    },
            success : function () {
                // config对象
                // deleteAjax(config);
                // if (json == null) {
                //     console.log('数据为空');
                //     return;
                // }
                // // 判断code值用的
                // var isOk = Util.locationWrapper.daoApiCode(json);

                // isOk && callback && callback(json);

                // console.log('数据不为空');
            },
            error : function () {
                // if (window.location.hash != '' && window.location.hash == config.pageId) {
                //     callback && callback({'msg' : '网络错误或超时', 'code' : 1}) 
                // }

                // console.log('网络错误或超时');
            },
            // 被请求后得到的数据类型
            // dataType : "json"
        })
    })();