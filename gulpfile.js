const gulp = require('gulp'),
    sass = require('gulp-sass'), //编译scss文件
    autoprefixer = require('gulp-autoprefixer'), //自动补全浏览器兼容前缀
    open = require('open'),
    webpack = require("webpack"),
    webpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js"),
    port = 8088 //默认启动服务器端口

//开启webpack
gulp.task('webpack', () => {
    const compiler = webpack(webpackConfig)
    new webpackDevServer(compiler, {
        contentBase:'./',
        historyApiFallback:true,
        hot:true,
        noInfo:false,
    }).listen(port, function(err){
        open(`http://127.0.0.1:${port}`)
    })
})
//开启sass
gulp.task('sass', function(){
    gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 
            remove:true,
        }))
        .pipe(gulp.dest('dist/styles'))
})
//统一监听
gulp.task('watch', ['webpack', 'sass'], function(){
    gulp.watch('src/styles/**/*.scss', ['sass'])
})