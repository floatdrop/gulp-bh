# gulp-bh

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Plugin, that fetches `*.bh.js` files and renders bemjson. This is just a wrapper around [BH](https://github.com/enb-make/bh), all questions about BH should go there.

## Usage

```js
var gulp = require('gulp');
var bh = require('gulp-bh');

var bemjson = {
    block: 'page',
    tag: 'html',
    content: '<h1>Hello world!</ht>'
};

gulp.src('*.bh.js')
    .pipe(bh(bemjson, 'index.html'))
    .pipe(gulp.dest('./dist'));
```

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/gulp-bh
[npm-image]: http://img.shields.io/npm/v/gulp-bh.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/gulp-bh
[travis-image]: http://img.shields.io/travis/floatdrop/gulp-bh.svg?branch=master&style=flat

[depstat-url]: https://david-dm.org/floatdrop/gulp-bh
[depstat-image]: http://img.shields.io/david/floatdrop/gulp-bh.svg?style=flat
