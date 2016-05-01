var clippingShape = blankPattern({
    bouncePeriod: 0.2,
    bounceOffset: 0.95
});

(function() {
    var p = clippingShape.params,
        clipMaterial,
        object,
        Planes,
        dirLight,
        transform,
        tmpMatrix;

    clippingShape.init = function() {
        var vertices = [
                new THREE.Vector3(1, 0, Math.SQRT1_2),
                new THREE.Vector3(-1, 0, Math.SQRT1_2),
                new THREE.Vector3(0, 1, -Math.SQRT1_2),
                new THREE.Vector3(0, -1, -Math.SQRT1_2)
            ],
            indices = [0, 1, 2, 0, 2, 3, 0, 3, 1, 1, 3, 2];
        Planes = planesFromMesh(vertices, indices);
        dirLight = new THREE.DirectionalLight(0x55505a, 1);
        dirLight.position.set(0, 2, 0);
        dirLight.castShadow = true;

        clipMaterial = new THREE.MeshPhongMaterial({
            color: 0xee0a10,
            shininess: 100,
            side: THREE.DoubleSide,
            clippingPlanes: createPlanes(Planes.length),
            clipShadows: true
        });
        object = new THREE.Group();
        var geo = new THREE.BoxBufferGeometry(0.18, 0.18, 0.18);
        for (var z = -2; z <= 2; ++z) {
            for (var y = -2; y <= 2; ++y) {
                for (var x = -2; x <= 2; ++x) {
                    var mesh = new THREE.Mesh(geo, clipMaterial);
                    mesh.position.set(x / 5, y / 5, z / 5);
                    mesh.castShadow = true;
                    object.add(mesh);
                }
            }
        }

        scene.add(dirLight);
        scene.add(object);

        transform = new THREE.Matrix4();
        tmpMatrix = new THREE.Matrix4();

        function planesFromMesh(vertices, indices) {
            // creates a clipping volume from a convex triangular mesh
            // specified by the arrays 'vertices' and 'indices'
            var n = indices.length / 3,
                result = new Array(n);
            for (var i = 0, j = 0; i < n; ++i, j += 3) {
                var a = vertices[indices[j]],
                    b = vertices[indices[j + 1]],
                    c = vertices[indices[j + 2]];
                result[i] = new THREE.Plane().
                setFromCoplanarPoints(a, b, c);
            }
            return result;
        }

        function createPlanes(n) {
            // creates an array of n uninitialized plane objects
            var result = new Array(n);
            for (var i = 0; i !== n; ++i)
                result[i] = new THREE.Plane();
            return result;
        }
    };
    clippingShape.destroy = function() {
        reset(clipMaterial);
        reset(object);
        reset(Planes);
        reset(dirLight);
        reset(transform);
        reset(tmpMatrix);

        scene.remove(dirLight);
        scene.remove(object);
    };
    clippingShape.draw = function() {
        object.rotation.y = time * 0.2;
        var bouncy = Math.cos(sinetime * p.bouncePeriod) + p.bounceOffset;
        transform.copy(object.matrix);
        transform.multiply(tmpMatrix.makeScale(bouncy, bouncy, bouncy));
        assignTransformedPlanes(clipMaterial.clippingPlanes, Planes, transform);

        function assignTransformedPlanes(planesOut, planesIn, matrix) {
            // sets an array of existing planes to transformed 'planesIn'
            for (var i = 0, n = planesIn.length; i !== n; ++i) {
                planesOut[i].copy(planesIn[i]).applyMatrix4(matrix);
            }
        }
    }
})();
