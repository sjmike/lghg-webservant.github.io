var sw = {
  /* [INIT] */
  etime : null, // holds HTML time display
  erst : null, // holds HTML reset button
  ego : null, // holds HTML start/stop button
  timer : null, // timer object
  now : 0, // current timer
  hours : 0,
  mins : 0,
  secs : 0,
  init : function () {
    // Get HTML elements
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-rst");
    sw.erestart = document.getElementById("sw-restart");
    sw.ego = document.getElementById("sw-go");
    sw.check = document.getElementById("sw-check");

    // Attach listeners
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.disabled = false;
    sw.erestart.addEventListener("click", sw.restart);
    sw.erestart.disabled = false;
    sw.ego.addEventListener("click", sw.start);
    sw.ego.disabled = false;
  },

  /* [ACTIONS] */
  tick : function () {
  // tick() : update display if stopwatch running

    // Calculate hours, mins, seconds
    sw.now++;
    var remain = sw.now;
    sw.hours = Math.floor(remain / 3600);
    remain -= sw.hours * 3600;
    sw.mins = Math.floor(remain / 60);
    remain -= sw.mins * 60;
    sw.secs = remain;

    // Update the display timer
    if (sw.hours<10) { sw.hours = "0" + sw.hours; }
    if (sw.mins<10) { sw.mins = "0" + sw.mins; }
    if (sw.secs<10) { sw.secs = "0" + sw.secs; }
    // play chime
    if (sw.check.checked && sw.mins == 3 && sw.secs == 0) playChime(1);
    sw.etime.innerHTML = sw.mins + ":" + sw.secs;
  },

  start : function () {
  // start() : start the stopwatch

    sw.tick();
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Pause";
    sw.ego.src="/images/pause.png";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
  },

  stop  : function () {
  // stop() : stop the stopwatch

    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "Start";
    sw.ego.src="/images/play.png";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  reset : function () {
  // reset() : reset the stopwatch

    // Stop if running
    if (sw.timer != null) { sw.stop(); }

    // Reset time
    sw.etime.innerHTML = "--" + ":" + "--";
    sw.now = -1;
//    sw.tick();
  },

  restart : function () {

      sw.stop();
      sw.reset();
      sw.start();
      sw.tick();
  }

};

window.addEventListener("load", sw.init);
