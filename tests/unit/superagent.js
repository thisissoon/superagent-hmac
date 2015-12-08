describe('superagentHmac', function () {

  var clientId = 'service';
  var clientSecret = 'abc';

  var superagentHmac = require('../../index')({
    clientId: clientId,
    clientSecret: clientSecret
  });

  var request = require('superagent');

  it('should attach signature request header by default', function (done) {
    request
      .get('http://google.com')
      .use(superagentHmac)
      .end(function (err, res) {
        expect(res.req._headers.signature).to.exist;
        done();
      });
  });

  it('should set header based on header option', function (done) {
    var superagentHmac = require('../../index')({
      clientId: clientId,
      clientSecret: clientSecret,
      header: 'random'
    });

    request
      .get('http://google.com')
      .use(superagentHmac)
      .end(function (err, res) {
        expect(res.req._headers.random).to.exist;
        done();
      });
  });

});
