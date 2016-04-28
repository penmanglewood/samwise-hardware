'use strict';

const https = require('https');
const AWS = require('aws-sdk');
const pump = 'eddy';
const moistureThreshold = 200;
const iotdata = new AWS.IotData({
    region: 'ap-northeast-1',
    endpoint: 'GAGAGAGAGUGUGUGUG1.iot.ap-northeast-1.amazonaws.com'
});

var desiredState = {
    "pump": {
        "on": true,
        "startTime": 0
    }
};

exports.handler = (event, context, callback) => {
    const sensor = event.sensor;
    const value = parseInt(event.value);

    if (sensor != "moisture" || value > moistureThreshold) {
        return;
    }
    
    iotdata.updateThingShadow({
        thingName: pump,
        payload: JSON.stringify({
            state: { desired: desiredState }
        })
    }, function(err, data) {
        if (err) {
            console.error('Error', err);
        } else {
            console.log('Success', data);
        }
    });

    // callback(null, null);
};
