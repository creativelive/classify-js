var assert = require('chai').assert;
var classify = require('../../');
var Human = require('./human');

describe('Human', function() {
  it('should inherit class and instance methods from Mammal', function() {
    var human = new Human({
      hairColor : 'blonde',
      language : 'english'
    });
    
    assert.equal(human.getHairColor(), "blonde", "Got the right hair color");
    assert.equal(human.speak(), "I speak english", "Spoke correctly");
    assert.equal(Human.getHowManyMammals(), 1, "Recorded birth");
    var deathCry = human.die();
    assert.equal(deathCry, "croak", "Died correctly");
    assert.equal(Human.getHowManyMammals(), 0, "Recorded death");
  });
});
