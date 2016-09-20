var fs = require('fs');
var utils = require('../utils');
var conf = require('../generator.conf');

//Endpoint
exports.httpEndpoint = function(folder, description, to) {
    //main
    fs.readFile(conf.templateFolder + 'http-endpoint.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        fs.writeFile(folder + '/http-endpoint.js', out, (err) => {
            if (err) throw err;
            console.log('http-entpoint.js saved!');
        });

    });
    //routes
    fs.readFile(conf.templateFolder + 'routes.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        var out = data.replace('VAR_SENDER', '\'./' + to.protocol.toLowerCase() + '-sender\'');
        fs.writeFile(folder + '/routes.js', out, (err) => {
            if (err) throw err;
            console.log('routes.js saved!');
        });

    });
    //conf
    fs.readFile(conf.templateFolder + 'conf/http-endpoint.conf.js.template', 'utf-8', function(err, data) {
        if (err) throw err;

        var out = data;
        fs.writeFile(folder + '/conf/http-endpoint.conf.js', out, (err) => {
            if (err) throw err;
        });


    });
}

//Sender
exports.httpSender = function(folder, description) {
    fs.readFile(conf.templateFolder + 'http-sender.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        fs.writeFile(folder + '/http-sender.js', out, (err) => {
            if (err) throw err;
            console.log('http-sender saved!');
        });

    });
    fs.readFile(conf.templateFolder + 'conf/http-sender.conf.json.template', 'utf-8', function(err, data) {
        if (err) throw err;

        var out = data.replace('VAR_WEBHOOKURL', utils.setDoubleQuotes(description.address));
        fs.writeFile(folder + '/conf/http-sender.conf.json', out, (err) => {
            if (err) throw err;
            console.log('Sender conf saved!');
        });


    });
}
