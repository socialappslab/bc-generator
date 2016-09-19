var fs = require('fs');
var mkdirp = require('mkdirp');

//protocols
var amqp = require('./protocol-pool/amqp');
var http = require('./protocol-pool/http');
var smtp = require('./protocol-pool/smtp');

var conf = require('./generator.conf');

exports.httpEndpoint = function(folder, description, to) {
    fs.readFile(templateFolder + 'http-endpoint.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        fs.writeFile(folder + '/http-endpoint.js', out, (err) => {
            if (err) throw err;
            console.log('http-entpoint.js saved!');
        });

    });

    fs.readFile(templateFolder + 'routes.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        var out = data.replace('VAR_SENDER', '\'./' + to.protocol.toLowerCase() + '-sender\'');
        fs.writeFile(folder + '/routes.js', out, (err) => {
            if (err) throw err;
            console.log('routes.js saved!');
        });

    });
}


//BC Starter
function bcStarter(folder, description) {
    fs.readFile(conf.templateFolder + 'start-bc.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        var out = data.replace('VAR_ENDPOINT', '\'./' + description.protocol.toLowerCase() + '-endpoint\'');
        fs.writeFile(folder + '/start-bc.js', out, (err) => {
            if (err) throw err;
            console.log('start-bc.js saved!');
        });

    });
}

exports.generate = function(folder, from, to) {
    switch (from.protocol.toLowerCase()) {
        case 'http':
            http.httpEndpoint(folder, from, to);
            break;
        case 'amqp':
            amqp.amqpEndpoint(folder, from, to);
            break;
        default:
            console.log('endpoint for ' +
                from.protocol.toLowerCase() + ' is not implemented :(')
    }
    //sender
    switch (to.protocol.toLowerCase()) {
        case 'amqp':
            amqp.amqpSender(folder, to);
            break;
        case 'smtp':
            smtp.smtpSender(folder);
            break;
        default:
            console.log('sender for ' +
                from.protocol.toLowerCase() + ' is not implemented :(')
    }
    bcStarter(folder, from);
}
