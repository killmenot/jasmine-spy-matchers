'use strict';

var CallTrackerMixins = require('./CallTracker');

for (var name in CallTrackerMixins) {
  jasmine.CallTracker.prototype[name] = CallTrackerMixins[name];
}
