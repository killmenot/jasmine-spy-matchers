'use strict';

var mixins = require('../../lib/mixins/SpyStrategy');

describe('SpyStrategyMixins', function () {
  var spyStrategy;

  beforeEach(function () {
    spyStrategy = jasmine.createSpyObj('spyStrategy', ['getSpy']);
    spyStrategy.getSpy.and.returnValue('spy');
  });

  describe('#resolveValue', function () {
    it('should resolve value', function (done) {
      var actual = mixins.resolveValue.call(spyStrategy, 'foo');

      spyStrategy.plan().then(function (value) {
        expect(actual).toBe('spy');
        expect(value).toBe('foo');

        done();
      });
    });
  });

  describe('#rejectValue', function () {
    it('should reject value', function (done) {
      var actual = mixins.rejectValue.call(spyStrategy, 'bar');

      spyStrategy.plan().catch(function (value) {
        expect(actual).toBe('spy');
        expect(value).toBe('bar');

        done();
      });
    });
  });

  describe('#resolveValues', function () {
    it('should resolve multiple values', function (done) {
      var actual = mixins.resolveValues.call(spyStrategy, 'foo', 'baz');

      Promise.all([
        spyStrategy.plan(),
        spyStrategy.plan()
      ]).then(function (values) {
        expect(actual).toBe('spy');
        expect(values).toEqual(['foo', 'baz']);

        done();
      });
    });
  });

  describe('#rejectValues', function () {
    it('should reject multiple values', function (done) {
      var actual = mixins.rejectValues.call(spyStrategy, 'bar', 'quux');

      expect(actual).toBe('spy');

      spyStrategy.plan().catch(function (value1) {
        expect(value1).toEqual('bar');

        spyStrategy.plan().catch(function (value2) {
          expect(value2).toEqual('quux');

          done();
        });
      });
    });
  });
});
