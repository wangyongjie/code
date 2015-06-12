//---------------------------------------------------------------------------------
//-注：以下的js方法都调用jquery提供的函数，要使用，一定要先导入jquery文件。


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

//---------------------------------------------------------------------------------------
//-现状：由于placeholder是html5的新属性，可想而知，仅支持html5的浏览器才支持placeholder，
//       目前最新的firefox、chrome、safari以及ie10都支持，ie6到ie9都不支持。
//-使textarea标签的placeholder属性在各个浏览器样式统一。
//-注：在这里，你需要修改color等属性以符合需求。
/*
 * jQuery placeholder, fix for IE6,7,8,9
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('textarea');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#855d22'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});

//----------------------------------------------------------------------------------------------
//-功能：实现复制文字到粘贴板功能。
//-现状：由于firefox等非ie浏览器不支持操作粘贴板，所以通过flash的复制功能来实现。
//-原理：用了一个透明的 Flash ，让其漂浮在按钮之上，这样点击的不是按钮而是 Flash ，也就可以使用 Flash 的复制功能了。 
//-在jade中引入script文件，需要放在调用zeroclipboard的script前面。 
//-相关链接 http://www.365mini.com/page/zeroclipboard-2_x-quick-start.htm
script(src='/javascripts/brotherhood/zeroclipboard.js')
//-js文件中如下：
$("#p_s_copy").click(function(event) {
    event.preventDefault()
    var value = $(".s_1_p2").html()                //获取需要复制的参数

    if(window.clipboardData){
        //针对ie
        if (window.clipboardData.setData("Text",value)) {
            alert("复制礼包号成功");                   //提示信息
        }
        else {
            alert("复制礼包号失败，请重新复制")       //提示信息
        }

        return;
    }

    var clip = new ZeroClipboard.Client();              //创建新的Zero Clipboard对象
    ZeroClipboard.setMoviePath( '/javascripts/brotherhood/zeroclipboard.swf' );   //和js不在同一目录需设置setMoviePath
    clip.setHandCursor( true );                        //设置鼠标移到复制框时的形状
    clip.setCSSEffects( true );                            //启用css
    clip.setText( value );
    clip.addEventListener('complete', function (client, text) {
      alert( "复制礼包号成功" );                                 //提示信息
    });
    clip.glue( $(this).attr("id") );
})
