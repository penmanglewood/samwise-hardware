'use strict';
let http = require('http');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
    var options = {
        host: 'iot.m18.io',
        port: '8080',
        path: '/update',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    var request = http.request(options, function(res) {
        res.setEncoding('utf8');
    });
    
    request.write(JSON.stringify(event));
    request.end();
};
