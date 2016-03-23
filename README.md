# Superagent HMAC

[![CircleCI](https://img.shields.io/circleci/project/thisissoon/superagent-hmac.svg)](https://circleci.com/gh/thisissoon/superagent-hmac)

A plugin for superagent that signs requests with a HMAC signature. To generate a signature
a client ID and secret is required. By default the signature is generated in
base64(id:signature) format, options have been provdided to configure this.

## Install

```
npm install --save superagent-hmac
```

## Usage

```js
var request = require('superagent');

var superagentHmac = require('superagent-hmac')({
  clientId: 'this-service',
  clientSecret: 'abc123'
});

request
  .use(superagentHmac)
  .end(function (response) {
    console.log(response);
  });
```

## Options

- `clientId` - ID of client making request (required)
- `clientSecret` - secret for client making request (required)
- `algorithm` - signature hashing algorithm, defaults to sha256
- `encoding` - defaults to base64
- `separator` - character to use to separate client id and signature, defaults to `:`
- `header` - request header used to add signature, defaults to signature
