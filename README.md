# Superagent HMAC

A plugin for superagent that signs requests with a HMAC signature.

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
