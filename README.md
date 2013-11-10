Root.js
=======

Root.js is a framework for prototypal inheritance in JavaScript

Basic Usage
-----------

Create a prototype by extending the Root object:

    var User = Root.create();

You can add fields by calling the meta-method:

    User.
        field('firstname').
        field('lastname');

You can add other definitions by def:

    User.
        def('fullname', function () {
            return this.firstname() + ' ' + this.lastname();
        });

TODO
----

  * Add source code and tests
  * Add documentation for events: Root.event() and event()
  * Add documentation for traits: Trait and Root.adopt()
  * Add documentation for advanced usage: Root.override(), Root.is(), Root.base and Root.ref()

