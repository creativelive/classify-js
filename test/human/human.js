'use strict';

var classify = require('../../');

var Mammal = require('./mammal');

var Human = classify({
  name: 'Human',
  inherits: [Mammal],
  initialize: function(options) {
    this.language = options.language;
  },
  instanceMethods: {
    speak: function() {
      return 'I speak ' + this.language;
    },
    die: function() {
      Human.recordDeath();
      return 'croak';
    }
  }
});

module.exports = Human;
