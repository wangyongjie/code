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

//-----------------------------------------------------------------------------------
//-预加载图片
//-注：在ie6下，没有在main.styl中加载，而在js中加载，直接修改src会加载不了图片，所以要预加载，此问题为了解决ie6下的兼容问题
var con2_path = 'http://r.syyx.com/lz/glory/'

var img_con_2_11 = new Image()
img_con_2_11.src = con2_path + "con_2_11.jpg"

if(img_con_2_11.complete){                       //如果加载完成，则修改src
    $(".con_2_img1").attr("src",  img_con_2_11.src).css('visibility', 'visible')
}else{
    img_con_2_11.onload = function(){            //如果没加载完成，重新加载
        $(".con_2_img1").attr("src",  img_con_2_11.src).css('visibility', 'visible')
    }
    img_con_2_11.onerror = function(){           //如果加载出错，则调用此函数
        
    }
}

//---------------------------------------------------------------------------------------
//-提示加载中···
//-注：读取后台，加载数据还没加载出来时，可以先提示加载中···以友好用户体验
//-    wait_wenzi()不能多次调用，否则会有多个setInterval事件执行          
//-js代码如下：
function wait_wenzi() {
    var w_num = 1

    setInterval(function() {
        if (w_num % 3 == 1) {
            $(".t_wait_dot").html("")
            $(".t_wait_dot").append("·")
        }
        else {
            $(".t_wait_dot").append("·")
        }
        w_num++
    },600)
}
wait_wenzi()              //提示加载中···
//-jade代码如下：
.t_wait 
    p 加载中
    p.t_wait_dot ···
//-styl代码如下：
.t_wait
    position absolute
    width 100px 
    height 30px 
    top 107px 
    left 260px
    font-size 15px 
    p 
        float left
        line-height 30px 
    .t_wait_dot
        font-size 30px 

//---------------------------------------------------------------------------------------
//-获取浏览器的滚动条垂直和水平位置
    function page_height() {
        return $("html").scrollTop() || $("body").scrollTop()
    }
    function page_width() {
        return $("html").scrollLeft() || $("body").scrollLeft()
    }

//---------------------------------------------------------------------------------------
//-获取某一范围的随机整数
//-最小值和最大值为参数，但是都不能为负数
function get_random_num(min, max) {
    var range = max - min
    var rand  = Math.random()
    return(min + Math.round(range * rand))
}