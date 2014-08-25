var through = require('through2');
var File = require('vinyl');
var BH = require('bh').BH;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function (bemjson, fileName, options) {
    options = options || {};
    var bh = new BH();
    bh.setOptions(options);

    var cache = {};
    for (var key in require.cache) {
        cache[key] = true;
    }

    function clearCache() {
        for (var key in require.cache) {
            if (!cache[key]) {
                delete require.cache[key];
            }
        }
    }

    function apply(obj, enc, cb) {
        try {
            clearCache();
            require(obj.path)(bh);
            cb(null);
        } catch (err) {
            return cb(new PluginError('gulp-bh', err));
        }
    }

    function compile() {
        var outputFile;

        try {
            outputFile = new File({
                base: '',
                cwd: '',
                path: fileName,
                contents: new Buffer(bh.apply(bemjson))
            });
        } catch (err) {
            this.emit('error', new PluginError('gulp-bh', err));
        }

        this.emit('data', outputFile);
        this.emit('end');
    }

    var rs = through.obj(apply, compile);

    return rs;
};
