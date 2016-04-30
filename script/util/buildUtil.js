var build = {
    color: function(hex) {
        return new THREE.Color(hex);
    },
    face: function(p1, p2, p3, normal, color) {
        return new THREE.Face3(p1, p2, p3, normal, color);
    },
    line: function(g, m) {
        if (typeof m === 'number') {
            m = new THREE.LineBasicMaterial({
                color: m
            });
        }
        return new THREE.Line(g, m);
    },
    mesh: function(g, m) {
        if (typeof m === 'number') {
            m = new THREE.MeshBasicMaterial({
                color: m,
                side: THREE.DoubleSide
            });
        }
        return new THREE.Mesh(g, m);
    },
    points: function(g, m) {
        return new THREE.Points(g, m);
    },
    vector3: function(x, y, z) {
        return new THREE.Vector3(x, y, z);
    },
    vector2: function(p, z) {
        return new THREE.Vector3(p.x, p.y, z);
    },
    vector1: function(p) {
        return new THREE.Vector3(p.x, p.y, p.z);
    }
};
