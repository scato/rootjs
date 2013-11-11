var Root = require('../').Root,
    event = require('../').event;

var User = Root.create().
    field('name').
    field('messages', function () {
        return [];
    }).
    event('says').
    def('tell', function (body) {
        this.messages().push(body);
    });

var Message = Root.create().
    field('sender').
    field('body').
    def('isAction', function () {
        return this.body().match(/^\/me /);
    }).
    def('asAction', function () {
        return this.body().replace(/^\/me /, this.sender().name() + ' ');
    });

var Room = Root.create().
    event('all').
    lazy('announce', function () {
        return this.ref('all').filter(function (message) {
            return !message.isAction();
        }).map(function (message) {
            return message.body();
        });
    }).
    lazy('action', function () {
        return this.ref('all').filter(function (message) {
            return message.isAction();
        }).map(function (message) {
            return message.asAction();
        });
    }).
    def('add', function (user) {
        var incoming = user.ref('says').map(function (body) {
            return Message.create().sender(user).body(body);
        });

        var outgoing = this.ref('announce').merge(this.ref('action'));

        var undo1 = incoming(this.ref('all'));
        var undo2 = outgoing(user.ref('tell'));

        return function () {
            undo1();
            undo2();
        };
    });

var Scato = User.create().
    name('Scato');

var Eelco = User.create().
    name('Eelco');

var chatroom = Room.create();

chatroom.add(Scato);
chatroom.add(Eelco);

Scato.says('Did I tell you about server-side JavaScript?');
Eelco.says('/me yawns');

console.log(Scato.messages());

