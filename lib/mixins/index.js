'use strict';

var CallTrackerMixins = require('./CallTracker');
var SpyStrategyMixins = require('./SpyStrategy');

for (var name in CallTrackerMixins) {
  jasmine.CallTracker.prototype[name] = CallTrackerMixins[name];
}

for (var name in SpyStrategyMixins) {
  jasmine.SpyStrategy.prototype[name] = SpyStrategyMixins[name];
}
