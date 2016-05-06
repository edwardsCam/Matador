var floatingIdol = blankPattern({
    shapeColor: 0xee0a10,
    shapeShine: 100,
    lightCycleTime: 16
});

(function() {
    var p = floatingIdol.params, // params shorthand
        vertices,
        indices,
        clipPlanes,
        clipMaterial,
        object,
        dirLight;

    floatingIdol.init = function() {
        indices = getIndices();
        vertices = getVertices(0.0001);
        clipMaterial = new THREE.MeshPhongMaterial({
            color: p.shapeColor,
            shininess: p.shapeShine,
            side: THREE.DoubleSide,
            clippingPlanes: buildPlanes(vertices, indices)
        });
        object = new THREE.Group();
        var geo = new THREE.BoxBufferGeometry(0.18, 0.18, 0.18);
        for (var z = -0.4; z <= 0.4; z += 0.2) {
            for (var y = -0.4; y <= 0.4; y += 0.2) {
                for (var x = -0.4; x <= 0.4; x += 0.2) {
                    var mesh = new THREE.Mesh(geo, clipMaterial);
                    mesh.position.set(x, y, z);
                    object.add(mesh);
                }
            }
        }

        dirLight = new THREE.DirectionalLight(0x55505a, 2);
        dirLight.position.set(1, 2, 0);

        scene.add(dirLight);
        scene.add(object);
    };

    floatingIdol.draw = function() {
        vertices = getVertices(boost / 200);
        clipMaterial.clippingPlanes = buildPlanes(vertices, indices);
        dirLight.position.x = Math.sin(sinetime / p.lightCycleTime);
        dirLight.position.z = Math.cos(sinetime / (p.lightCycleTime * 2));
        dirLight.position.y = Math.sin(sinetime / (p.lightCycleTime * 3));
    };

    floatingIdol.destroy = function() {};

    function buildPlanes(vertices, indices) {
        var ret = [];
        for (var i = 0; i < indices.length; i++) {
            var v0 = indices[i][0],
                v1 = indices[i][1],
                v2 = indices[i][2];
            var plane = new THREE.Plane().setFromCoplanarPoints(vertices[v0], vertices[v1], vertices[v2]);
            ret.push(plane);
        }
        return ret;
    }

    function getVertices(r) {
        var d = r * 2 / Math.SQRT2;
        return [
            new THREE.Vector3(d, 0, 0),
            new THREE.Vector3(-d, 0, 0),
            new THREE.Vector3(0, d, 0),
            new THREE.Vector3(0, -d, 0),
            new THREE.Vector3(0, 0, d),
            new THREE.Vector3(0, 0, -d)
        ];
    }

    function getIndices() {
        return [
            [0, 2, 5],
            [0, 4, 2],
            [1, 2, 4],
            [1, 5, 2],
            [0, 5, 3],
            [0, 3, 4],
            [1, 3, 5],
            [1, 4, 3]
        ];
    }
})();
