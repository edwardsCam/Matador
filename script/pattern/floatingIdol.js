var floatingIdol = blankPattern({
    shapeColor: 0xee0a10,
    shapeShine: 100,
    lightCycleTime: 16,
    rowSize: 6,
    cubeSize: 0.35,
    spread: 1
});

(function() {
    var p = floatingIdol.params, // params shorthand
        indices,
        clipPlanes,
        clipMaterial,
        object,
        dirLight;

    floatingIdol.init = function() {
        indices = getIndices();
        clipMaterial = new THREE.MeshPhongMaterial({
            color: p.shapeColor,
            shininess: p.shapeShine,
            side: THREE.DoubleSide,
            clippingPlanes: buildPlanes(getVertices(0.0001), indices)
        });
        var box = new THREE.BoxBufferGeometry(p.cubeSize, p.cubeSize, p.cubeSize),
            dist = p.spread * 2 / (p.rowSize - 1);
        object = new THREE.Group();
        for (var z = -p.spread; z <= p.spread; z += dist) {
            for (var y = -p.spread; y <= p.spread; y += dist) {
                for (var x = -p.spread; x <= p.spread; x += dist) {
                    var mesh = new THREE.Mesh(box, clipMaterial);
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
        clipMaterial.clippingPlanes = buildPlanes(
            getVertices((boostbuffer - (boostbuffer - boost)) / 100),
            indices
        );
        dirLight.position.x = Math.sin(sinetime / p.lightCycleTime);
        dirLight.position.z = Math.cos(sinetime / (p.lightCycleTime * 2));
        dirLight.position.y = Math.sin(sinetime / (p.lightCycleTime * 3));
    };

    floatingIdol.destroy = function() {
        scene.remove(dirLight);
        scene.remove(object);
        reset(dirLight);
        reset(object);
    };

    function buildPlanes(vertices, indices) {
        var ret = [];
        for (var i = 0; i < indices.length; i++) {
            var v0 = indices[i][0],
                v1 = indices[i][1],
                v2 = indices[i][2];
            ret.push(
                new THREE.Plane().setFromCoplanarPoints(vertices[v0], vertices[v1], vertices[v2])
            );
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
