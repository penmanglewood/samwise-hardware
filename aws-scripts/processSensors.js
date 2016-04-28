'use strict';

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    const sensor = event.sensor;
    const timestamp = new Date().getTime();
    var data, payload;

    switch (sensor) {
        case "temperature":
        case "moisture":
        case "light":
        case "ultraviolet":
        case "humidity":
            data = parseInt(event.value);
            break;
        default:
            callback('Unknown sensor (' + sensor + ') - Now we all die');
            return;
    }
    
    payload = {
        Item: {
            "sensor": sensor,
            "timestamp": timestamp,
            "value": data,
        },
        TableName: "sensors"
    };

    dynamo.putItem(payload, callback);
};
