"use strict";

var event   = require('../src/event');

describe("observable", function () {
    it("can be mapped", function () {
        var a = event();
        var b = a.map(function (value) {
            return value + "bar";
        });

        var foobar = jasmine.createSpy('foobar');

        b(foobar);

        a("foo");
        expect(foobar).toHaveBeenCalledWith("foobar");
    });

    it("can be filtered", function () {
        var a = event();
        var b = a.filter(function (value) {
            return value === "bar";
        });

        var foobar = jasmine.createSpy('foobar');

        b(foobar);

        a("foo");
        expect(foobar).not.toHaveBeenCalledWith("foo");

        a("bar");
        expect(foobar).toHaveBeenCalledWith("bar");
    });

    it("can be limited to one occurrence", function () {
        var a = event();
        var b = a.one();

        var foobar = jasmine.createSpy('foobar');

        b(foobar);

        a("foo");
        a("bar");

        expect(foobar).toHaveBeenCalledWith("foo");
        expect(foobar).not.toHaveBeenCalledWith("bar");
    });

    it("can be recycled", function () {
        var a = event();
        var b = a.one();
        var c = b.recycle();

        var foobar = jasmine.createSpy('foobar');

        c(foobar);

        a("foo");
        a("bar");

        expect(foobar).toHaveBeenCalledWith("foo");
        expect(foobar).toHaveBeenCalledWith("bar");
    });

    it("can be merged with another observable", function () {
        var a = event();
        var b = event();
        var c = a.merge(b);

        var foobar = jasmine.createSpy('foobar');

        c(foobar);

        a("foo");
        a("foz");
        b("bar");
        expect(foobar).toHaveBeenCalledWith("foo");
        expect(foobar).toHaveBeenCalledWith("foz");
        expect(foobar).toHaveBeenCalledWith("bar");
    });

    it("can be delayed", function () {
        var a = event();
        var b = event();
        var c = a.delay(b);

        var foobar = jasmine.createSpy('foobar');

        c(foobar);

        a("foo");
        a("foz");
        expect(foobar).not.toHaveBeenCalledWith("foo");
        expect(foobar).not.toHaveBeenCalledWith("foz");

        b("bar");
        expect(foobar).toHaveBeenCalledWith("foo");
        expect(foobar).toHaveBeenCalledWith("foz");
        expect(foobar).not.toHaveBeenCalledWith("bar");
    });

    it("can be sampled", function () {
        var a = event();
        var b = event();
        var c = a.sample(b);

        var foobar = jasmine.createSpy('foobar');

        c(foobar);

        b("foo");
        b("foz");
        expect(foobar).not.toHaveBeenCalledWith("foo");
        expect(foobar).not.toHaveBeenCalledWith("foz");

        a("bar");
        expect(foobar).not.toHaveBeenCalledWith("foo");
        expect(foobar).toHaveBeenCalledWith("foz");
        expect(foobar).not.toHaveBeenCalledWith("bar");
    });
});
