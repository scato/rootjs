"use strict";

var Root = require('../../src/root/'),
    Trait = require('../../src/trait/');

describe("Trait", function () {
    describe("is", function () {
        it("matches Trait", function () {
            expect(Trait.is(Trait)).toBe(true);
            expect(Trait.is(Root)).toBe(false);
        });

        it("matches traits to Trait", function () {
            var Record = Root.create().
                use(Trait);

            expect(Record.is(Trait)).toBe(true);
            expect(Record.is(Root)).toBe(true);
        });

        it("matches prototypes to their traits", function () {
            var Record = Root.create().
                use(Trait);

            var User = Root.create().
                use(Record);

            expect(User.is(Record)).toBe(true);
            expect(User.is(Root)).toBe(true);
        });
    });
});

