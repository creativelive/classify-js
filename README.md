```
// Example Usage:

var classify = require('classify');

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

var Human = classify({
  name : 'Human',
  inherits : [Mammal],
  initialize : function(options) {
    this._language = options.language;
  },
  instanceMethods : {
    speak : function() {
      return "I speak " + this._language;
    },
    die : function() {
      console.log("croak!");
      Human.recordDeath();
    }
  }
});

var human = new Human({
  hairColor : 'blonde',
  language : 'english'
});

// The new Human instance inherits the Mammal instance methods, e.g getHairColor().
console.log("The newly-constructed human has hair-color:\n", human.getHairColor());
console.log("The newly-constructed human says:\n", human.speak()); // Human instance method.
console.log("There are " + Human.getHowManyMammals() + " mammals around."); // Inherited from Mammal class methods.
console.log("Upon dying, the human says " + human.die()); // Human instance method.
console.log("Now there are " + Human.getHowManyMammals() + " mammals around.");


// See the test directory for an example of how to split classes into separate files.
```