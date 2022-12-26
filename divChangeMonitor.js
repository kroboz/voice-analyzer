function DivMonitor(cfg) {
  this.selector = cfg.selector;
  this.onChange = cfg.onChange;
  this.onIntervalChange = cfg.onIntervalChange;
  this.interval = cfg.interval;
  this.lastChanged = null;
  this.init();
}

DivMonitor.prototype.init = function() {
  var dm = this;
  document.getElementById(this.selector).addEventListener("input", 
    function() {
    dm.onChange();
    dm.lastChanged = Date.now();
  }, false);

  var dm = this;
  setInterval(function() {
    if (dm.lastChanged == null)
      return;

    var now = Date.now();
    var diff = now - dm.lastChanged;
    if (diff < dm.interval)
      return;

    dm.onIntervalChange();
    dm.lastChanged = null;
  }, dm.interval);
}
