define([
    'jquery',
    'template',
    "swiper",
    "text!../../tql/tab1.html",
    "text!../../tql/nav1.html",
    "text!../../tql/benzhou.html",
    "text!../../tql/zhong.html",
    "text!../../tql/girl.html",
    "text!../../tql/boy.html",
    "text!../../tql/xianmian.html",
    "bscroll",
    "text!../../tql/list.html",
    "text!../../tql/love.html",
], function($, template, swiper, tab1,nav1,benzhou,zhong,girl,boy,xianmian,BScroll,list,love) {
    $.getJSON("book/index", function(d) {
        console.log(d)
        initHtml(d)
        //女生最爱
        var girldata = {
            items : d.items[3].data.data.splice(0,5)
        }
        template(love, girldata, ".girl-love>ul");
        //男生最爱
        var boydata = {
            items : d.items[4].data.data.splice(0,5)
        }
        template(love, boydata, ".boy-love>ul");
        //书架数据
        var boydata1 = {
            items : d.items[4].data.data
        }
        template(love, boydata1, ".book-table>ul");
        //main
        var mainswiper = new swiper(".main", {
            on:{
               slideChangeTransitionStart:function(){
                   var index = this.activeIndex;
                   $('.header>span').eq(index).addClass('active').siblings().removeClass('active')
               }
            }
        });
        $('.header>span').on("click",function(){
            mainswiper.slideTo($(this).index());
        })
        var bscroll = new BScroll('#tab',{
            scrollbar:true,
            probeType:2,
            click:true
        });
        var parent = $('.cantent');
        var pagenum = 1;
        var defaultTip = "上拉加载更多...";
        var tip = "释放加载更多";
        
        bscroll.on("scroll",function(){
            if(pagenum > 3){
                parent.attr('data-up',"暂无更多数据")
                return false;
            }
            if(this.y < this.maxScrollY -40){
                parent.attr('data-up',tip);
            }else if(this.y < this.maxScrollY -20){
                parent.attr('data-up',defaultTip)
            }
        })
        bscroll.on("scrollEnd",function(){
            parent.attr('data-up',defaultTip)
        })
        bscroll.on("touchEnd",function(){
            
            if(parent.attr('data-up') === tip){
                $.getJSON("/book/list",{
                    pagenum:pagenum,
                    limit:10
                },function(d){
                    template(list, d, "#tab>div");
                    bscroll.refresh();
                })
                pagenum++;
            }
        })
    });
    function initHtml(d){
        var obj = {};
        d.items.map(function(v, i) {
            obj["data" + i] = v;
        });
        template(tab1, obj, "#tab>div");
        template(nav1, obj, "#tab>div");
        template(benzhou, obj, "#tab>div");
        template(zhong, obj, "#tab>div");
        template(girl, obj, "#tab>div");
        template(boy, obj, "#tab>div");
        template(xianmian, obj, "#tab>div");
        //banner
        new swiper(".index-banner", {
            loop: true,
            autoplay: {
                delay: 1000
            }
        });
        new BScroll('.book-page',{
            scrollbar:true,
            probeType:2,
            click:true
        });
        $('.page-btn').on("click",function(){
            if($(".book-table").hasClass("show1")){
                $(".book-table").removeClass('show1');
                $(".page-btn").removeClass('show')
            }else{
                $(".book-table").addClass("show1");
                $(".page-btn").addClass('show')
            }
        })
    }
});