var through = require('through2');
var File = require('vinyl');
var BH = require('bh').BH;

module.exports = function (bemjson, fileName, options) {
    options = options || {};
    var bh = new BH();

    function apply(obj, enc, cb) {
        require(obj.path)(bh);
        cb(null);
    }

    function compile() {
        var outputFile = new File({
            base: '',
            cwd: '',
            path: fileName,
            contents: new Buffer(bh.apply(bemjson))
        });

        this.emit('data', outputFile);
        this.emit('end');
    }

    var rs = through.obj(apply, compile);

    return rs;
};
