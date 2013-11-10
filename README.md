Root.js
=======

Root.js is a framework for prototypal inheritance in JavaScript

Basic Usage
-----------

Create a prototype by extending the Root object:

```javascript
var User = Root.create();
```

You can add fields by calling the meta-method:

```javascript
User.
    field('firstname').
    field('lastname');
```

You can add other definitions using def:

```javascript
User.
    def('fullname', function () {
        return this.firstname() + ' ' + this.lastname();
    });
```

Fields are getter/setters, like jQuery has.

```javascript
var me = User.create().
    firstname('Scato').
    lastname('Eggen');

console.log(me.fullname()); // 'Scato Eggen'
```

Events
------

Objects can also have events. Again like jQuery, they are methods that are overloaded to either add a listener or trigger the event.

```javascript
User.
    event('login');

var undo = me.login(function (date) {
    console.log(date);
});

me.login(new Date()); // Sun Nov 10 2013 14:09:22 GMT+0100 (CET)
```

The only way to remove a listener is by calling the undo-token that was returned:

```javascript
undo();
```

You can also have stand-alone events, which have all kinds of interesting methods:

```javascript
var numbers = event();
var even = numbers.filter(function (number) {
    return number % 2 === 0;
});

even(function (number) {
    console.log(number);
});

number(1);
number(2); // 2
number(3);
number(4); // 4
```

TODO
----

  * Add traits: Trait and Root.adopt()
  * Add documentation for advanced usage: Root.override(), Root.is(), Root.base and Root.ref()
  * Add to npm
  * Create client-side version for browsers

