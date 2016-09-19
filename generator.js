var gen = require('./protocol-generator');

var fromPath = process.argv[2];
var toPath = process.argv[3];


var from = require('./' + fromPath);
var to = require('./' + toPath);

console.log('from: ' + from.name + ', protocol: ' + from.protocol);
console.log('to: ' + to.name + ', protocol: ' + to.protocol);

var mkdirp = require('mkdirp');
var folder = from.name + '-' + to.name;

mkdirp('./generated', function(err) {
    if (err) throw err;
    mkdirp('./generated/' + folder, function(err) {
        if (err) throw err;
        mkdirp('./generated/' + folder + '/conf', function(err) {
            if (err) throw err;
            folder = './generated/' + folder;
            //endpoint
            gen.generate(folder, from, to);
        });
    });
});
