#! /usr/bin/env node
'use strict';

var path = require('path');
var express = require('express');
var _ = require('lodash');
var ftl = require('./');

var Config = {
    "port": 9003,
    "defaultFtlOptions": {
        "defaultSkin": "classic",
        "optjs": "false",
        "ie": "1",
        "locale": "ru_RU"
    },
    "forward": []
};

var app = express();

app.get('/', function (req, res) {
    res.redirect('/index.ftl');
});

app.engine('ftl', ftl.__express);
app.set('views', path.join(__dirname, './views'));

// замена ftl файлов вьюхами jade
app.use('/*.ftl', function ( req, res ) {

    var view = req.params[0] + '.ftl';
    var options = {};

    options.query = _.extend({}, Config.defaultFtlOptions, req.query);

    res.set('Content-Type', 'text/html');

    res.render(view, options, function(err, html) {
        err && console.log(err);
        res.send(html);
    });
});

app.listen(Config.port);