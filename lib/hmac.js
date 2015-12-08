'use strict';
/**
 * Module dependencies
 */
var crypto = require('crypto');
var _defaults = require('lodash/object/defaults');

/**
 * HMAC Verification
 *
 * @description :: Service to handle HMAC signing
 */
module.exports = function hmac(options) {

  var defaults = {
    algorithm: 'sha256',
    encoding: 'base64',
    separator: ':'
  };

  options = _defaults(options, defaults);

  return {
    /**
     * Sign data with client secret and ID as base64(id:signature)
     * @method sign
     * @param {Object} data  JSON request body to sign
     */
    sign: function sign(data) {
      // Serialize data as JSON before calculating sig
      if (!data || Object.keys(data).length === 0) {
        // Data is empty
        data = '';
      } else {
        data = JSON.stringify(data);
      }

      var hmac = crypto.createHmac(options.algorithm, options.clientSecret)
        .update(data)
        .digest(options.encoding);

      return new Buffer(options.clientId + options.separator + hmac)
        .toString(options.encoding);
    }
  };
};
