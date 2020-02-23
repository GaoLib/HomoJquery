var gulp = require('gulp');
var concat = require('gulp-concat');
var press = require('gulp-uglify');


// 合并文件
gulp.task('cat', function(done){
    // gulp.src('./js/*.js')
    gulp.src(['./js/index.js','./js/dom.js','./js/ctor.js','./js/event.js','./js/style.js','./js/attr.js'])
    .pipe(concat('Jquery.js'))
    .pipe(gulp.dest('./dist'));
    done();
})

gulp.task('miniCat', function(done){
    return gulp.src(['./js/index.js','./js/dom.js','./js/ctor.js','./js/event.js','./js/style.js','./js/attr.js'])
    .pipe(concat('Jquery.min.js'))
    .pipe(gulp.dest('./dist'));
    done();
})

// 压缩  gulp3
// gulp.task('default',['cat','miniCat'], function(done){
//     gulp.src('./dist/Jquery.min.js')
//     .pipe(press())
//     .pipe(gulp.dest('./dist'));
//     done();
// })

// gulp 4
gulp.task('default',gulp.series('cat','miniCat',function(done){
    gulp.src('./dist/Jquery.min.js')
    .pipe(press())
    .pipe(gulp.dest('./dist'));
    done();
}))