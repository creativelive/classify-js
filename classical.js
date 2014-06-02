'use strict';

var _ = require('underscore');
var util = require('util');

function defaultInitialize(options) {
  _.extend(this, options);
}

var Classical = function(options) {
  Classical.validateOptions(options);
  this.name = options.name || 'DefaultClass';
  this.inherits = options.inherits || [];
  this.initialize = options.initialize || defaultInitialize;
  this.classMethods = options.classMethods || {};
  this.instanceMethods = options.instanceMethods || {};
};

// Class Methods.
_.extend(Classical, {
  toString: function() {
    return util.inspect(this);
  },

  validateOptions: function(options) {
    var self = this;

    _.each(options, function(value, key) {
      var desiredType = self.validOptions[key];

      if (!desiredType) {
        throw new Error('Option ' + key + ' not in ' + _.keys(self.validOptions).join(','));
      }
      if (typeof value !== desiredType) {
        throw new Error('Option ' + key + ' expected ' + desiredType);
      }
    });
  },

  validOptions: {
    name: 'string',
    inherits: 'object',
    initialize: 'function',
    classMethods: 'object',
    instanceMethods: 'object'
  },

  makeInitializer: function(classInstance) {
    var initializer = function(options) {
      var self = this;

      _.each(classInstance.inherits, function(ancestor) {
        ancestor.call(self, options);
      });
      classInstance.initialize.call(self, options);
    };

    return initializer;
  }
});

// Instance Methods
_.extend(Classical.prototype, {
  createClass: function() {
    var initializer = Classical.makeInitializer(this);
    var Class = this.makeConstructor(this.name, initializer);

    this.addClassMethods(Class);
    this.addInstanceMethods(Class);
    return Class;
  },

  makeConstructor: function(name, body) {
    var constructor = eval(
      'function ' + name + '(options) { body.call(this, options); } ' + name
    );

    constructor.toString = Classical.toString;
    return constructor;
  },

  addClassMethods: function(Class) {
    var extensions = this.inherits.concat([this.classMethods]);

    _.extend.apply(null, [Class].concat(extensions));
  },

  addInstanceMethods: function(Class) {
    var extensions = _.map(this.inherits, function(ancestor) {
        return ancestor.prototype;
      })
      .concat([this.instanceMethods]);
    _.extend.apply(null, [Class.prototype].concat(extensions));
  }
});

module.exports = Classical;
