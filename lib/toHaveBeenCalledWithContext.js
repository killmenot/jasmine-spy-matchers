'use strict';

module.exports = function (util, customEqualityTesters) {
  var getErrorMsg = jasmine.formatErrorMsg('<toHaveBeenCalledWithContext>', 'expect(<spyObj>).toHaveBeenCalledWithContext(<Object>)');
  var pp = jasmine.pp;

  function map(array, fn) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(fn(array[i]));
    }
    return results;
  }

  function getCallContext(call) { return call.object; }

  function getContextWithArgs(call) { return [call.object].concat(call.args); }

  return {
    compare: function (actual, expected) {
      var result = { pass: false };
      var args = Array.prototype.slice.call(arguments, 0);
      var expectedArgs = args.slice(2);

      if (!jasmine.isSpy(actual)) {
        throw new Error(getErrorMsg('Expected a spy, but got ' + pp(actual) + '.'));
      }

      if (!jasmine.isObject_(expected)){
        throw new Error(getErrorMsg('The expected context failed is a required argument and must be an object.'));
      }

      if (!actual.calls.any()) {
        result.message = 'Expected spy ' + actual.and.identity() + ' to have been called with ' + pp(expected) + ' but it was never called.';
        return result;
      }

      var contexts = map(actual.calls.all(), getCallContext);

      if (expectedArgs.length === 0) {
        if (util.contains(contexts, expected, customEqualityTesters)) {
          result.pass = true;
          result.message = 'Expected spy ' + actual.and.identity() + ' not to have been called with context ' + pp(expected) + ' but it was.';
        } else {
          result.message = 'Expected spy ' + actual.and.identity() + ' to have been called with context ' + pp(expected) + ' but actual calls were ' + pp(contexts).replace(/^\[ | \]$/g, '') + '.';
        }

        return result;
      }

      var contextsWithArgs = map(actual.calls.all(), getContextWithArgs);
      var expectedContextAndArgs = [expected].concat(expectedArgs);

      if (util.contains(contextsWithArgs, expectedContextAndArgs, customEqualityTesters)) {
        result.pass = true;
        result.message = 'Expected spy ' + actual.and.identity() + ' not to have been called with context ' + pp(expected) + ' and ' + pp(expectedArgs) + ' parameters but it was.';
      } else {
        result.message = 'Expected spy ' + actual.and.identity() + ' to have been called with context ' + pp(expected) + ' and ' + pp(expectedArgs) + ' parameters but actual calls were ' + pp(expectedContextAndArgs).replace(/^\[ | \]$/g, '') + '.';
      }

      return result;
    }
  };
}
