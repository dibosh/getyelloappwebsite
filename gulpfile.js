var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('reload', function() {
  connect.reload();
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.css', ['reload']);
  gulp.watch('js/**/*.js', ['reload']);
  gulp.watch(['./**/*.html', './index.html'], ['reload']);
})

gulp.task('default', ['webserver', 'watch']);