/**
 * Samwise Gardner
 * Keep your garden beautiful, even while on your epic adventure
 *
 * Authors: The Fellowship
 */

var grove = require('jsupm_grove');
var awsIot = require('aws-iot-device-sdk');
var Pump = require('./bits/pump.js');

// Unique client id per aws account
var clientId = "rubio-edison";

// Setup
//
var thingShadows = awsIot.thingShadow({
  keyPath: process.env.AWS_IOT_KEYPATH,
  certPath: process.env.AWS_IOT_CERTPATH,
  caPath: process.env.AWS_IOT_CAPATH,
  clientId: clientId,
  region: process.env.AWS_IOT_REGION
});

var clientTokenUpdate;

thingShadows.on('connect', function(){
  thingShadows.register('samwise');
  setTimeout(function(){
    console.log("Connected to AWS IoT");
    clientTokenUpdate = thingShadows.update('samwise', Pump.awsIotState());
  }, 5000);
});

thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
  console.log("Received " + stat + " on " + thingName + ": " + JSON.stringify(stateObject));
});

thingShadows.on('delta', function(thingName, stateObject) {
  console.log("Received delta on " + thingName + ": " + JSON.stringify(stateObject));
  if (stateObject.state.pump.on) {
    Pump.on();
  } else {
    Pump.off();
  }
});

thingShadows.on('timeout', function(thingName, clientToken) {
  console.log("Received timeout on " + thingName + " with token: " + clientToken);
});

