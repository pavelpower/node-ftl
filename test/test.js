var Mocha = require('../');
var should = require('should');
var path = require('path');

var data = {
    RequestParameters: {
        player: 'vlc',
        optjs: 'true',
        ie: 'false'
    }
};

describe('node-ftl', function() {
    describe('node-ftl it is npm package and is exists', function() {
        var PJV = require('package-json-validator').PJV;

        it('should be npm package', function() {
            PJV.validate(require('../package.json'), 'npm');
        });

        //var processTemplate = require('../').processTemplate;
    });

    describe('ftl', function () {

        var ftl = require('../');
        var html5Lint = require('html5-lint');

        describe('.processTemplate()', function () {

            it('should be a function', function() {
                ftl.processTemplate.should.be.a.funciton;
            });

            it('should convert text from views/index.ftl to html', function (done) {
                ftl.processTemplate({
                    data: data,
                    settings: {
                        encoding: 'utf-8',
                        viewFolder: path.join(process.cwd(), 'views/')
                    },
                    filename: 'index.ftl'
                }).on('error', function(err) {
                    if (err)
                        throw err;
                }).on('end', function(err, html) {

                    html5Lint( html, function( err ) {

                        if (err)
                            throw err;

                        done();

                    });
                })
            })
        });
    })
});
