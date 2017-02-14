(function(){
    var appRoot     = require("app-root-path"),
        gulp        = require("gulp"),
        config      = require(appRoot + "/config/config.js"),
        plugins     = require("gulp-load-plugins")(),
        files       = require(appRoot + "/config/processable.js");

    var server;

    gulp.task("server", function() {
        server = gulp.src("dist")
            .pipe(plugins.webserver({
                livereload: true,
                directoryListing: true,
                open: false
            }));
    });
})()
