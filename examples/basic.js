var Root = require('../').Root;

// create a prototype
// field and def are meta-methods that add methods to the prototype
var User = Root.create().
    field('firstname').
    field('lastname').
    def('fullname', function () {
        return this.firstname() + ' ' + this.lastname();
    });

// create an instance by extending the prototype
// setters return the object, forming a fluid interface
var me = User.create().
    firstname('Scato').
    lastname('Eggen');

console.log(me.fullname()); // 'Scato Eggen'

