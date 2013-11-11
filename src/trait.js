var Root = require('./root');

var Trait = {
    mixin: function (trait) {
        var names = [];

        trait.def('mixin', function (prototype) {
            var that = this;

            names.forEach(function (name) {
                prototype.def(name, that[name]);
            });
        });

        trait.override('def', function (base) {
            return function (name, value) {
                if (name === 'is') {
                    throw new Error('Method "is" may not be included in a Trait');
                }

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
        
        this.override('is', function (base) {
            return function (right) {
                return traits.indexOf(right) !== -1 || base(right);
            };
        });

        traits.forEach(function (trait) {
            trait.mixin(that);
        });

        return this;
    });

module.exports = Trait;
