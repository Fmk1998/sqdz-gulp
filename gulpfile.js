var gulp = require('gulp');

// 在命令行设置为生产环境或者开发环境
//开发环境不要使用压缩，会影响找错
// windows: set NODE_ENV = development 或 production
//（可能会有问题， 建议使用 :var environment = process.env.NODE_ENV || 'development';）
// mac  linux : export NODE_ENV = development 或 production

var environment = process.env.NODE_ENV || 'development';

//根据自己开发的实际需求自行设置， src放开发文件， dist是打包压缩后的导出目录
const folder = {
    gsrc: 'src/',
    src: 'src/vw_home/',
    // dist: 'D:\\WORK\\para-node\\webapp\\csvw\\'
    dist: 'dist/' //
};

// 压缩html代码
const htmlClean = require('gulp-htmlclean');

// 图片类： 压缩PNG, JPEG, GIF and SVG
const imageMin = require('gulp-imagemin');

// uglify 不支持压缩 es6 ， 需要先使用babel降级才行 */
const uglifyJS = require('gulp-uglify');
//es6 降级到es5    请使用  "gulp-babel": "^7.0.1",
//切记不要用 8版本， 会出现无法输出的情况
const babel = require('gulp-babel');
//去除掉 注释， console 和 debugger
const removeComments = require('gulp-strip-debug');

//less 转 css
const less = require('gulp-less');
//css3 兼容各类浏览器脚本
const postCss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');
//css代码压缩
const cleanCss = require('gulp-clean-css');

//创建服务器环境插件 支持热更新
const connect = require('gulp-connect');

gulp.task('html', function () {
    const step = gulp.src(folder.src + '/*')
        .pipe(connect.reload());
    if (environment == 'production') {
        step.pipe(htmlClean());
    }
    step.pipe(gulp.dest(folder.dist + '/'));
});

gulp.task('img', function () {
    gulp.src(folder.src + 'img/**')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'img/'));
});

gulp.task('css', function () {
    var step = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoPrefixer()]));
    if (environment == 'production') {
        step.pipe(cleanCss());
    }
    step.pipe(gulp.dest(folder.dist + 'css/'));
});
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js', function () {
    var b = browserify({
        entries: folder.gsrc + 'js/index.js',
        debug: true,
        transform: [babelify.configure({
            presets: ['@babel/env'],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        'absoluteRuntime': false,
                        'corejs': false,
                        'helpers': true,
                        'regenerator': true,
                        'useESModules': false,
                        'version': '7.0.0-beta.0'
                    }
                ]
            ]
        })]
    });
    var step = b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(connect.reload());
    if (environment == 'production') {
        step.pipe(removeComments())
            .pipe(uglifyJS());
    }
    step.pipe(gulp.dest(folder.dist + 'js/'));
});

gulp.task('server', function () {
    //设置默认服务器接口， livereload: true 是否监视文件变化
    connect.server({
        port: 7789,
        livereload: true
    });
});

//自动刷新页面
gulp.task('watch', () => {
    gulp.watch(folder.src + '*.html', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.gsrc + 'js/**', ['js']);
    gulp.watch(folder.gsrc + 'img/**', ['img']);
});

gulp.task('default', ['html', 'img', 'css', 'js', 'server', 'watch']);
// default任务一定要写，不然会报警告： Task 'default' is not in your gulpfile
// 数组中写哪一个执行哪一个任务， 从左到右执行
