module.exports = (function () {
    "use strict";
        var source = (function () {
            var root = "app/",
                assets = function () {
                    return root + "assets/";
                },
                javascript = function () {
                    return root;
                },
                less = function () {
                    return assets() + "less/";
                },
                pug = function () {
                    return root;
                },
                image = function () {
                    return assets() + "img/";
                };

            return {
                root : root,
                assets : assets(),
                javascript :  javascript(),
                less :  less(),
                pug : pug(),
                image : image()
            };
        }()),
            target = (function () {
                var root = "dist/",
                    assets = function () {
                        return root + "assets/";
                    },
                    javascript = function () {
                        return assets() + "javascript/";
                    },
                    stylesheet = function () {
                        return assets();
                    },
                    image = function () {
                        return assets() + "img/";
                    };

                return {
                    root :  root,
                    assets :  assets(),
                    javascript : javascript(),
                    stylesheet : stylesheet(),
                    image : image()
                };
            }());

        return {
            source : source,
            target : target
        };
}());
