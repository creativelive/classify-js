var Classical = require('./classical.js');
var util = require('util');

var classify = function(options) {
  var classical = new Classical(options);

  return classical.createClass();
}

var A = classify({
  name : 'A',
  inherits : [],
  initialize : function(options) {
    this.a = options.a;
  },
  instanceMethods : {
    print : function() {
      return "this.a is:\n" + this.a;
    }
  },
  classMethods : {
    generalize : function() {
      return "All instances of A have A-ness";
    }
  }
});

console.log("The newly-constructed A class looks like:\n", A);

var a = new A({
  a : 1,
  b : 2
});

console.log("The newly-constructed A instance looks like:\n", a);
console.log("The newly-constructed A instance has proto:\n", util.inspect(a.__proto__));
console.log("a's print function is:\n", a.print);

var B = classify({
  name : 'B',
  inherits : [A],
  initialize : function(options) {
    this.b = options.b;
  },
  instanceMethods : {
    print : function() {
      return "The overridden version of print, this.b is:\n" + this.b;
    },
    myfunc : function() {
      return "B's have special powers!\n";
    }
  },
  classMethods : {
    generalize2 : function() {
      return "All B's inherit from A's";
    }
  }
});

console.log("The newly-constructed B class looks like:\n", B);

var b = new B({
  a : 3,
  b : 4
});

console.log("The newly-constructed b instance looks like:\n", b);
console.log("The newly-constructed B instance has proto:\n", util.inspect(b.__proto__));

console.log("b's print function is:\n", b.print);
console.log("b's myfunc function is:\n", b.myfunc);
