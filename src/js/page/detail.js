define([
    'jquery',
    'template',
], function($, tem) {
    var sourceId = window.location.search.split('?')[1].split('=')[1];
    //搜索结果后
    $.getJSON('/book/detail', { source_id: sourceId }, function(data) {
        data.items.filter(function(v, i) {
            if (v.source_id === sourceId) {
                tem($("#detail").html(), v, ".wrap2");
            }
        })
    })
    $.getJSON('/book/data', { indexId: sourceId }, function(data) {
        tem($("#wrap").html(), data.item, ".wrapper");
        $('.u-btn2').on('click', function() {
            $.ajax({
                url: "/loginSearch",
                dataType: "json",
                success: function(data) {
                    if (data.result === 'false') {
                        if (confirm('请先登录')) {
                            location.href = "../../page/login.html";
                        }
                    } else {
                        location.href = "../../page/read.html?indexId=" + sourceId;
                    }
                }
            })
        })
    })

})