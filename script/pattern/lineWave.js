var lineWave = blankPattern({
    rowSize: 16, // number of waves
    resolution: 256, // quantization level of each wave
    wavetime: 4, // time, in seconds, it takes the wave to reach the end
    amplitude: 0.05,
});

(function() {
    var p, // params shorthand
        waveUpdateTime, // the amount of time between updates on the wave
        waveReach, // number of levels back the wave has reached. This is only useful at the beginning, before the wave has first reached the very end.
        lines; // array of geometry objects

    lineWave.init = function() {
        for (var x = 0; x < p.rowSize; x++) {
            var lineGeom = new THREE.Geometry();
            lineGeom.dynamic = true;
            for (var z = 0; z <= p.resolution; z++) {
                lineGeom.vertices.push(new THREE.Vector3(
                    twoPoint(x, 0, -1, p.rowSize - 1, 1),
                    0,
                    twoPoint(z, 0, -2, p.resolution, 2)));
            }
            //soundBuckets.push(0);
            scene.add(new THREE.Line(lineGeom, new THREE.LineBasicMaterial({
                color: 0x00afd8
            })));
            lines.push(lineGeom);
        }

        p = lineWave.params;
        waveUpdateTime = p.wavetime / p.resolution;
        waveReach = 0;
        lines = [];
    };
    
    lineWave.destroy = function() {
        for (var i = 0; i < p.rowSize; i++) {
            lines[i].dispose();
        }
    };

    lineWave.draw = function() {
        if (timebuff >= waveUpdateTime) {
            timebuff -= waveUpdateTime;
            if (waveReach < p.resolution) waveReach++;

            _.map(lines, setWaveVal);
            for (var i = waveReach; i > 0; i--) {
                _.map(lines, function(l) {
                    l.vertices[i].y = l.vertices[i - 1].y;
                });
            }
            _.map(lines, markForUpdate);
        }

        function setWaveVal(l) {
            l.vertices[0].y = Math.random() * p.amplitude;
        }

        function markForUpdate(l) {
            l.verticesNeedUpdate = true;
        }
    };
})();
