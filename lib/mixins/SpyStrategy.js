'use strict';

module.exports = {

  /**
   * Tell the spy to resolve the value when invoked.
   * @name SpyStrategy#resolveValue
   * @function
   * @param {*} value The value to resolve.
   */
  resolveValue: function(value) {
    this.plan = function() {
      return Promise.resolve(value);
    };

    return this.getSpy();
  },

  /**
   * Tell the spy to reject the value when invoked.
   * @name SpyStrategy#rejectValue
   * @function
   * @param {*} value The value to reject.
   */
  rejectValue: function(value) {
    this.plan = function() {
      return Promise.reject(value);
    };

    return this.getSpy();
  },

  /**
   * Tell the spy to resolve one of the specified values (sequentially) each time the spy is invoked.
   * @name SpyStrategy#resolveValues
   * @function
   * @param {...*} values - Values to be resolved on subsequent calls to the spy.
   */
  resolveValues: function() {
    var values = Array.prototype.slice.call(arguments);
    this.plan = function () {
      return Promise.resolve(values.shift());
    };

    return this.getSpy();
  },

  /**
   * Tell the spy to reject one of the specified values (sequentially) each time the spy is invoked.
   * @name SpyStrategy#returnValues
   * @function
   * @param {...*} values - Values to be rejected on subsequent calls to the spy.
   */
  rejectValues: function() {
    var values = Array.prototype.slice.call(arguments);
    this.plan = function () {
      return Promise.reject(values.shift());
    };

    return this.getSpy();
  }
}
