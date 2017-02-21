var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var less = require('gulp-less');
var js = require('gulp-uglify');
var html = require('gulp-minify-html');
//var img = require('gulp-imagemin');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/**/*.js'],
  html: ['./www/**/*.html'],
  img: ['./www/img/*.png'],
  less:['./www/less/*.less']
};

gulp.task('default', ['sass','html','js','less']);
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});
gulp.task('img',function(done) {
  gulp.src('./www/img/*.png')
      .pipe(img({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./libs/images/'))
      .on('end', done)
});
gulp.task('js',function(done){
  gulp.src('./www/**/*.js')
      .pipe(js({
        mangle: false,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
      }))
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('./libs/'))
      .on('end', done)
});
gulp.task('html',function(done){
  gulp.src('./www/**/*.html')
      .pipe(html())
      .pipe(rename({extname: '.min.html'}))
      .pipe(gulp.dest('./libs/'))
      .on('end',done)
})
gulp.task('less',function(done) {
  gulp.src('./www/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./www/css/'))
      //.pipe(minifyCss({
      //  keepSpecialComments: 0
      //}))
      //.pipe(rename({ extname: '.min.css'}))
      //.pipe(gulp.dest('./www/css/'))
      .on('end', done);
});
gulp.task('watch', function() {
  //gulp.watch(paths.sass, ['sass']);
  //gulp.watch(paths.js, ['js']);
  //gulp.watch(paths.html, ['html']);
  gulp.watch(paths.less, ['less']);
  //gulp.watch(paths.img, ['img']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
      .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
