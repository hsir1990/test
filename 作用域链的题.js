function test() {
    var list = [];
       setTimeout(() => {
           list = [7,8];
         list.push(1,2,3);
          
          list.concat(4,5,6); 
          
           console.log(list);   
        },10);
       
      return list 
   
   }


   var arr = test();
   console.log(arr);
//    打印为空；

function test() {
    var list = [];
       setTimeout(() => {
           list = [7,8];
         list.push(1,2,3);
          
          list.concat(4,5,6); 
          
           console.log(list);   
        },10);
       
      return list 
   
   }


   var arr = test();
   console.log(arr);
//    打印为【1,2,3】；

// 作用域链的重点才是为结束


function test() {
    var obj = {};
    setTimeout(() => {
     obj = {"name":"likeju"} ;
     obj.a = '3';
    
     Object.assign(obj,{"age":"123"});
      
    },10);
     return obj
    }
    var arr = test();
    //{}

    function test() {
        var obj = {};
        setTimeout(() => {
         obj.a = '3';
        
         Object.assign(obj,{"age":"123"});
          obj = {"name":"likeju"} ;
        },10);
         return obj
        }

        // /{a: "3", age: "123"}