
var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();

var bot = new build.UniversalBot(connector, function(session){
    session.send("Your said: %s", session.message.text);
});