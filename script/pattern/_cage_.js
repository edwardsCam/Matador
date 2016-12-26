function _Cage_(n, dist) {

    var squares = [];

    this.init = function() {
        _.times(n, function(i) {
            var m = new THREE.LineBasicMaterial({
                color: 0xb1cc7e
            });
            var geo = new THREE.Geometry();
            geo.vertices.push(new THREE.Vector3(1, 1, i * dist));
            geo.vertices.push(new THREE.Vector3(1, -1, i * dist));
            geo.vertices.push(new THREE.Vector3(-1, -1, i * dist));
            geo.vertices.push(new THREE.Vector3(-1, 1, i * dist));
            geo.vertices.push(new THREE.Vector3(1, 1, i * dist));
            geo.verticesNeedUpdate = true;

            var line = new THREE.Line(geo, m);
            squares.push(line);
            scene.add(line);
        });
        schedule.init();

    };

    this.destroy = function() {};

    this.draw = function() {

        for (var i = 0; i < n - 1; i++) {
            var s1 = squares[i].geometry.vertices,
                s2 = squares[i + 1].geometry.vertices;
            s1[0].x = s2[0].x;
            s1[0].y = s2[0].y;
            s1[1].x = s2[1].x;
            s1[1].y = s2[1].y;
            s1[2].x = s2[2].x;
            s1[2].y = s2[2].y;
            s1[3].x = s2[3].x;
            s1[3].y = s2[3].y;
            s1[4].x = s2[4].x;
            s1[4].y = s2[4].y;
            squares[i].geometry.verticesNeedUpdate = true;
        }

        var amp = schedule.sinetime(10, 0, 0.075) + 0.05,
            sinetime = schedule.sinetime(6, 0, amp),
            costime = schedule.costime(4, 0, amp);

        var s = squares[n - 1],
            v = s.geometry.vertices;

        v[0].x += sinetime;
        v[0].y += costime;

        v[1].x -= costime;
        v[1].y -= sinetime;

        v[2].x -= sinetime;
        v[2].y -= costime;

        v[3].x += costime;
        v[3].y += sinetime;

        v[4].x += sinetime;
        v[4].y += costime;

        s.geometry.verticesNeedUpdate = true;

    };

}
