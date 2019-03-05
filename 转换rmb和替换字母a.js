 function rmb(str){
    str=str.split("").reverse().join("");
    var result="";
    for(var i=1;i<=str.length;i++){
       result=result+str[i-1];//把字符串的每一项重新放到一个新的字符串里
    
    
      if(i%3==0 &&i!=str.length){//字符串的索引是3 并且不是最后一项的时候添加，
        result+=","
      }
    }
    return result.split("").reverse().join("");
}


var str = "111AAaa2222"
undefined
str.replace(/[A|a]/g,'2')
"11122222222"