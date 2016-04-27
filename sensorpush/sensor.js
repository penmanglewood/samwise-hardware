/**
 * Gathering metrics and sending them to a MQTT queue
 * @author Wolfram Huesken <wolfram.huesken@zalora.com>
 */

const deviceModule = require('../..').device;
const cmdLineProcess = require('../../examples/lib/cmdline');
const fs = require('fs');

const tempHumiLib = require('jsupm_th02');
const lightSensorLib = require('jsupm_grove');
const uvSensorLib = require('jsupm_guvas12d');
const moistureLib = require('jsupm_grovemoisture');
const g_GUVAS12D_AREF = 5.0;
const g_SAMPLES_PER_QUERY = 1024;

var lightSensor = new lightSensorLib.GroveLight(0); // Analog Port 0
var thSensor = new tempHumiLib.TH02(); // I2C
var uvSensor = new uvSensorLib.GUVAS12D(1); // Analog Port 1
var moistureSensor = new moistureLib.GroveMoisture(2); // Analog Port 2

function sendMetrics(args) {

    const device = deviceModule({
        keyPath: args.privateKey,
        certPath: args.clientCert,
        caPath: args.caCert,
        clientId: args.clientId,
        region: args.region,
        baseReconnectTimeMs: args.baseReconnectTimeMs,
        keepalive: args.keepAlive,
        protocol: args.Protocol,
        port: 8883,
        host: 'A1XERQNHDNAJ9U.iot.ap-northeast-1.amazonaws.com',
        debug: args.Debug
    });

    console.log('Debugging:', args.debug);

    const queue = 'sensors';
    const tempSource = '/sys/class/thermal/thermal_zone0/temp';
    const networkSource = '/proc/net/dev';
    const sendInterval = 60000;

    var date, timeout;

    timeout = setInterval(function() {
        var property;

        var payload = {
           "moisture": getMoisture(),
           "light": getLight(),
           "ultraviolet": getUv(),
           "temperature": getTemperature(),
           "humidity": getHumidity()
        };

        for (prop in payload) {
           publish(payload, prop);
        }
    }, sendInterval);

    function publish(payload, type) {
        var data = {
            "value": payload[type],
            "sensor": type
        };
        device.publish(queue, JSON.stringify(data));
    }

    /**
     * Dry soil: 0 - 300
     * Humid soil: 300 - 700
     * In water: 700 - 950
     */
    function getMoisture() {
        return moistureSensor.value();
    }

    /**
     * 1000 = maximum darkness
     * 2    = maximum brightness
     */
    function getLight() {
        return lightSensor.raw_value();
    }

    /**
     *
     * 1 = low
     * 500 = high
     */
    function getUv() {
        return roundNum(uvSensor.value(g_GUVAS12D_AREF, g_SAMPLES_PER_QUERY), 6);
    }

    /**
     * Temperature in Celsius
     */
    function getTemperature() {
        return thSensor.getTemperature();
    }

    /**
     * Air Humidity in % (0-80)
     */
    function getHumidity() {
        return thSensor.getHumidity();
    }

    function roundNum(num, decimalPlaces) {
        var extraNum = (1 / (Math.pow(10, decimalPlaces) * 1000));
        return (Math.round((num + extraNum) * (Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces));
    }

    device
        .on('connect', function() {
            console.log('Connected to AWS IoT');
        });

    device
        .on('close', function() {
            console.log('Connection closed');
        });

    device
        .on('reconnect', function() {
            console.log('Reconnected');
        });

    device
        .on('offline', function() {
            console.log('Connection offline');
        });

    device
        .on('error', function(error) {
            console.log('Oh no...', error);
        });

    device
        .on('message', function(topic, payload) {
            console.log('New Message arrived:', topic, payload.toString());
        });
}

module.exports = cmdLineProcess;

if (require.main === module) {
    cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT, test modes 1-2',
        process.argv.slice(2), sendMetrics);
}
