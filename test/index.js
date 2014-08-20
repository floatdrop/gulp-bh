/* global it */

var bh = require('../index.js');
require('should');

it('should render bemjson', function (done) {
    var stream = bh({
        block: 'page',
        tag: 'html',
        content: '<h1>Hello world!</h1>'
    }, 'index.html');

    stream.on('data', function (file) {
        file.contents.toString().should.eql('<html class=\"page\"><h1>Hello world!</h1></html>');
        done();
    });

    stream.end();
});
