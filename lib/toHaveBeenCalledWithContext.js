'use strict';

module.exports = function (util, customEqualityTesters) {
  var getErrorMsg = jasmine.formatErrorMsg('<toHaveBeenCalledWithContext>', 'expect(<spyObj>).toHaveBeenCalledWithContext(<Object>)');

  function map(array, fn) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(fn(array[i]));
    }
    return results;
  }

  function getCallObject(call) { return call.object; }

  return {
    compare: function (actual, expected) {
      var result = { pass: false };

      if (!jasmine.isSpy(actual)) {
        throw new Error(getErrorMsg('Expected a spy, but got ' + jasmine.pp(actual) + '.'));
      }

      if (!jasmine.isObject_(expected)){
        throw new Error(getErrorMsg('The expected context failed is a required argument and must be an object.'));
      }

      if (!actual.calls.any()) {
        result.message = 'Expected spy ' + actual.and.identity() + ' to have been called with ' + jasmine.pp(expected) + ' but it was never called.';
        return result;
      }

      var objects = map(actual.calls.all(), getCallObject);

      if (util.contains(objects, expected, customEqualityTesters)) {
        result.pass = true;
        result.message = 'Expected spy ' + actual.and.identity() + ' not to have been called with context ' + jasmine.pp(expected) + ' but it was.';
      } else {
        result.message = 'Expected spy ' + actual.and.identity() + ' to have been called with context ' + jasmine.pp(expected) + ' but actual calls were ' + jasmine.pp(objects).replace(/^\[ | \]$/g, '') + '.';
      }

      return result;
    }
  };
}
