(function () {
    "use strict";

    // Libraries to import
    var config       = require("./config/config"),
        fs           = require("fs"),
        gulp         = require("gulp"),
        path         = require("path"),
        plugins      = require("gulp-load-plugins")();



        /*,
        bower        = require("gulp-bower"),

        jshint       = require("gulp-jshint"),
        concat       = require("gulp-concat"),
        rimraf       = require("rimraf"),
        uglify       = require("gulp-uglify"),
        jsonminify   = require("gulp-jsonminify"),
        ngAnnotate   = require("gulp-ng-annotate"),
        less         = require("gulp-less"),
        pug          = require("gulp-pug"),
        stylish      = require("jshint-stylish"),

        imagemin     = require("gulp-imagemin"),
        ,
        webserver    = require("gulp-webserver"),
        uglifycss    = require("gulp-uglifycss"),
        directory    = require("./gulp/directory");*/

    const TASKS_DIR = './gulp/task';

    let tasks = fs.readdirSync(path.resolve(TASKS_DIR));
    for(let taskFile of tasks){
        require(TASKS_DIR+"/"+taskFile);
    }





}());
