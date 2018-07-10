'use strict';

require('./mixins');

var matchers = {
  toHaveBeenCalledWithContext: require('./matchers/toHaveBeenCalledWithContext'),
  toHaveBeenDone: require('./matchers/toHaveBeenDone')
};

beforeEach(function () {
  jasmine.addMatchers(matchers);
});

module.exports = matchers;
