var gulp = require('gulp'),
    sass = require('gulp-sass');
const open = require('open')
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
const port = 8088;

//可以在定义一个监听js，html的task
gulp.task('webpack', () => {
  const compiler = webpack(webpackConfig)
  new webpackDevServer(compiler, {
    contentBase:'./',
		historyApiFallback:true,
		hot:true,
		noInfo:false,
  }).listen(port, function(err){
    console.log(`listening: http:127.0.0.1:${port}`)
    open(`http://127.0.0.1:${port}`);
  })
})

gulp.task('sass',function(){
  gulp.src('src/styles/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/styles'))
});

gulp.task('watch',['webpack','sass'],function(){
    gulp.watch('src/styles/**/*.scss',['sass']);
});