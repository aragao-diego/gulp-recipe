(function () {
    "use strict";

    // Libraries to import
    var fs           = require("fs"),
        gulp         = require("gulp"),
        bower        = require("gulp-bower"),
        dependencies = require("main-bower-files"),
        jshint       = require("gulp-jshint"),
        concat       = require("gulp-concat"),
        rimraf       = require("rimraf"),
        uglify       = require("gulp-uglify"),
        jsonminify   = require("gulp-jsonminify"),
        ngAnnotate   = require("gulp-ng-annotate"),
        less         = require("gulp-less"),
        pug          = require("gulp-pug"),
        stylish      = require("jshint-stylish"),
        CleanCSS     = require("less-plugin-clean-css"),
        imagemin     = require("gulp-imagemin"),
        pngquant     = require("imagemin-pngquant"),
        webserver    = require('gulp-webserver'),
        uglifycss    = require('gulp-uglifycss'),
        directory    = require("./gulp/directory"),
        javascript   = [
            directory.source.javascript + "*-module.js",
            directory.source.javascript + "*-!(module).js",
            directory.source.javascript + "modules/*/*-module.js",
            directory.source.javascript + "modules/*/*/*-+(controller|filter|directive|service|config|routes).js"
        ],
        css = [
            directory.source.root + 'assets/*.css',
            directory.source.root + 'modules/*/assets/*.css'
        ];

    // Install dependencies
    gulp.task("bower", () => {
        try {
            var stats = fs.statSync("./bower");
            return bower({ cmd : "install"});
        } catch (e) {
            return bower({ cmd : "update"});
        }
    });

    // Concat all vendor javascript files, removes the debug informations and
    // reruns the uglify on minimified files
    gulp.task("javascript-vendor", () => {
        let files = dependencies({filter : "**/*.js"});
        console.log(files);

        return gulp.src(files)
            .pipe(concat("vendor.min.js"))
            .pipe(uglify())
            .pipe(gulp.dest(directory.target.javascript));
    });

    // Concat all application javascript files, removes the debug informations and
    // reruns the uglify on minimified files
    gulp.task("javascript-application", () => {
        return gulp.src(javascript)
            .pipe(concat("application.min.js"))
            .pipe(ngAnnotate({
                single_quotes : true
            }))
            //.pipe(uglify())
            .pipe(gulp.dest(directory.target.javascript));
    });

    gulp.task("jshint", ["build"], () => {
        return gulp.src(javascript)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    });

    gulp.task("vendor-fonts", () => {
        return gulp.src(dependencies({filter : "**/*.(eot|woff2?|ttf|svg)"}))
            .pipe(gulp.dest(directory.target.assets + "fonts"));
    });

    gulp.task("stylesheet-vendor", () => {
        return gulp.src(dependencies({filter : '**/*.css'}))
            .pipe(concat('vendor.min.css'))
            .pipe(gulp.dest(directory.target.stylesheet));
    });

    gulp.task("stylesheet-application", () => {
        return gulp.src(directory.source.less + "application.less")
            .pipe(less({
                plugins: [new CleanCSS({advanced: true})]
            }))
            .pipe(gulp.dest(directory.target.stylesheet));
    });

    gulp.task("stylesheet-application-css", () => {
        return gulp.src(css)
            .pipe(concat("application-css.min.css"))
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest(directory.target.stylesheet));
    });

    gulp.task("copy-data", () => {
        var dataFiles = [
            directory.source.javascript + "application/i18n/*.json",
            directory.source.javascript + "application/data/*.json",
        ];

        return gulp.src(dataFiles)
            .pipe(jsonminify())
            .pipe(gulp.dest(directory.target.root + "data"));
    });

    gulp.task("template", () => {
        return gulp.src(directory.source.pug + "**/*.pug")
            .pipe(pug({pretty : true}))
            .pipe(gulp.dest(directory.target.root));
    });

    gulp.task("image", () => {
        return gulp.src(directory.source.image + "*.png")
            .pipe(imagemin({
            	progressive: true,
            	svgoPlugins: [ {removeViewBox: false} ],
            	use: [ pngquant() ]
            }))
            .pipe(gulp.dest(directory.target.image));
    });

    var server;
    gulp.task('webserver', function() {
        server = gulp.src('dist')
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: false
        }));
    });



    /**
     * Watchers
     */
    gulp.task("watch-template", () => {
        return gulp.watch(directory.source.pug + "**/*.pug", ["template"]);
    });

    gulp.task("watch-copy-data", () => {
        var dataFiles = [
            directory.source.javascript + "application/i18n/*.json",
            directory.source.javascript + "application/data/*.json",
        ];

        return gulp.watch(dataFiles, ["copy-data"]);
    });

    gulp.task("watch-dependencies-bower", () => {
        return gulp.watch("bower.json", ["bower", "javascript-vendor", "stylesheet-vendor"]);
    });

    gulp.task("watch-javascript", () => {
        return gulp.watch(directory.source.javascript + "**/**/*.js", ["javascript-application"]);
    });

    gulp.task("watch-stylesheet", () => {
        return gulp.watch(directory.source.less + "**/*", ["stylesheet-application"]);
    });

    gulp.task("watch-image", () => {
        return gulp.watch(directory.source.image + "*.png", ["image"]);
    });

    gulp.task("default", ["build", "lint"]);
    gulp.task("dependencies", ["bower"]);
    gulp.task("build", ["javascript", "stylesheet", "template", "copy-data", "image"]);
    gulp.task("javascript", ["javascript-vendor", "javascript-application"]);
    gulp.task("stylesheet", ["stylesheet-vendor", "stylesheet-application", "stylesheet-application-css", "vendor-fonts"]);
    gulp.task("lint", ["jshint"]);
    gulp.task("watch", ["watch-dependencies-bower", "watch-javascript", "watch-stylesheet", "watch-template", "watch-copy-data"]);
}());
