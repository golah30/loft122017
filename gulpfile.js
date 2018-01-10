const gulp = require('gulp');

const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const babel = require('gulp-babel');

const paths = {
  dest: './build',
  pug: {
    pages: './src/modules/pages/**/*.pug',
    src: './src/modules/**/*.pug'
  },
  scss: {
    src: './src/modules/main.scss',
    watch: './src/modules/**/**/*.scss',
    dest: './build/styles/'
  },
  img: {
    src: './src/img/**/*.*',
    dest: './build/img/'
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './build/js/',
    sub: './build/js/pre/'
  },
  fonts: {
    src: './src/fonts/**/*.*',
    dest: './build/fonts/'
  }
};

//html
function pages() {
  return gulp
    .src(paths.pug.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.dest));
}

//styles ++ postcss ( autoprefixer )
function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.dest));
}

// clean dest dir
function clean() {
  return del(paths.dest);
}

// replace img
function img() {
  return gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest));
}
function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

// webpack + gulp-babel
function scripts() {
  return gulp
    .src('src/js/main.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
}
function subscripts() {
  return gulp.src('src/js/preloader.js').pipe(gulp.dest(paths.scripts.sub));
}

// галповский вотчер
function watch() {
  gulp.watch(paths.scss.watch, styles);
  gulp.watch(paths.pug.src, pages);
  gulp.watch(paths.img.src, img);
  gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
  browserSync.init({
    server: paths.dest
  });
  browserSync.watch(paths.dest + '/**/*.*').on('change', browserSync.reload);
}

gulp.task(
  'default',
  gulp.series(
    clean,
    gulp.parallel(styles, pages, img, scripts, subscripts, fonts),
    gulp.parallel(server, watch)
  )
);
