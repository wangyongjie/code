//-------------------------------------------------------------------------------
//-实现点击图片，图片翻滚功能
//-注：采用jquery的animate来实现，需要用img标签。
var path = 'http://r.syyx.com/lz/brotherhood/pic/'
function roll() {
    var div = $(this);
    div.unbind("click", roll )      //解除绑定，避免用户继续点击图片，导致图片的宽度出问题

    var h = div.css("height") 
    var w = div.css("width")
    var w2 = w.replace(/px/,"")/2 + 'px'

    div.animate({width:'0px',height: h ,left: w2 ,opacity:'0.4'}, 250, function(){
    	//这里的if—else是判断img的src属性换什么图片
        if (div.attr("src").match("init_")) {
            div.attr("src", div.attr("src").replace(/init_/, "")); 
        }
        else {
            div.attr("src", path + 'init_' + div.attr("src").substring(path.length));  
        }
        div.animate({width: w ,height:h,left:'0px',opacity:'1'}, 250, function(){
            div.bind("click", roll )
        });
    });        
}
$(".pic").bind("click", roll );         //为某张图片绑定点击事件


//----------------------------------------------------------------------------------------
//-实现文字滚动
//-注：要加载两次文字，类为comment的div不用设置高度。通过改变comment的margin-top来实现滚动。
var scrollFlag3 =1;
function scrolls() {
    var top = parseInt($('.comment').css('margin-top').replace('px', ''));
    var height = 0 - $(".comment").css("height").replace('px', '') / 2

    setInterval(function() {
        if(scrollFlag3){
            if(top > height) {
                top -= 1
                if(top == height) {
                    top = 0
                }
                $(".comment").css("margin-top", top + "px")
            }
        }
    }, 20);  
}

$('.comment').mouseenter(function () {
    scrollFlag3 = 0;
}).mouseleave(function () {
    scrollFlag3 = 1;
})
