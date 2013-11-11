"use strict";

var Root = require('../../src/root'),
    Trait = require('../../src/trait');

describe("Trait", function () {
    describe("def", function () {
        it("defines a property on a trait", function () {
            var Record = Root.create().
                use(Trait);

            var foo = function () {};

            Record.def('foo', foo);

            var User = Root.create().
                use(Record);

            expect(User.foo).toBe(foo);
        });
    });
});

