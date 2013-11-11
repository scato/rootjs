var Root = require('../').Root;

// create a prototype with some fields
var Animal = Root.create().
    field('energy').
    field('age');

// extend the prototype with a method
var Mammal = Animal.create().
    def('milk', function (animal) {
        this.energy(this.energy() - 1);
        animal.energy(animal.energy() + 1);
    });

// override the method
var Human = Mammal.create().
    override('milk', function (base) {
        return function (animal) {
            if (this.age() < 20 || animal.age() > 2) {
                throw new Error('No milk!');
            }

            base(animal);
        };
    });

var cat = Mammal.create().
    energy(1000).
    age(4);

var kitten = Mammal.create().
    energy(10).
    age(0);

// this is okay
cat.milk(kitten);
console.log(kitten.energy()); // 11

var mother = Human.create().
    energy(1000).
    age(28);

var father = Human.create().
    energy(1000).
    age(30);

// No milk!
mother.milk(father);

