Root.js
=======

Root.js is a framework for prototypal inheritance in JavaScript

Getting Started
---------------

To get started, install Root.js using npm:

```
$ npm install root-js
```

The package contains the Root object and some other utilities like event.

```javascript
var Root = require('root-js').Root,
    event = require('root-js').event;
```

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

numbers(1);
numbers(2); // 2
numbers(3);
numbers(4); // 4
```

More...
-------

Check out the [examples](https://github.com/scato/rootjs/tree/master/examples) for more details.

