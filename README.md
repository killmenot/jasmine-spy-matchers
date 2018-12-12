# jasmine-spy-matchers

[![Build Status](https://travis-ci.org/killmenot/jasmine-spy-matchers.svg?branch=master)](https://travis-ci.org/killmenot/jasmine-spy-matchers)
[![Coverage Status](https://coveralls.io/repos/github/killmenot/jasmine-spy-matchers/badge.svg?branch=master)](https://coveralls.io/github/killmenot/jasmine-spy-matchers?branch=master)
[![Dependency Status](https://david-dm.org/killmeont/jasmine-spy-matchers.svg)](hhttps://david-dm.org/killmenot/jasmine-spy-matchers)
[![npm version](https://img.shields.io/npm/v/jasmine-spy-matchers.svg)](https://www.npmjs.com/package/jasmine-spy-matchers)

Additional spy matchers and extensions for the [Jasmine][] BDD JavaScript testing library

## Getting Started

Get a release tarball, or clone the repository, or use [npm][]

```
npm install jasmine-spy-matchers --save-dev
```

> **NOTE**: If you use jasmine 2.x, you need to use 1.x versions of jasmine-spy-matchers


## Usage

```js
require('jasmine-spy-matchers');
```


## Jasmine Matchers

### toHaveBeenCalledWithContext()

```js
describe('#toHaveBeenCalledWithContext', function () {
  it('should work with context', function() {
    var context = {foo: 'bar'};
    var fn = jasmine.createSpy();

    fn.call(context);

    expect(fn).toHaveBeenCalledWithContext(context);
  });

  it('should work with context and parameters', function() {
    var context = {foo: 'bar'};
    var fn = jasmine.createSpy();

    fn.call(context, 'baz', 'quux');

    expect(fn).toHaveBeenCalledWithContext(context, 'baz', 'quux');
  });
});
```

### toHaveBeenDone()

Read more about nock: https://github.com/nock/nock
```js
var http = require('http');
var nock = require('nock');

describe('#toHaveBeenDone', function () {
  it('should work with nock expectation', function(done) {
    nock('http://example.org')
      .post('/rest/v1/foo')
      .reply(200, 'ok');

    var options = {
      hostname: 'example.org',
      path: '/rest/v1/foo'
    };

    http.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('end', function () {
        expect(nock).toHaveBeenDone();
      });
    });
  });
});
```


## Jasmine Spy#calls extensions

### thisArgFor(index)

```js
describe('#thisArgFor', function () {
  it('should work', function() {
    var context = {foo: 'bar'};
    var fn = jasmine.createSpy();

    fn.call(context);

    expect(fn.calls.thisArgFor(0)).toBe(context);
  });
});
```

### at(index)

```js
describe('#at', function () {
  it('should work', function() {
    var context1 = { foo: 'bar' };
    var context2 = { baz: 'quux' };
    var fn = jasmine.createSpy();

    fn.call(context1, 'a', 'b');
    fn.call(context2. 'c', 'd');

    expect(fn.calls.at(1).args).toEqual(['c', 'd']);
  });
});
```

## Jasmine SpyStrategy extensions

### resolveValue(value)

```js
describe('#resolveValue', function () {
  it('should work', function(done) {
    var spy = jasmine.createSpy();

    spy.and.resolveValue('foo');

    spy.then(function (value) {
      expect(value).toBe('foo');
      done();
    });
  });
});
```

### rejectValue(value)

```js
describe('#rejectValue', function () {
  it('should work', function(done) {
    var spy = jasmine.createSpy();

    spy.and.rejectValue('bar');

    spy.catch(function (value) {
      expect(value).toBe('bar');
      done();
    });
  });
});
```

### resolveValues(value1, value2)

```js
describe('#resolveValues', function () {
  it('should work', function(done) {
    var spy = jasmine.createSpy();

    spy.and.resolveValues('foo', 'bar');

    Promise.all([
      spy(),
      spy()
    ]).then(function (values) {
      expect(values).toEqual(['foo', 'bar']);
      done();
    });
  });
});
```

### rejectValues(value1, value2)

```js
describe('#rejectValues', function () {
  it('should work', function(done) {
    var spy = jasmine.createSpy();

    spy.and.rejectValues('foo', 'bar');

    spy.catch(function (value1) {
      spy.catch(function (value2) {
        expect(value1).toBe('foo');
        expect(value2).toBe('bar');
        done();
      });
    });
  });
});
```


## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 [Jasmine]: <http://jasmine.github.io/> "Jasmine — Behavior-Driven JavaScript"
 [npm]: <https://github.com/npm/npm> "npm — A package manager for JavaScript"