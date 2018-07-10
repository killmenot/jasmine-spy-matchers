'use strict';

 /**
 * {@link expect} the actual (a nock scope) to determine if the expectation was met.
 * @function
 * @name matchers#toHaveBeenDone
 * @example
 * expect(scope).toHaveBeenDone();
 */
function toHaveBeenDone() {
  var getErrorMsg = jasmine.formatErrorMsg('<toHaveBeenDone>', 'expect(<scopeObj>).toHaveBeenDone()');
  var pp = jasmine.pp;

  return {
    compare: function (actual) {
      var result = { pass: false };

      if (!actual.isDone) {
        throw new Error(getErrorMsg('Expected a nock scope, but got ' + pp(actual) + '.'));
      }

      if (actual.basePath) {
        var key = actual.interceptors[0]._key;
        if (actual.isDone()) {
          result.pass = true;
          result.message = 'Expected nock scope expectation "' + key + '" not to have been done but it was.';
        } else {
          result.message = 'Expected nock scope expectation "' + key + '" to have been done but it was never done.';
        }

        return result;
      }

      if (actual.isDone()) {
        result.pass = true;
        result.message = 'Expected nock expectations to have not been done but they were done.';
      } else {
        result.message = 'Expected nock expectations to have been done but they were never done.';
      }

      return result;
    }
  };
}

module.exports = toHaveBeenDone;
