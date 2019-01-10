//浏览器器端
{/* <script type="text/javascript"> */}
    //定义一个发送Jsonp请求的函数
    function jsonp(obj) {
        //定义一个处理Jsonp返回数据的回调函数
    window["callback"] = function(object) {
            obj.success(JSON.parse(object));
        }
        var script = document.createElement("script");
        //组合请求URL
        script.src = obj.url + "?fn=callback";
        for(key in obj.data){
            script.src +="&" + key + "=" + obj.data[key];
        }
        //将创建的新节点添加到BOM树上
        document.getElementsByTagName("body")[0].appendChild(script);  
    }
// </script>
 
{/* <script type="text/javascript"> */}
    //调用Jsonp函数发送jsonp请求
    jsonp({
        url:"http://localhost/index.php",
        data:{
            name:"小明",
        },
        success:function(obj) {
            alert("性别" + obj.sex);
        }
    });
// </script>
// jsonp的会掉函数返回的数据，绑定了，你穿入的对象里面了jsonp({});





// 返回的数据
// jQuery110205137020809815933_1545643347662({code: 0, data: [,…], msg: "success"})
// code: 0
// data: [,…]
// [0 … 99]
// [100 … 199]
// [200 … 299]
// [300 … 399]
// [400 … 499]
// [500 … 530]
// msg: "success"
