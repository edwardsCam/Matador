var lineWave = blankPattern({
    rowSize: 128, // number of waves
    resolution: 128, // quantization level of each wave
    wavetime: 2.4, // time, in seconds, it takes the wave to reach the end
    amplitude: 0.05,
});

(function() {
    var p = lineWave.params, // params shorthand
        waveUpdateTime = p.wavetime / p.resolution, // the amount of time between updates on the wave
        waveReach = 0, // number of levels back the wave has reached. This is only useful at the beginning, before the wave has first reached the very end.
        lines = []; // array of geometry objects

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
            var line = new THREE.Line(lineGeom, new THREE.LineBasicMaterial({
                color: 0x00afd8
            }));
            scene.add(line);
            lines.push(line);
        }
    };

    lineWave.destroy = function() {
        for (var i = 0; i < p.rowSize; i++) {
            reset(lines[i].geometry);
            scene.remove(lines[i]);
            lines[i] = undefined;
        }
        lines = undefined;
        timebuff = 0;
    };

    lineWave.draw = function() {
        if (timebuff >= waveUpdateTime) {
            timebuff -= waveUpdateTime;
            if (waveReach < p.resolution) waveReach++;

            _.map(lines, setWaveVal);
            for (var i = waveReach; i > 0; i--) {
                _.map(lines, function(l) {
                    l.geometry.vertices[i].y = l.geometry.vertices[i - 1].y;
                });
            }
            _.map(lines, markForUpdate);
        }

        function setWaveVal(l, i) {
            l.geometry.vertices[0].y = soundBuckets[i] / 1024;
        }

        function markForUpdate(l) {
            l.geometry.verticesNeedUpdate = true;
        }
    };
})();
