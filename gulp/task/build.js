(function(){
    var appRoot         = require("app-root-path"),
        CleanCSS        = require("less-plugin-clean-css"),
        config          = require(appRoot +"/config/config.js"),
        dependencies    = require("main-bower-files"),
        files           = require(appRoot + "/config/processable.js"),
        gulp            = require("gulp"),
        pngquant        = require("imagemin-pngquant"),
        plugins         = require("gulp-load-plugins")()
        stylish         = require("jshint-stylish");


    /*
     * Javascript
     */
    gulp.task("build:javascript:vendor:dev", () => {
        return gulp.src(dependencies({filter : "**/*.js"}))
        .pipe(plugins.concat("vendor.min.js"))
        .pipe(gulp.dest(config.target.javascript));
    });
    gulp.task("build:javascript:vendor:dist", () => {
        return gulp.src(dependencies({filter : "**/*.js"}))
            .pipe(plugins.concat("vendor.min.js"))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.target.javascript));
    });
    gulp.task("build:javascript:application:dev", () => {
        return gulp.src(files.javascript(config.source.javascript))
            .pipe(plugins.concat("application.min.js"))
            .pipe(plugins.ngAnnotate({
                single_quotes : true
            }))
            .pipe(gulp.dest(config.target.javascript));
    });
    gulp.task("build:javascript:application:dist", () => {
        return gulp.src(files.javascript(config.source.javascript))
            .pipe(plugins.concat("application.min.js"))
            .pipe(plugins.ngAnnotate({
                single_quotes : true
            }))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.target.javascript));
    });
    /*
     * JSHint
     */
    gulp.task("jshint", ["build"], () => {
        return gulp.src(javascript)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(stylish));
    });
    /*
     * Fonts
     */
    gulp.task("build:fonts:vendor", () => {
        return gulp.src(dependencies({filter : files.font}))
            .pipe(gulp.dest(config.target.font));
    });
    gulp.task("build:fonts:application", () => {
        return gulp.src(config.source.font + files.font)
            .pipe(gulp.dest(config.target.font));
    });
    /*
     * Stylesheet
     */
    gulp.task("build:stylesheet:vendor", () => {
        return gulp.src(dependencies({filter : '**/*.css'}))
            .pipe(plugins.concat('vendor.min.css'))
            .pipe(gulp.dest(config.target.stylesheet));
    });
    gulp.task("build:stylesheet:application:less", () => {
        return gulp.src(config.source.stylesheet + files.less)
            .pipe(plugins.less({
                plugins: [new CleanCSS({advanced: true})]
            }))
            .pipe(gulp.dest(config.target.stylesheet));
    });
    gulp.task("build:stylesheet:application:css", () => {
        return gulp.src(config.source + files.css)
            .pipe(plugins.concat("application-css.min.css"))
            .pipe(plugins.uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest(config.target.stylesheet));
    });
    /*
     * i18n
     */
    gulp.task("build:i18n", () => {
        return gulp.src(config.source + files.i18n)
            .pipe(plugins.jsonminify())
            .pipe(gulp.dest(config.target.root));
    });
    /*
     * Data
     */
     gulp.task("build:data", () => {
         return gulp.src(config.source + files.data)
             .pipe(plugins.jsonminify())
             .pipe(gulp.dest(config.target.root));
     });
    /*
     * Template
     */
    gulp.task("build:template", () => {
        return gulp.src(config.source.template + files.template)
            .pipe(plugins.pug({pretty : true}))
            .pipe(gulp.dest(config.target.root));
    });
    /*
     * Image
     */
    gulp.task("build:image", () => {
        return gulp.src(config.source.image + files.image)
            .pipe(plugins.imagemin({
            	progressive: true,
            	svgoPlugins: [ {removeViewBox: false} ],
            	use: [ pngquant() ]
            }))
            .pipe(gulp.dest(config.target.image));
    });

    gulp.task("default", ["build", "lint"]);

    gulp.task("dependencies", ["bower"]);
    gulp.task("build", ["build:javascript", "build:stylesheet", "build:template", "build:i18n", "build:data", "build:image", "build:font"]);
    gulp.task("build:javascript:dev", ["build:javascript-vendor", "javascript-application"]);
    gulp.task("build:javascript:dist", ["build:javascript-vendor", "javascript-application"]);
    gulp.task("stylesheet", ["stylesheet-vendor", "stylesheet-application", "stylesheet-application-css", "vendor-fonts"]);
    gulp.task("lint", ["jshint"]);
    gulp.task("watch", ["watch-dependencies-bower", "watch-javascript", "watch-stylesheet", "watch-template", "watch-copy-data", "watch-image:png", "watch-image:others"]);
    gulp.task("font", ["font-vendor", "font-application"]);
    gulp.task("image", ["image-png", "image-others"]);
})();
