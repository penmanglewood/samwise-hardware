/**
 * Samwise Gardner
 * Keep your garden beautiful, even while on your epic adventure
 *
 * Authors: The Fellowship
 */

var grove = require('jsupm_grove');
var awsIot = require('aws-iot-device-sdk');
var Pump = require('./bits/pump.js');

// Setup
//
var thingShadows = awsIot.thingShadow({
  keyPath: process.env.AWS_IOT_KEYPATH,
  certPath: process.env.AWS_IOT_KEYPATH,
  caPath: process.env.AWS_IOT_KEYPATH,
  clientId: process.env.AWS_IOT_CLIENTID,
  region: process.env.AWS_IOT_REGION
});
