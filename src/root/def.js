"use strict";

require('./').def = function (name, value) {
    this[name] = value;

    return this;
};
