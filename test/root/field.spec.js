"use strict";

var Root  = require('../../src/root/'),
    field = require('../../src/field');

describe("Root", function () {
    describe("field", function () {
        it("defines a field on a prototype", function () {
            var Proto = Root.create();

            Proto.field('foo');

            expect(Proto.ref('foo').is(field)).toBe(true);
        });

        it("accepts a function for the default value", function () {
            var Proto = Root.create();

            Proto.field('foo', function () { return 'bar'; });

            expect(Proto.foo()).toBe('bar');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.field('foo');

            expect(result).toBe(Proto);
        });
    });
});
