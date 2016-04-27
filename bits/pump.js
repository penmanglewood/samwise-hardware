var grove = require('jsupm_grove');

var Pump = function() {
  this.switch = new grove.GroveRelay(5);

  this.maxRunTime = 5000;
  this.runTimeoutId = 0;
  this.state = {
    on: false,
    startTime: 0
  };
};

Pump.prototype.on = function() {
  var that = this;
  if (!this.state.on) {
    console.log("Pump on");
    this.state.on = true;
    this.state.startTime = Date.now();
    this.switch.on();
    this.runTimeoutId = setTimeout(function() {
      that.off();
    }, this.maxRunTime);
  }
};

Pump.prototype.off = function() {
  if (this.state.on) {
    console.log("Pump off");
    this.state.on = false;
    this.state.stopTime = Date.now();
    clearInterval(this.runTimeoutId);
    this.switch.off();
  }
};

module.exports = new Pump();
