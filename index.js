'use strict';
/**
 * Middleware to sign the request
 * @module superagent-hmac
 */
var superagentHmac = function superagentHmac(options) {

  var hmac = require('./lib/hmac')(options);

  return function signRequest (req) {

    // Signature for requests without body
    req.set('signature', hmac.sign());

    // Store reference to original send method
    var sendOriginal = req.send;

    /**
     * Set HMAC signature from data and call original send function
     * @method send
     * @param   {Object}   data Data to send in request body
     * @returns {Function} orignal send function
     */
    req.send = function signAndSend (data) {
      req.set('signature', hmac.sign(data));
      return sendOriginal.call(this, data);
    };

  };
};

module.exports = superagentHmac;
