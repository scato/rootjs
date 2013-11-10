"use strict";

var field = require('../field');

require('./').def('field', function (name, init) {
    return this.lazy(name, function () {
        return init ? field(init()) : field();
    });
});
