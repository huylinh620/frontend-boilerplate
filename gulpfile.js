const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postcssCustomMedia = require('postcss-custom-media');
const postcssMixin = require('postcss-mixins');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const image = require('gulp-image');

// Sass Task
function scssTask(){
  return src('src/assets/css/style.css', { sourcemaps: false })
    .pipe(sass())
    .pipe(postcss([cssnano(), postcssCustomMedia(), postcssMixin(), postcssImport()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
  return src('src/assets/js/script.js', { sourcemaps: false })
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Image task
function imgTask() {
  return src('src/assets/image/*')
  .pipe(image())
  .pipe(dest('dist/image'));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['src/assets/css/*.css', 'src/assets/js/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);

exports.image = series(
  imgTask
);
