const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const server = require('gulp-develop-server');

const paths = {
  styles: {
    files: './resources/scss/**/*.scss',
    includePaths: [
      './resources/scss',
      './bower_components/foundation-sites/scss'
    ],
    dest: './public/css'
  },
  clientJS: {
    files: './resources/js/**/*.js',
    dest: './public/js'
  },
  serverJS: {
    files: [
      '**/*.js',
      '!node_modules/**',
      '!bin/**',
      '!resources/**',
      '!public/**'
    ]
  },
  scripts: {
    start: 'bin/www'
  }
};

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

gulp.task('default', ['server:start', 'build'], () => {
  gulp.watch(paths.serverJS.files, ['server:restart']);
  gulp.watch(paths.styles.files, ['sass']);
  gulp.watch(paths.clientJS.files, ['babel']);
});

gulp.task('sass', () => {
  gulp.src(paths.styles.files)
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: 'map',
      includePaths: paths.styles.includePaths
    }))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('babel', () => {
  gulp.src(paths.clientJS.files)
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest(paths.clientJS.dest));
});

gulp.task('build', ['sass', 'babel'], () => {
  // Compiling SCSS and ES6
});
