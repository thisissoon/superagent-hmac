/**
 * Unit tests for HMAC Service
 * @module hmac
 */

describe('HMAC', function () {

  var crypto = require('crypto');
  var hmac = require('../../lib/hmac')({
    clientId: 'service',
    clientSecret: 'abc'
  });

  var compareSig, body, client, generateComparison;

  beforeEach(function () {

    body = { name: 'foo' };

    generateComparison = function generateComparison (body) {
      body = JSON.stringify(body);
      return crypto.createHmac('sha256', 'abc')
        .update(body)
        .digest('base64');
    };

    compareSig = generateComparison(body);
  });

  it('should return signature as base64(id:signature)', function () {
    var signature = hmac.sign(body);

    var parts = new Buffer(signature, 'base64').toString().split(':', 2);

    expect(parts[0]).to.equal('service');
    expect(parts[1]).to.equal(compareSig);
  });

  it('should sign empty body', function () {
    compareSig = generateComparison('');

    // With undefined data
    var signature = hmac.sign();
    var parts = new Buffer(signature, 'base64').toString().split(':', 2);
    expect(parts[0]).to.equal('service');
    expect(parts[1]).to.equal(compareSig);
  });

});
