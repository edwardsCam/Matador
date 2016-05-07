var clippingShape = blankPattern({
    shapeColor: 0xee0a10,
    shapeShine: 100,
    bouncePeriod: 0.2,
    bounceOffset: 0.95
});

(function() {
    var p = clippingShape.params,
        clipPlanes,
        clipMaterial,
        object,
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
        clipPlanes = planesFromMesh(vertices, indices);
        clipMaterial = new THREE.MeshPhongMaterial({
            color: p.shapeColor,
            shininess: p.shapeShine,
            side: THREE.DoubleSide,
            clippingPlanes: clipPlanes
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

        transform = new THREE.Matrix4();
        tmpMatrix = new THREE.Matrix4();
        dirLight = new THREE.DirectionalLight(0x55505a, 1);
        dirLight.position.set(0, 2, 0);

        scene.add(dirLight);
        scene.add(object);

        function planesFromMesh(vertices, indices) {
            // creates a clipping volume from a convex triangular mesh
            // specified by the arrays 'vertices' and 'indices'
            var n = indices.length / 3,
                result = new Array(n);
            for (var i = 0, j = 0; i < n; ++i, j += 3) {
                var a = vertices[indices[j]],
                    b = vertices[indices[j + 1]],
                    c = vertices[indices[j + 2]];
                result[i] = new THREE.Plane().setFromCoplanarPoints(a, b, c);
            }
            return result;
        }
    };
    clippingShape.destroy = function() {
        reset(clipMaterial);
        reset(object);
        reset(clipPlanes);
        reset(dirLight);
        reset(transform);
        reset(tmpMatrix);

        scene.remove(dirLight);
        scene.remove(object);
    };
    clippingShape.draw = function() {
        object.rotation.y = time * 0.2;
        object.rotation.x = time * 0.1;
        var bouncy = Math.cos(sinetime * p.bouncePeriod) + p.bounceOffset;
        //transform.copy(object.matrix);
        //transform.multiply(tmpMatrix.makeScale(bouncy, bouncy, bouncy));
        assignTransformedPlanes(clipMaterial.clippingPlanes, clipPlanes, transform);

        console.log(audioListener.gain);

        function assignTransformedPlanes(planesOut, planesIn, matrix) {
            // sets an array of existing planes to transformed 'planesIn'
            for (var i = 0, n = planesIn.length; i !== n; ++i) {
                planesOut[i].copy(planesIn[i]).applyMatrix4(matrix);
            }
        }
    }
})();
