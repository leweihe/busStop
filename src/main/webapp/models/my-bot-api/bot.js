/*-----------------------------------------------------------------------------
 A simple "Hello World" bot that can be run from a console window.

 # RUN THE BOT:

 Run the bot from the command line using "node app.js" and then type
 "hello" to wake the bot up.

 -----------------------------------------------------------------------------*/
var restify = require('restify');
var builder = require('../../../../../node_modules/botbuilder');

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/aac6c13c-63dc-444e-8f61-7ac4b97fa5ca?subscription-key=96429d5c0efc4cb692dddde6677c0f98&verbose=true&q=';

var recognizer = new builder.LuisRecognizer(model);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

var intents = new builder.IntentDialog({recognizers: [recognizer]});

bot.dialog('/', intents);

intents.matches('路线查询', [queryPath]);

function queryPath(session, args, next) {
    console.log(args);
    var dests = builder.EntityRecognizer.findAllEntities(args.entities, '地点');

    if(dests.length > 0) {
        session.send('为您查询地点:' + dests[0].entity);
    } else {
        console.log('No entity has been recognized.');
    }
}

intents.matches('天气查询', builder.DialogAction.send('正在为您查询天气'));

intents.matches(/^change name/i, [
    function (session) {
        session.userData.name = [];
        session.beginDialog('whoAreU');
    },
    function (session, result) {
        session.send('Now you are ' + result.response.name.firstName + ' ' + result.response.name.lastName);
    }
]);

intents.onDefault(builder.DialogAction.send('Hi'));

bot.dialog('whoAreU', [function (session, args, next) {

    if (session.userData.name) {
        session.userData.name = args || {};
    }
    if (!session.userData.name.firstName) {
        builder.Prompts.text(session, 'what\'s your first name?');
    } else {
        next();
    }

},
    function (session, result, next) {
        if (result.response) {
            session.userData.name.firstName = result.response;
        }
        if (!session.userData.name.lastName) {
            builder.Prompts.text(session, 'what\'s your last name?');
        } else {
            next();
        }
    },
    function (session, result) {
        if (result.response) {
            session.userData.name.lastName = result.response;
        }
        session.endDialogWithResult({response: session.userData});
    }
]);
