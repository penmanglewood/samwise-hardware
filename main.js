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
    clientTokenUpdate = thingShadows.update('samwise', Pump.awsIotState());
  }, 5000);
});

thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
  console.log("Received " + stat + " on " + thingName + ": " + JSON.stringify(stateObject));
});

// TODO listen to timeout
