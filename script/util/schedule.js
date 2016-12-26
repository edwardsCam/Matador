var schedule = (function() {

    var time = 0;
    var delta = 0;

    return {
        init: function() {
            time = 0;
        },
        setTime: function(clock) {
            time = clock.elapsedTime;
            delta = clock.getDelta();
        },
        time: function() {
            return time;
        },
        getStep: function(movespeed) {
            return delta * movespeed;
        },
        sinetime: function(period, phase, amplitude) {
            return amplitude * Math.sin(trig(time, period, phase));
        },
        costime: function(period, phase, amplitude) {
            return amplitude * Math.cos(trig(time, period, phase));
        },
    };

    function trig(time, period, phase) {
        return (time * Math.PI * 2 / period) + phase;
    }

})();
