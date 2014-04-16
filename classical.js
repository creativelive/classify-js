var _ = require('underscore');
var util = require('util');

function defaultInitialize(options) {
  _.extend(this, options);
}

var Classical = function(options) {
  Classical.validateOptions(options);
  this._name = options.name || 'DefaultClass';
  this._inherits = options.inherits || [];
  this._initialize = options.initialize || defaultInitialize;
  this._classMethods = options.classMethods || {};
  this._instanceMethods = options.instanceMethods || {};
}


// Class Methods.
_.extend(Classical, {
  toString : function() {
    return util.inspect(this);
  },
  validateOptions : function(options) {
    var self = this;

    _.each(options, function(value, key) {
      var desiredType = self.validOptions[key];

      if (!desiredType) {
        throw new Error("Option " + key + " not in " + _.keys(self.validOptions).join(','));
      }
      if (typeof value !== desiredType) {
        throw new Error("Option " + key + " expected " + desiredType);
      }
    });
  },
  validOptions : {
    name : 'string',
    inherits : 'object',
    initialize : 'function',
    classMethods : 'object',
    instanceMethods : 'object'
  }
});


// Instance Methods
_.extend(Classical.prototype, {
  createClass : function() {
    var initializer = this._makeInitializer();
    var Class = this._makeConstructor(this._name, initializer);

    this._addClassMethods(Class);
    this._addInstanceMethods(Class);
    return Class;
  },
  
  _makeInitializer : function() {
    var self = this;
    var initializer = function(options) {
      var that = this;
      _.each(self._inherits, function(ancestor) {
        ancestor.call(that, options);
      });
      self._initialize.call(that, options);
    };
    
    return initializer;
  },
  
  _makeConstructor : function(name, body) {
    var self = this;

    var constructor = eval(
      "function " + name + "(options) { body.call(this, options); } " + name
    );
    constructor.toString = Classical.toString;

    return constructor;
  },

  _addClassMethods : function(Class) {
    var extensions = this._inherits.concat([this._classMethods]);

    _.extend.apply(null, [Class].concat(extensions));
  },

  _addInstanceMethods : function(Class) {
    var extensions = _.map(this._inherits, function(ancestor) {
      return ancestor.prototype;
    })
    .concat([this._instanceMethods]);
    _.extend.apply(null, [Class.prototype].concat(extensions));
  }
});

module.exports = Classical;
