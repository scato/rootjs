var Root = require('../root/');

var Trait = {
    mixin: function (trait) {
        var names = [];

        trait.def('mixin', function (prototype) {
            var that = this;

            names.forEach(function (name) {
                prototype.def(name, that[name]);
            });

            prototype.override('is', function (base) {
                return function (right) {
                    return right === trait || base(right);
                };
            });
        });

        trait.override('is', function (base) {
            return function (right) {
                return right === Trait || base(right);
            };
        });

        trait.override('def', function (base) {
            return function (name, value) {
                names.push(name);
                return base(name, value);
            };
        });
    },

    is: function (right) {
        return right === this;
    }
};

Root.
    def('use', function () {
        var traits = Array.prototype.slice.call(arguments);
        var that = this;

        traits.forEach(function (trait) {
            trait.mixin(that);
        });
        
        return this;
    });

module.exports = Trait;
