
/*
* 工具函数
*
*/

function trim(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/gm, "");
}

function ltrim(str){ //删除左边的空格
　　     return str.replace(/(^\s*)/gm,"");
}

function rtrim(str){ //删除右边的空格
　　     return str.replace(/(\s*$)/gm,"");
}

function trimall(str){ //删除所有的空格
　　     return str.replace(/(\s*)/gm, "");
}

//合并数组，有相同的属性，n的属性替代o的
var extend=function(o,n){
   for (var p in n){
        if(n.hasOwnProperty(p) && (o.hasOwnProperty(p) ))
            o[p]=n[p];
    }
};


//字符串去重
function quchong2(str){  
    var newStr="";  
    for(var i=0;i<str.length;i++){  
        if(newStr.indexOf(str[i])==-1){  
            newStr+=str[i];  
        }  
    }  
    return newStr;  
} 


//多维数组深拷贝
function deepcopy(obj) {
            var out = [],i = 0,len = obj.length;
            for (; i < len; i++) {
                if (obj[i] instanceof Array){
                    out[i] = deepcopy(obj[i]);
                }
                else out[i] = obj[i];
            }
            return out; 
        }


//求出e关于modf的数论倒数
function invert( e,  f)  
{  
    var a = f, b = e, t1 = 0, t2 = 1;  
      
    while(b != 0)  
    {  
        var t = a;  
        a = b;  
        var q = Math.floor(t / b);  
        b = t % b;  
          
        t = t1 - q * t2;  
        t1 = t2;  
        t2 = t;  
    }  
      
    if(t1 < 0)  //扩展欧几里得算法得到的结果可能为负数，所以需要把它“掰正”  
        t1 += f;  
    return t1;  
}