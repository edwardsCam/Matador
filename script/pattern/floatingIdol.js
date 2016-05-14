var floatingIdol = blankPattern({
    shapeColor: 0xee0a10,
    shapeShine: 100,
    lightCycleTime: 16,
    rowSize: 6,
    cubeSize: 0.3,
    spread: 0.75,
    particleCount: 1000,
    particleSize: 0.05
});

(function() {
    var p = floatingIdol.params, // params shorthand
        indices,
        clipPlanes,
        clipMaterial,
        object,
        lights,
        particleSystems;

    floatingIdol.init = function() {
        indices = initIndices();
        clipMaterial = initClipMaterial();
        object = initShape();
        particleSystems = initParticles();
        lights = initLights();

        function initIndices() {
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

        function initClipMaterial() {
            return new THREE.MeshPhongMaterial({
                color: p.shapeColor,
                shininess: p.shapeShine,
                side: THREE.DoubleSide,
                clippingPlanes: buildPlanes(0, indices)
            });
        }

        function initShape() {
            var ret = new THREE.Group(),
                box = new THREE.BoxBufferGeometry(p.cubeSize, p.cubeSize, p.cubeSize),
                dist = p.spread * 2 / (p.rowSize - 1);
            for (var z = -p.spread; z <= p.spread; z += dist) {
                for (var y = -p.spread; y <= p.spread; y += dist) {
                    for (var x = -p.spread; x <= p.spread; x += dist) {
                        var mesh = new THREE.Mesh(box, clipMaterial);
                        mesh.position.set(x, y, z);
                        ret.add(mesh);
                    }
                }
            }
            scene.add(ret);
            return ret;
        }

        function initLights() {
            var dlight = new THREE.DirectionalLight(0x55505a, 2),
                slight = new THREE.SpotLight(0xffffff);
            dlight.position.set(1, 2, 0);
            slight.position.set(2, 7, 3);
            slight.angle = Math.PI / 5;
            slight.penumbra = 0.2;
            slight.castShadow = true;
            slight.shadow.camera.near = 3;
            slight.shadow.camera.far = 10;
            slight.shadow.mapSize.width = 1024;
            slight.shadow.mapSize.height = 1024;
            scene.add(dlight);
            scene.add(slight);
            return [dlight, slight];
        }

        function initParticles() {
            var systems = [],
                systemCount = 3;

            var particleMaterial = new THREE.PointsMaterial({
                color: 0x00afd8,
                size: p.particleSize
            });
            for (var s = 0; s < systemCount; s++) {
                var particleGeometry = new THREE.Geometry();
                for (var i = 0; i < p.particleCount; i++) {
                    var pX = Math.random() * 8 - 4,
                        pY = Math.random() * 8 - 4,
                        pZ = Math.random() * 8 - 4,
                        particle = new THREE.Vector3(pX, pY, pZ);
                    particleGeometry.vertices.push(particle);
                }
                var system = new THREE.Points(particleGeometry, particleMaterial);
                scene.add(system);
                systems.push(system);
            }
            return systems;
        }
    };

    floatingIdol.draw = function() {
        var sLevel = (boostbuffer - (boostbuffer - boost)) / 100;
        clipMaterial.clippingPlanes = buildPlanes(sLevel, indices);
        moveLights();
        particleSystems[0].rotation.x += 0.001;
        particleSystems[0].rotation.y -= 0.007;
        particleSystems[0].rotation.z -= 0.002;

        particleSystems[1].rotation.x += 0.0005;
        particleSystems[1].rotation.y += 0.0008;
        particleSystems[1].rotation.z -= 0.001;

        particleSystems[2].rotation.x -= 0.001;
        particleSystems[2].rotation.y += 0.002;
        particleSystems[2].rotation.z += 0.001;
    };

    floatingIdol.destroy = function() {
        for (var l = 0; l < lights.length; l++) {
            scene.remove(lights[l]);
            reset(lights[l]);
        }
        scene.remove(object);
        reset(object);
    };

    function buildPlanes(r, indices) {
        var vertices = getVertices(r);
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
        if (d === 0) d = Number.MIN_VALUE;
        return [
            new THREE.Vector3(d, 0, 0),
            new THREE.Vector3(-d, 0, 0),
            new THREE.Vector3(0, d, 0),
            new THREE.Vector3(0, -d, 0),
            new THREE.Vector3(0, 0, d),
            new THREE.Vector3(0, 0, -d)
        ];
    }

    function moveLights() {
        lights[0].position.x = Math.sin(sinetime / p.lightCycleTime);
        lights[0].position.z = Math.cos(sinetime / (p.lightCycleTime * 2));
        lights[0].position.y = Math.sin(sinetime / (p.lightCycleTime * 3));
    }
})();
