//---------------------------------------------------------------------------------
//-为字符串String赋予trim()方法
//-注：nodejs是提供trim()方法的，直接调用就可以，前端则需要为String写一个trim（）方法
String.prototype.trim=function() {  
    return this.replace(/(^\s*)|(\s*$)/g,'');  
};
//-----------------------------------------------------------------------------------
//-获取浏览器版本，可以为各个浏览器单独写样式
//-如果是ie浏览器，则Sys.ie存在且能确定是某个ie版本，如if(Sys.ie == 6.0)，其他的如Sys.firefox都是未定义
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;

(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;