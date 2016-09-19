var fs = require('fs');
var mkdirp = require('mkdirp');
var conf = require('../generator.conf');

exports.smtpSender = function(folder, description) {
    fs.readFile(conf.templateFolder + 'smtp-sender.js.template', 'utf-8', function(err, data) {
        if (err) throw err;
        var out = data;
        fs.writeFile(folder + '/smtp-sender.js', out, (err) => {
            if (err) throw err;
            console.log('Sender saved!');
        });

    });

    mkdirp(folder + '/lib', function(err) {
        if (err) throw err;
        fs.createReadStream(conf.templateFolder + 'lib/mailer.js').pipe(fs.createWriteStream(folder + '/lib/mailer.js'));
        fs.readFile(conf.templateFolder + 'lib/mailer.conf.js.sample', 'utf-8', function(err, data) {
            if (err) throw err;

            var out = data;
            fs.writeFile(folder + '/lib/mailer.conf.js', out, (err) => {
                if (err) throw err;
                console.log('Sender conf saved!');
            });


        });
    });
}
