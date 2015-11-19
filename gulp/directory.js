module.exports = (function () {
        var source = (function () {
            var root = 'source/',
                assets = function () {
                    return root + 'assets/';
                },
                javascript = function () {
                    return assets() + 'javascript/';
                },
                less = function () {
                    return assets() + 'less/';
                },
                jade = function () {
                    return root + 'jade/';
                };

            return {
                root : root,
                assets : assets(),
                javascript :  javascript(),
                less :  less(),
                jade : jade()
            };
        }()),
            target = (function () {
                var root = 'target/',
                    assets = function () {
                        return root + 'assets/';
                    },
                    javascript = function () {
                        return assets() + 'javascript/';
                    },
                    stylesheet = function () {
                        return assets() + 'stylesheet/';
                    };
                return {
                    root :  root,
                    assets :  assets(),
                    javascript : javascript(),
                    stylesheet : stylesheet()
                };
            }());

        return {
            source : source,
            target : target
        };
}());
