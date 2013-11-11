var Root = require('../').Root;

// every person has an event 'shout'
var Person = Root.create().
    event('shout').
    def('tell', function (message) {
        console.log(message);
    });

// create three persons
var client = Person.create();
var manager = Person.create();
var developer = Person.create();

// the manager passes messages from the client to the developer
// calling an event with a function adds an event listener
client.shout(function (message) {
    developer.tell(message.replace(/^I want /, 'The client wants '));
});

// calling an event with a non-function triggers the event
client.shout('I want a CMS!'); // 'The client wants a CMS!'

