var through = require('through2');
var File = require('vinyl');
var BH = require('bh').BH;
var path = require('path');

module.exports = function (bemjson, fileName, options) {
    options = options || {};
    var bh = new BH();
    var firstFile;

    function apply(obj, enc, cb) {
        firstFile = obj;
        require(obj.path)(bh);
        cb(null);
    }

    function compile() {
        if (!firstFile) {
            firstFile = {
                base: path.dirname(process.cwd()),
                cwd: process.cwd()
            };
        }

        var outputFile = new File({
            path: path.join(firstFile.base, fileName),
            contents: new Buffer(bh.apply(bemjson))
        });

        this.emit('data', outputFile);
        this.emit('end');
    }

    var rs = through.obj(apply, compile);

    return rs;
};
