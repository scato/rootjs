"use strict";

var event = require('../event');

require('./').def('event', function (name, init) {
    return this.lazy(name, function () {
        var inner = event();
        
        if (init) {
            inner(init);
        }
        
        return inner;
    });
});
