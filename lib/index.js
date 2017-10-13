'use strict';

var matchers = {
  toHaveBeenCalledWithContext: require('./toHaveBeenCalledWithContext')
};

beforeEach(function () {
  jasmine.addMatchers(matchers);
});

module.exports = matchers;
