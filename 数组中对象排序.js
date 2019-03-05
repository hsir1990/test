var candidate = null; 

2. 
candidate = {};
candidate.name = "weixing";
candidate.age = "28";
candidate.phoneNumber = "137XXXX";

3
var cnadidates = [];
cnadidates.unshift(candidate);

4
cnadidates.sort(function(a,b){  
        if(a.age<b.age){  
            return -1;  
        }else if(a.age>b.age){  
            return 1;  
        }else if(a.age=b.age){
    //         if(a.name>b.name){
    //             return 1;
    //         }else if(a.name<b.name){
    //             return -1;
    //         }
            return 0;
        }  
          
    });  





// 排序
    var arr = [];  
arr.push({name:"lilei",age:17});  
arr.push({name:"hanmeimei",age:17});  
arr.push({name:"zry",age:23});  
arr.push({name:"yyy",age:21});    
arr.sort(function(a,b){  
    if(a.age<b.age){  
        return -1;  
    }else if(a.age>b.age){  
        return 1;  
    }else if(a.age=b.age){
        
        return 0;
    }  
      
});  
console.log(arr)





for(var i=0;i<arr.length;i++){  
    console.log(arr[i].name + ", " + arr[i].age);  
}





var results = [],
 num1=0,
 num2 = 0,
 index = 0;
arr.forEach( function(key, val ){
    if(key < arr.length-1){
        if(val == arr[key+1]){
            num1++;
            if(num1>num2){
                num2 = num1;
                index = key+1;
            }
        }
    }
    
});
for(let i = 0; i > num2; i--){
    results.push(arr[index-i])
}
