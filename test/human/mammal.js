var classify = require('../../');

var howManyMammals = 0;

var Mammal = classify({
  name : 'Mammal',
  inherits : [],
  initialize : function(options) {
    this._hairColor = options.hairColor;
    Mammal.recordBirth();
  },
  classMethods : {
    getHowManyMammals : function() {
      return howManyMammals;
    },
    recordBirth : function() {
      howManyMammals += 1;
    },
    recordDeath : function() {
      howManyMammals -= 1;
    }
  },
  instanceMethods : {
    getHairColor : function() {
      return this._hairColor;
    }
  }
});

module.exports = Mammal;
