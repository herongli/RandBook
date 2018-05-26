var gulp = require('gulp');
var less = require('gulp-less');
var squence = require('gulp-sequence');
var server = require('gulp-webserver');
var homeData = require('./src/data/home.json');
var mock = require("./src/data/mock");
var url = require('url');
var bscroll = require('./src/js/lib/bscroll.min');
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var minhtml = require("gulp-htmlmin");
var user = {
    name: "zs",
    pwd: 1234
};
var userCheck = false;
gulp.task('testless', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest("dist/css"))
});
//js
gulp.task('uglify', function() {
    gulp.src(['./src/js/{common/,lib/,page/}/*.js', './src/js/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
//html
gulp.task('minhtmls', function() {
    gulp.src('./src/*.html')
        .pipe(minhtml())
        .pipe(gulp.dest('./dist/'))
});

//css
gulp.task('mincss', function() {
    gulp.src('./src/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8008,
            host: "localhost",
            // livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                var uname = url.parse(req.url, true);
                if (req.url === "/loginuser") {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data);
                        res.writeHead(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });
                        console.log(obj);
                        if (obj.user === user.name && obj.pwd == user.pwd) {
                            res.end('{"result":"success"}');
                            userCheck = true;
                        } else {
                            res.end('{"result":"error"}');
                        };
                        next();
                    });
                    return false;
                };
                if (req.url == '/loginSearch') {
                    res.end('{"result":"' + userCheck + '"}');
                };
                if (/\/book/g.test(uname.pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                };
                next();
            }
        }));
});
gulp.task('default', function(cd) {
    squence("server", "testless", "uglify", "minhtmls", "mincss", cd);
});