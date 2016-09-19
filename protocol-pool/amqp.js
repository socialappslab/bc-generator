var fs = require('fs');
var utils = require('../utils');
var conf = require('../generator.conf');

exports.amqpEndpoint = function(folder, description, to) {
    fs.readFile(conf.templateFolder + 'amqp-endpoint.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = utils.replaceAll('VAR_QUEUE', '\'' + to.name.toLowerCase().replace(/ /g, '') + '\'', data);
        out = out.replace('VAR_SENDER', '\'./' + to.protocol.toLowerCase() + '-sender\'');
        fs.writeFile(folder + '/amqp-endpoint.js', out, (err) => {
            if (err) throw err;
            console.log('amqp-endpoint.js saved!');
        });

    });

    fs.readFile(conf.templateFolder + 'conf/amqp.conf.js.template', 'utf-8', function(err, data) {
        if (err) throw err;

        var out = data.replace('VAR_URL', description.address);
        out = out.replace('VAR_PORT', description.port);
        out = out.replace('VAR_USER', description.user);
        out = out.replace('VAR_PASSWORD', description.password);
        out = out.replace('VAR_EXCHANGE', '');
        out = out.replace('VAR_TYPE', 'fanout');
        fs.writeFile(folder + '/conf/amqp-endpoint.conf.js', out, (err) => {
            if (err) throw err;
            console.log('Sender conf saved!');
        });


    });
}

exports.amqpSender = function(folder, description) {
    fs.readFile(conf.templateFolder + 'amqp-sender.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        fs.writeFile(folder + '/amqp-sender.js', out, (err) => {
            if (err) throw err;
            console.log('Sender saved!');
        });

    });

    fs.readFile(conf.templateFolder + 'conf/amqp.conf.js.template', 'utf-8', function(err, data) {
        if (err) throw err;

        var out = data.replace('VAR_URL', description.address);
        out = out.replace('VAR_PORT', description.port);
        out = out.replace('VAR_USER', description.user);
        out = out.replace('VAR_PASSWORD', description.password);
        out = out.replace('VAR_EXCHANGE', '');
        out = out.replace('VAR_TYPE', 'fanout');
        fs.writeFile(folder + '/conf/amqp-sender.conf.js', out, (err) => {
            if (err) throw err;
            console.log('Sender conf saved!');
        });


    });
}
