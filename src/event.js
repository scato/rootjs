"use strict";

var observable = require('./observable');

function event() {
    var listeners = [];

    return create(function () {
        if (typeof arguments[0] === 'function') {
            var listener = arguments[0];

            listeners.push(listener);

            return function () {
                if (listeners.indexOf(listener) !== -1) {
                    listeners.splice(listeners.indexOf(listener), 1);
                }
            };
        } else {
            var value = arguments[0];

            listeners.forEach(function (listener) {
                listener.call(this, value);
            }, this);
            
            return this;
        }
    });
}

function create(left) {
	left = observable(left);
	
	left.is = function (right) {
		return right === event;
	};

    left.bind = function () {
        return create(Function.prototype.bind.apply(left, arguments));
    };
	
	return left;
}

module.exports = event;
