# jasmine-spy-matchers

[![Build Status](https://travis-ci.org/killmenot/jasmine-spy-matchers.svg?branch=master)](https://travis-ci.org/killmenot/jasmine-spy-matchers) [![Coverage Status](https://coveralls.io/repos/github/killmenot/jasmine-spy-matchers/badge.svg?branch=master)](https://coveralls.io/github/killmenot/jasmine-spy-matchers?branch=master)

Additional spy matchers and extensions for the [Jasmine][] BDD JavaScript testing library


## Getting Started

Get a release tarball, or clone the repository, or use [npm][]

```
npm install jasmine-spy-matchers --save-dev
```


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