"use strict";

function merge(left, right) {
    return function () {
        left();
        right();
    };
}

function observable(left) {
    left.map = function (lambda) {
        return observable(function (listener) {
            return left(function (value) {
                listener(lambda(value));
            });
        });
    };

    left.filter = function (lambda) {
        return observable(function (listener) {
            return left(function (value) {
                if (lambda(value)) {
                    listener(value);
                }
            });
        });
    };

    left.one = function () {
        return observable(function (listener) {
            var undo = left(function (value) {
                listener(value);
                undo();
            });

            return undo;
        });
    };

    left.recycle = function () {
        var result = observable(function (observer) {
            var undo = left(function (value) {
                observer(value);

                undo = result(observer);
            });

            return function () {
                undo();
            };
        });

        return result;
    };

    left.merge = function (right) {
        return observable(function (listener) {
            return merge(left(listener), right(listener));
        });
    };

    left.delay = function (right) {
        return observable(function (listener) {
            var values = [];

            return merge(left(function (value) {
                values.push(value);
            }), right(function () {
                values.forEach(function (value) {
                    listener(value);
                });
            }));
        });
    };

    left.sample = function (right) {
        return observable(function (listener) {
            var last;

            return merge(left(function () {
                listener(last);
            }), right(function (value) {
                last = value;
            }));
        });
    };

    return left;
}

module.exports = observable;
