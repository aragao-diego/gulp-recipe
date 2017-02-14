(function(){
    var appRoot     = require("app-root-path"),
        gulp        = require("gulp"),
        config      = require(appRoot +"/config/config.js"),
        plugins     = require("gulp-load-plugins")(),
        files       = require(appRoot + "/config/processable.js");

    gulp.task("watch:bower", () => gulp.watch("bower.json", ["build:application"]));
    gulp.task("watch:data", () => gulp.watch(config.source + files.data, ["build:data"]));
    gulp.task("watch:i18n", () => gulp.watch(config.source + files.i18n, ["build:i18n"]));
    gulp.task("watch:image", () => gulp.watch(config.source.image + files.image, ["build:image"]));
    gulp.task("watch:javascript", () => gulp.watch(files.javascript(config.source.javascript), ["build:javascript-application"]));
    gulp.task("watch:stylesheet", () => gulp.watch(config.source.stylesheet + files.stylesheet, ["build:stylesheet-application"]));
    gulp.task("watch:template", () => gulp.watch(config.source.template + files.template, ["build:template"]));

    gulp.task("watch", ["watch:bower", "watch:data", "watch:i18n", "watch:image", "watch:javascript", "watch:stylesheet", "watch:template"]);
})()
