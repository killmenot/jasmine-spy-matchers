'use strict';

require('./mixins');

var matchers = {
  toHaveBeenCalledWithContext: require('./matchers/toHaveBeenCalledWithContext')
};

beforeEach(function () {
  jasmine.addMatchers(matchers);
});

module.exports = matchers;
