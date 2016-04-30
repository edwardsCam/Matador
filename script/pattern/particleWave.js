var particleWave = blankPattern();

(function() {
    var wavetime = 2, // time, in seconds, it takes the wave to reach the end
        amplitude = 0.02,
        waveUpdateTime = wavetime / particleRowSize, // the amount of time between updates on the wave
        waveReach = 0; // number of levels back the wave has reached. This is only useful at the beginning, before the wave has first reached the very end.

    particleWave.init = function() {
        scene.add(particleSystem);
    };
    particleWave.draw = function() {
        if (timebuff >= waveUpdateTime) {
            timebuff -= waveUpdateTime;
            if (waveReach < particleRowSize - 1) waveReach++;
            for (var i = 0; i < particleRowSize; i++) {
                particles.vertices[i].y = Math.random() * amplitude;
            }
            for (var i = waveReach; i > 0; i--) {
                for (var j = 0; j < particleRowSize; j++) {
                    var p1 = particles.vertices[j + particleRowSize * (i - 1)],
                        p2 = particles.vertices[j + particleRowSize * i];
                    p2.y = p1.y;
                }
            }
        }
        particles.verticesNeedUpdate = true;
    };
})();
