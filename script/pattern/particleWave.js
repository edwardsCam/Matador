var particleWave = blankPattern();

(function() {
    var particleRowSize = 128,
        particles,
        wavetime = 2, // time, in seconds, it takes the wave to reach the end
        amplitude = 0.02,
        waveUpdateTime = wavetime / particleRowSize, // the amount of time between updates on the wave
        waveReach = 0; // number of levels back the wave has reached. This is only useful at the beginning, before the wave has first reached the very end.

    particleWave.init = function() {
        particles = new THREE.Geometry();
        for (var z = 0; z < particleRowSize; z++) {
            for (var x = 0; x < particleRowSize; x++) {
                particles.vertices.push(new THREE.Vector3(
                    twoPoint(x, 0, -1, particleRowSize - 1, 1),
                    0,
                    twoPoint(z, 0, -2, particleRowSize - 1, 2)));
            }
            soundBuckets.push(0);
        }
        scene.add(new THREE.Points(particles, new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.005
        })));
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
