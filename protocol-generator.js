var fs = require('fs');
var mkdirp = require('mkdirp');

//protocols
var amqp = require('./protocol-pool/amqp');
var http = require('./protocol-pool/http');
var smtp = require('./protocol-pool/smtp');

var conf = require('./generator.conf');


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

//Libraries
function libraries(folder) {
    mkdirp(folder + '/lib', function(err) {
        if (err) throw err;
        fs.createReadStream(conf.templateFolder + 'lib/message.js')
            .pipe(fs.createWriteStream(folder + '/lib/message.js'));
    });
}

exports.generate = function(folder, from, to) {
    //endpoint
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
        case 'http':
            http.httpSender(folder, to);
            break;
        default:
            console.log('sender for ' +
                from.protocol.toLowerCase() + ' is not implemented :(')
    }
    libraries(folder);
    bcStarter(folder, from);
}
