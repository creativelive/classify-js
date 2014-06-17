'use strict';

var Classical = require('./classical.js');

module.exports = function classify(options) {
  var classical = new Classical(options);

  return classical.createClass();
};
