module.exports = {
    data: "**/data/*.json",
    i18n: "**/i18n/*.json",
    image: "**/*.+(png|jpeg|jpg|gif)",
    font: "**/*.+(eot|woff2?|ttf|svg)",
    javascript: (target) => [
        target + "*-module.js",
        target + "*-!(module).js",
        target + "modules/*/*-module.js",
        target + "modules/*/*/*-+(controller|filter|directive|service|config|routes).js"
    ],
    stylesheet: ["**/*.less", "**/*.css"],
    less: "**/*.less",
    css: "**/*.css",
    template: "**/*.pug",

}
