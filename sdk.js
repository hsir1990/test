// 封装js-sdk的
!(function(win, doc) {

    function SDK(opt) {
      this.opt = opt;
    }
    SDK.prototype._ajax = function(param, callback) {
      // 省略代码，举个例子，直接返回参数
      if (typeof callback === 'function') callback(param);
    }
  
    // 私有方法，一般不提供的，为了扩展性
    SDK.prototype._update = function(key, defaultParam) {
      this[key] = function(param, callback) {
        param = Object.assign({}, defaultParam, param);
        this._ajax(param, callback);
      }
      return this;
    };
    SDK.prototype._remove = function(url) {
      delete this[url];
      return this;
    };
  
    // common 方法
    SDK.prototype.loginApi = function(param, callback) {
      param.time = new Date();
      return this._ajax(param, callback);
    }
  
    win.JSsdk = new SDK();
  
  })(window, document);
  
  // test
  JSsdk.loginApi({ username: 'admin', pwd: '123456' }, function(res) {
    console.log(res);
  });
  
  JSsdk._update('logout', { redirect: 'http://aaa.com/bbb' });
  JSsdk.logout({}, function(res) {
    console.log(res);
  });
  



//   或者
// (function($){
//     $.currentDate=function(){
//         return new Date();
//     }
// })(Utils={});
