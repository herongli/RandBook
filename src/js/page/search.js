define([
    'jquery',
    'template',
], function($,template) {
    var storage = window.localStorage;
    var searchArr = JSON.parse(storage.getItem('searcharr')) || [];
    $.getJSON("/book/searchKey",function(d){
        var newsearch = d.ads.concat(searchArr);
        console.log(newsearch)
        d.ads = newsearch;
        template($('.searchtext').html(),d,".searchresult");
    })

    $('.search-btn').on('click',function(){
        var val = $.trim($(this).prev().val());
        $.ajax({
            url:"/book/search",
            data:{
                title:val,
            }, 
            dataType:"json",
            success:function(d){
                var arr = d.items.filter(function(v,i){
                    return new RegExp(val,"g").test(v.title)
                });
                for (key in searchArr) {
                    if (searchArr[key]["ad_name"] == val) {
                        console.log(searchArr[key])
                        searchArr.splice(key, 1)
                    }
                }
                if(arr.length){
                    searchArr.push({
                        ad_name: val
                    });
                    storage.setItem("searcharr",JSON.stringify(searchArr))
                }
                $(".searchresult").html("");
                template($('.searchlist').html(),{
                    items:arr
                },".searchresult")
            }
        })
    })
});