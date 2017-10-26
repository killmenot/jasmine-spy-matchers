'use strict';

var mixins = require('../../lib/mixins/CallTracker');

describe('CallTrackerMixins', function () {
  var calls;

  beforeEach(function () {
    calls = jasmine.createSpyObj('calls', ['all']);
  });

  describe('#thisArgFor', function () {
    it('should return null', function () {
      calls.all.and.returnValue([]);

      var actual = mixins.thisArgFor.call(calls, 0);

      expect(calls.all).toHaveBeenCalled();
      expect(actual).toBe(null);
    });

    it('should return this arg for call', function () {
      var thisArg = { foo: 'bar' };
      var call = { object: thisArg };

      calls.all.and.returnValue([call]);

      var actual = mixins.thisArgFor.call(calls, 0);

      expect(calls.all).toHaveBeenCalled();
      expect(actual).toBe(thisArg);
    });
  });

  describe('#at', function () {
    it('should return specific call', function () {
      var call = {};
      calls.all.and.returnValue([call]);

      var actual = mixins.at.call(calls, 0);

      expect(calls.all).toHaveBeenCalled();
      expect(actual).toBe(call);
    });
  });
});
