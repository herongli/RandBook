var homeData = require('./home.json');
var test1 = require('./recommend1.json')
var test2 = require('./recommend2.json')
var test3 = require('./recommend3.json')
var searchKeyData = require('./searchKey.json')
var searchData = require('./search.json')
var data = require('./352876.json');
var read1 = require('./reader/data1.json');
var read2 = require('./reader/data2.json');
var read3 = require('./reader/data3.json');
var read4 = require('./reader/data4.json');
var menulist = require('./reader/chapter-list.json');

var mockdata = {
    "/book/index": homeData,
    "/book/list?pagenum=1&limit=10": test1,
    "/book/list?pagenum=2&limit=10": test2,
    "/book/list?pagenum=3&limit=10": test3,
    "/book/searchKey": searchKeyData,
    "/book/search": searchData,
    "/book/data": data,
    "/book/reader-list?article=1": read1,
    "/book/reader-list?article=2": read2,
    "/book/reader-list?article=3": read3,
    "/book/reader-list?article=4": read4,
    "/book/menu-list": menulist
}
module.exports = function(url) {
    if (/\/book\/search\?/.test(url)) {
        url = "/book/search";
    } else if (/\/book\/data\?/.test(url)) {
        url = "/book/data"
    }
    return mockdata[url];
}