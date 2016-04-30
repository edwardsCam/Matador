var particleWave = blankPattern({
    rowSize: 128, // number of waves
    wavetime: 2, // time, in seconds, it takes the wave to reach the end
    amplitude: 0.02,
});

(function() {
    var p = particleWave.params, // params shorthand
        waveUpdateTime = p.wavetime / p.rowSize, // the amount of time between updates on the wave
        waveReach = 0, // number of levels back the wave has reached. This is only useful at the beginning, before the wave has first reached the very end.
        particles,
        particleSystem;

    particleWave.init = function() {
        particles = new THREE.Geometry();
        for (var z = 0; z < p.rowSize; z++) {
            for (var x = 0; x < p.rowSize; x++) {
                particles.vertices.push(new THREE.Vector3(
                    twoPoint(x, 0, -1, p.rowSize - 1, 1),
                    0,
                    twoPoint(z, 0, -2, p.rowSize - 1, 2)));
            }
            //soundBuckets.push(0);
        }
        particleSystem = new THREE.Points(particles, new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.005
        }));
        scene.add(particleSystem);
    };

    particleWave.destroy = function() {
        reset(particles);
        scene.remove(particleSystem);
        particleSystem = undefined;
        particles = undefined;
        timebuff = 0;
    };

    particleWave.draw = function() {
        if (timebuff >= waveUpdateTime) {
            timebuff -= waveUpdateTime;
            if (waveReach < p.rowSize - 1) waveReach++;
            for (var i = 0; i < p.rowSize; i++) {
                particles.vertices[i].y = Math.random() * p.amplitude;
            }
            for (var i = waveReach; i > 0; i--) {
                for (var j = 0; j < p.rowSize; j++) {
                    var p1 = particles.vertices[j + p.rowSize * (i - 1)],
                        p2 = particles.vertices[j + p.rowSize * i];
                    p2.y = p1.y;
                }
            }
        }
        particles.verticesNeedUpdate = true;
    };
})();
