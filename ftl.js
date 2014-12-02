'use strict';
var spawn = require('child_process').spawn;
var iconv = require('iconv-lite');
var PATH = require('path');
var fs = require('fs');

var jarFile = PATH.join(__dirname, './jar/FMtoll-0.5.jar');

//
// args:
//  data - data model
//  settings - include `encoding` and `viewFolder`
//  ftlFile - template file name
var processTemplate = function(args) {
    var dataModel = JSON.stringify(args.data);
    var settings = JSON.stringify(args.settings);

    var Stream = require('stream');
    var stream = new Stream();
    var resultData = '';

    var cmd = spawn('java', [
        '-jar',
        jarFile,
        settings,
        args.filename,
        dataModel
    ]);

    cmd.stdout.on('data', function(data) {
        resultData += iconv.decode(data, args.settings.encoding);
        stream.emit('data', resultData);
    });

    cmd.stderr.on('data', function(data) {
        // Print error message
        console.log(iconv.decode(data, args.settings.encoding));
    });

    cmd.stdout.on('end', function(err) {
        stream.emit('end', err, resultData);
    });

    return stream;
};

function renderFile (path, options, fn) {

    // support callback API
    if ('function' == typeof options) {
        fn = options;
        options = undefined;
    }

    if (typeof fn === 'function') {
        return renderFile(path, options)
            .on('end', fn);
    }

    options = options || {};

    return processTemplate({
        data: options.query ? { RequestParameters: options.query } : options.data || {},
        settings: {
            encoding: options.encoding || 'utf8',
            viewFolder: options.viewFolder || PATH.dirname(path)
        },
        filename: PATH.basename(path)
    })
}

module.exports = {
    processTemplate: processTemplate,
    __express: renderFile
};