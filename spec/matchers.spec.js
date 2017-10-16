var matchers = require('../');

describe('matchers', function () {
  describe('#toHaveBeenCalledWithContext', function () {
    it('throws an exception when actual is not a spy', function () {
      var expected = [
        '<toHaveBeenCalledWithContext> : Expected a spy, but got \'foo\'.',
        'Usage: expect(<spyObj>).toHaveBeenCalledWithContext(<Object>)'
      ].join('\n');

      var matcher = matchers.toHaveBeenCalledWithContext();

      expect(function() {
        matcher.compare('foo');
      }).toThrowError(Error, expected);
    });

    it('throws an exception when expected is not an object', function () {
      var expected = [
        '<toHaveBeenCalledWithContext> : The expected context failed is a required argument and must be an object.',
        'Usage: expect(<spyObj>).toHaveBeenCalledWithContext(<Object>)'
      ].join('\n');

      var matcher = matchers.toHaveBeenCalledWithContext();
      var spy = jasmine.createSpy();

      expect(function() {
        matcher.compare(spy);
      }).toThrowError(Error, expected);
    });

    it('fails when the actual was not called', function () {
      var expected = 'Expected spy unknown to have been called with Object({  }) but it was never called.';

      var matcher = matchers.toHaveBeenCalledWithContext();
      var spy = jasmine.createSpy();
      var context = {};

      var result = matcher.compare(spy, context);

      expect(result.message).toBe(expected);
    });

    it('fails when the actual was called with different context', function () {
      var expected = [
        'Expected spy unknown to have been called with context Object({ foo: \'bar\' })',
        'but actual calls were Object({ baz: \'quux\' }).'
      ].join(' ');

      var util = {
        contains: jasmine.createSpy().and.returnValue(false)
      };
      var matcher = matchers.toHaveBeenCalledWithContext(util);
      var spy = jasmine.createSpy();
      var context1 = {foo: 'bar'};
      var context2 = {baz: 'quux'};

      spy.call(context2);

      var result = matcher.compare(spy, context1);

      expect(result.message).toBe(expected);
    });

    it('fails when the actual was called with different context and args', function () {
      var expected = [
        'Expected spy unknown to have been called with context Object({ foo: \'bar\' }) and [ \'c\', \'d\' ] parameters',
        'but actual calls were Object({ foo: \'bar\' }), \'c\', \'d\'.'
      ].join(' ');

      var util = {
        contains: jasmine.createSpy().and.returnValue(false)
      };
      var customEqualityTesters = [];
      var matcher = matchers.toHaveBeenCalledWithContext(util, customEqualityTesters);
      var spy = jasmine.createSpy();
      var context1 = { foo: 'bar' };
      var context2 = { baz: 'quux' };

      spy.call(context2, 'a', 'b');

      var result = matcher.compare(spy, context1, 'c', 'd');

      expect(util.contains).toHaveBeenCalledWith(
        [
          [ { baz: 'quux' }, 'a', 'b' ]
        ],
        [ { foo: 'bar' }, 'c', 'd' ],
        []
      );
      expect(result.message).toBe(expected);
    });

    it('passes when the actual was called with matching context', function () {
      var expected = 'Expected spy unknown not to have been called with context Object({ foo: \'bar\' }) but it was.';

      var util = {
        contains: jasmine.createSpy().and.returnValue(true)
      };
      var matcher = matchers.toHaveBeenCalledWithContext(util);
      var spy = jasmine.createSpy();
      var context = { foo: 'bar' };

      spy.call(context);

      var result = matcher.compare(spy, context);

      expect(result.pass).toBe(true);
      expect(result.message).toBe(expected);
    });

    it('passes when the actual was called with matching context and args', function () {
      var expected = 'Expected spy unknown not to have been called with context Object({ foo: \'bar\' }) and [ \'a\', \'b\' ] parameters but it was.';

      var util = {
        contains: jasmine.createSpy().and.returnValue(true)
      };
      var customEqualityTesters = [];
      var matcher = matchers.toHaveBeenCalledWithContext(util, customEqualityTesters);
      var spy = jasmine.createSpy();
      var context = { foo: 'bar' };

      spy.call(context, 'a', 'b');

      var result = matcher.compare(spy, context, 'a', 'b');

      expect(util.contains).toHaveBeenCalledWith(
        [
          [ { foo: 'bar' }, 'a', 'b' ]
        ],
        [ { foo: 'bar' }, 'a', 'b' ],
        []
      );
      expect(result.message).toBe(expected);
    });

    it('passes through the custom equality testers', function() {
      var util = {
        contains: jasmine.createSpy().and.returnValue(true)
      };
      var customEqualityTesters = [function() { return true; }];
      var matcher = matchers.toHaveBeenCalledWithContext(util, customEqualityTesters);
      var spy = jasmine.createSpy();
      var context = {foo: 'bar'};

      spy.call(context);

      matcher.compare(spy, context);

      expect(util.contains).toHaveBeenCalledWith([{foo: 'bar'}], {foo: 'bar'}, customEqualityTesters);
    });
  });
});

