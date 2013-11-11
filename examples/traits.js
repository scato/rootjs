var Root = require('../').Root,
    Trait = require('../').Trait;

var Entity = Root.create().
    use(Trait).
    field('id');

var Contact = Root.create().
    use(Trait).
    field('firstname').
    field('lastname').
    def('fullname', function () {
        return this.firstname() + ' ' + this.lastname();
    });

var User = Root.create().
    use(Entity, Contact).
    field('username');

var me = User.create().
    id('42').
    firstname('Scato').
    lastname('Eggen');

console.log(me.fullname()); // 'Scato Eggen'

