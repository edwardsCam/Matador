// increment counters and get the delta since last tick
function clocktick() {
    time = clock.elapsedTime;
    delta = clock.getDelta();
    sinetime = time * Math.PI * 2;
    //step = delta * movespeed;
    timebuff[0] += delta;
    if (audioStarted) {
        timebuff[1] += delta;
    }
}

function blankPattern(prms) {
    return {
        params: prms ? prms : {}, // programmer-defined values that can be used to tweak behavior of patterns
        init: function() {}, // one-time function for building necessary objects
        destroy: function() {}, // one-time function for clearing memory and resetting any variables that may be used by another pattern
        draw: function() {} // called every frame. responsible for altering model, not view.
    };
}
