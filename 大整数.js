function multi(a,b){  
        var str1,str2,len1,len2,maxlen,result = [];  
  
        str1 = a.split("").reverse();  
        str2 = b.split("").reverse();  
        len1 = str1.length;  
        len2 = str2.length;  
  //123   78     321*87

//因为要在下一步做累加，如果不初始化为0，result[]中的值会变为NaN  
//因为未初始化的数组中的值为undefined  
        for(var i = 0;i < len1;i++)  
            for(var j = 0;j < len2;j++)  
                result[i + j] = 0;  //0 - 3
          
        for(var i = 0;i < len1;i++)  
            for(var j = 0;j < len2;j++)  
    //根据乘法的手动计算方式，在上下相同位上会有相加  
                result[i + j] += parseInt(str1[i]) * parseInt(str2[j]);  
  
        var n = result.length;  
        for(var k = 0;k < n;k++)  
        {  
            var temp = result[k];  
            if(temp >= 10)  
            {  
                result[k] = temp % 10;  
                //JS中的"/"不是除法取整，会取得小数，所以要用Math.floor()  
                result[k + 1] +=  Math.floor(temp / 10);  
            }  
        }  
        return result.reverse().join("");  
    }  
    var d = multi("144444","12223344");  
    console.log(d);  





    function add(a , b){  
        var addFlag,str1,str2,na,nb,Maxlen = [],Minlen = [],result = [];  
  
        addFlag = 0;  
       
        str1 = a.split("");  
        str2 = b.split("");  
        na = str1.length;  
        nb = str2.length;  
  
        //保证Maxlen总是指向长度最长的那个  
       if(na >= nb )  
       {  
            Maxlen = str1;  
            Minlen = str2;  
       }else{  
            Maxlen = str2;  
            Minlen = str1;  
       }  
  
        for(var i = Maxlen.length - 1;i >= 0;i--)  
        {  
  
            if(Minlen.length > i)  
                temp = parseInt(Maxlen[i]) + parseInt(Minlen[i]) + addFlag;  
            else  
            //如果长度较短的数组所有位被加完了，那么就只剩下较长数组自身与进位间的累加  
                temp = parseInt(Maxlen[i]) + addFlag;  
  
            if(temp > 9)  
            {  
                result[i] = temp - 10;  
                //最高位若有进位，需在再在最高位的下一位加1  
                    if(i == (Maxlen.length - 1)) result[Maxlen.length] = 1;  
                addFlag = 1;  
            }else{  
                result.push(temp);  
                addFlag = 0;  
            }  
        }  
        return result.reverse().join("");  
    }  
    var c = add("92395","5556789");  
    console.log(c);  