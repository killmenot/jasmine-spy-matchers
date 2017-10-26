'use strict';

module.exports = {

  /**
   * Get the this that were passed to a specific invocation of this spy.
   *
   * @name Spy#calls#thisArgFor
   * @function
   * @param {Integer} index The 0-based invocation index.
   * @return {Object}
   */
  thisArgFor: function(index) {
    var calls = this.all();
    var call = calls[index];

    return call ? call.object : null;
  },

  /**
   * Get the specific invocation of this spy.
   *
   * @name Spy#calls#at
   * @function
   * @param {Integer} index The 0-based invocation index.
   * @return {Spy.callData}
   */
  at: function(index) {
    var calls = this.all();

    return calls[index];
  }
}
