'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    // callback(null, JSON.stringify(event, null, 2));

    var sensorName = event.params.querystring.sensor;
    var ts = parseInt(event.params.querystring.timestamp);

    var queryObj = {};
    queryObj.TableName = "sensors";

    queryObj.KeyConditions = [
        dynamo.Condition("sensor", "EQ", sensorName)
    ];
    
    if (ts > 0) {
        queryObj.KeyConditions.push(
            dynamo.Condition("timestamp", "GT", ts)
        );
    } else {
        queryObj.Limit = 1;
        queryObj.ScanIndexForward = false;
    } 

    dynamo.query(queryObj, callback);
};
