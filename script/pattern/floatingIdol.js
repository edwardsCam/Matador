var floatingIdol = blankPattern({
    shapeColor: 0xee0a10,
    shapeShine: 100,
    lightCycleTime: 16,
    rowSize: 6,
    cubeSize: 0.3,
    spread: 0.75,
    particleCount: 1000,
    particleSize: 0.05,
    particleColor: 0x00afd8,
    reverb: 20,
    damp: 15
});

(function() {
    var p = floatingIdol.params, // params shorthand
        faceIndices,
        clipPlanes,
        clipMaterial,
        idol,
        lights,
        particleSystems,
        target = 0.01,
        clipRadius = 0.01,
        diff = 0,
        reverbCount = 1,
        reverbTime = beatTime / p.reverb;

    var initFunc = function() {
        faceIndices = initIndices();
        clipMaterial = initClipMaterial(p.shapeColor, p.shapeShine);
        idol = initShape(p.cubeSize, p.spread, p.rowSize, clipMaterial);
        particleSystems = initParticles(p.particleCount, p.particleColor, p.particleSize, 3);
        lights = initLights();

        particleSystems.forEach(addFunc);
        lights.forEach(addFunc);
        scene.add(idol);

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

        function initClipMaterial(color, shine) {
            /*
            return new THREE.MeshDepthMaterial( {
					depthPacking: THREE.RGBADepthPacking,
				//	displacementMap: displacementMap,
					displacementScale: 2.436143,
					displacementBias: -0.428408,
					side: THREE.DoubleSide
				} );
                */
            return new THREE.MeshPhongMaterial({
                color: color,
                shininess: shine,
                side: THREE.DoubleSide,
                clippingPlanes: buildFaces(0, faceIndices)
            });
        }

        function initShape(cubeSize, spread, rowSize, clipMat) {
            var ret = new THREE.Group(),
                box = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize),
                dist = spread * 2 / (rowSize - 1);
            for (var z = -spread; z <= spread; z += dist) {
                for (var y = -spread; y <= spread; y += dist) {
                    for (var x = -spread; x <= spread; x += dist) {
                        var mesh = new THREE.Mesh(box, clipMat);
                        mesh.position.set(x, y, z);
                        ret.add(mesh);
                    }
                }
            }
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
            return [dlight, slight];
        }

        function initParticles(count, color, size, systemCount) {
            var ret = [];
            var particleMaterial = new THREE.PointsMaterial({
                color: color,
                size: size
            });
            for (var s = 0; s < systemCount; s++) {
                var particleGeometry = new THREE.Geometry();
                for (var i = 0; i < count; i++) {
                    var pX = Math.random() * 8 - 4,
                        pY = Math.random() * 8 - 4,
                        pZ = Math.random() * 8 - 4,
                        particle = new THREE.Vector3(pX, pY, pZ);
                    particleGeometry.vertices.push(particle);
                }
                ret.push(new THREE.Points(particleGeometry, particleMaterial));
            }
            return ret;
        }
    };

    var drawFunc = function() {
        moveLights();
        moveParticles();

        if (audioStarted) {
            if (timebuff[2] >= reverbTime) {
                timebuff[2] -= reverbTime;

                var reverbAmp = (p.reverb - reverbCount) / p.reverb;
                reverbAmp /= p.damp;
                reverbAmp *= diff;
                if (reverbCount % 2 === 0) reverbAmp *= -1;
                clipRadius = target + reverbAmp;

                if (++reverbCount > p.reverb) reverbCount = 1;
            }
            if (timebuff[1] >= beatTime) {
                var newTarget = beatSizes[beatCount];
                diff = (newTarget - target) || 0;
                target = newTarget || 0;
                timebuff[1] -= beatTime;

                beatCount++;
            }
        }

        clipMaterial.clippingPlanes = buildFaces(clipRadius, faceIndices);
    };

    var destroyFunc = function() {
        deleteFunc(particleSystems);
        deleteFunc(lights);
        deleteFunc(idol);
    };

    floatingIdol.init = initFunc;
    floatingIdol.draw = drawFunc;
    floatingIdol.destroy = destroyFunc;

    // given a radius, get the list of faces that make up the clipping planes
    function buildFaces(radius, faceIndices) {
        var vertices = getVertices(radius);
        return _.map(faceIndices, function(i) {
            var i0 = i[0],
                i1 = i[1],
                i2 = i[2];
            return new THREE.Plane().setFromCoplanarPoints(vertices[i0], vertices[i1], vertices[i2]);
        });
    }

    // given a radius,
    function getVertices(radius) {
        var d = radius * 2 / Math.SQRT2;
        if (d === 0) d = 0.001;
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

    function moveParticles() {
        particleSystems[0].rotation.x += 0.001;
        particleSystems[0].rotation.y -= 0.007;
        particleSystems[0].rotation.z -= 0.002;
        particleSystems[1].rotation.x += 0.0005;
        particleSystems[1].rotation.y += 0.0008;
        particleSystems[1].rotation.z -= 0.001;
        particleSystems[2].rotation.x -= 0.001;
        particleSystems[2].rotation.y += 0.002;
        particleSystems[2].rotation.z += 0.001;
    }

    function addFunc(obj) {
        scene.add(obj);
    }

    function deleteFunc(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(deleteFunc);
        }
        reset(obj);
    }
})();
