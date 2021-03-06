var lineWave = blankPattern({
    rowSize: 128, // number of waves
    resolution: 128, // quantization level of each wave
    wavetime: 2.4, // time, in seconds, it takes the wave to reach the end
    amplitude: 2,
    xwidth: 4,
    zwidth: 6
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
                    twoPoint(x, 0, -p.xwidth, p.rowSize - 1, p.xwidth),
                    0,
                    twoPoint(z, 0, -p.zwidth, p.resolution, p.zwidth)));
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
        timebuff[0] = 0;
    };
    lineWave.draw = function() {
        if (timebuff[0] > waveUpdateTime) {
            timebuff[0] -= waveUpdateTime;
            waveTick();
        }
        /*
        if (timebuff[1] > beatTime) {
            timebuff[1] -= beatTime;
            beatTick();
        }
        */
    };

    function waveTick() {
        if (waveReach < p.resolution) waveReach++;
        _.map(lines, setWaveVal);
        for (var i = waveReach; i > 0; i--) {
            for (var j = 0; j < p.rowSize; j++) {
                var g = lines[j].geometry;
                g.vertices[i].dval = g.vertices[i - 1].dval;
                g.vertices[i].y = g.vertices[i].dval * (1 - (i / waveReach));
                if (i === 1) g.verticesNeedUpdate = true;
            }
        }
        function setWaveVal(l, i) {
            var v = l.geometry.vertices[0];
            v.y = p.amplitude * soundBuckets[i] * 2 / fftSize;
            v.y = isNaN(v.y) ? 0 : v.y;
            v.dval = v.y;
        }
    }
    //function beatTick() {}
})();
