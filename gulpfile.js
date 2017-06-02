const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const server = require('gulp-develop-server');
const clean = require('gulp-clean');
const rename = require('gulp-rename');

const paths = {
  styles: {
    entry: './resources/scss/entry.scss',
    files: './resources/scss/**/*.scss',
    includePaths: [
      './resources/scss',
      './bower_components/foundation-sites/scss/',
      './bower_components/compass-sass-mixins/lib/',
    ],
    dest: './build/css/',
    output: 'bundle.css',
  },
  clientJS: {
    entry: './resources/js/entry.js',
    files: './resources/js/**/*.js',
    dest: './build/js/',
    output: 'bundle.js',
  },
  serverJS: {
    files: [
      '**/*.js',
      '!node_modules/**',
      '!bin/**',
      '!resources/**',
      '!build/**',
    ]
  },
  scripts: {
    start: 'bin/www',
  },
  clean: {
    paths: [
      './build',
      './node_modules',
      './bower_components',
    ],
  }
};

gulp.task('default', ['build', 'server:start'], () => {
  gulp.watch(paths.serverJS.files, ['server:restart']);
  gulp.watch(paths.clientJS.files, ['babel']);
  gulp.watch(paths.styles.files, ['sass']);
});

gulp.task('build', ['sass', 'babel']);

gulp.task('clean', function () {
  gulp.src(paths.clean.paths, {read: false})
    .pipe(clean());
});

gulp.task('server:start', () => {
  server.listen({path: paths.scripts.start}, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

gulp.task('server:restart', () => {
  server.restart();
});

gulp.task('babel', () => {
  const webpacky = webpack({
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      }]
    },
    output: {
      filename: paths.clientJS.output,
    },
  });
  webpacky.on('error', (error) => console.log(error));
  gulp.src(paths.clientJS.entry)
    .pipe(webpacky)
    .pipe(gulp.dest(paths.clientJS.dest));
});

gulp.task('sass', () => {
  const sassy = sass({
    outputStyle: 'expanded',
    sourceComemnts: 'map',
    includePaths: paths.styles.includePaths,
  });
  sassy.on('error', (error) => console.log(error));
  gulp.src(paths.styles.entry)
    .pipe(sassy)
    .pipe(rename(paths.styles.output))
    .pipe(gulp.dest(paths.styles.dest));
});
