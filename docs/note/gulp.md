# gulp

```js
var gulp = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')

gulp.task('scripts', function() {
  return gulp.src(['scripts/a.js','scripts/b.js'])
  .pipe(concat('vender.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename('vender.min.js'))
  .pipe(gulp.dest('dist/js'))
})

gulp.task('server', function() {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('copy-index',function() {
  return gulp.src('index.html').pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})


gulp.task('images', function() {
  return gulp.src('image/**/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/image'))
})

gulp.task('data', function() {
  return gulp.src('xml/*.xml', 'json/*.json', '!json/select-*.json').pipe(gulp.dest('dist/data'))
})

gulp.task('build',['copy-index', 'images', 'data'], function() {
  console.log('打包成功')
})

gulp.task('watch', function() {
  gulp.watch('index.html',['copy-index'])
  gulp.watch('image/**/*.{jpg,png}',['images'])
  gulp.watch(['xml/*.xml', 'json/*.json', '!json/select-*.json'],['copy-index'])ø
})

gulp.task('testAutoFx', function () {
  gulp.src('css/**/*.css')
  .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:true //是否去掉不必要的前缀 默认：true 
  }))
  .pipe(gulp.dest('dist/css'))
})

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('default', ['server', 'watch'])
```
