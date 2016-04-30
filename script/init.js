var scene,
    camera,
    renderer,
    geometry,
    clock,
    time,
    timebuff = 0, // a buffer, to be used for time-based increment stuff
    delta,
    step, // the distance to move forward each frame
    particleSystem,
    particles,
    particleRowSize = 128,
    soundBuckets = [],
    currentPattern = function() {},
    movespeed = 0.1,
    mousepos = {
        x: 0,
        y: 0
    };

(function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    clock = new THREE.Clock();
    geometry = new THREE.Geometry();
    particles = new THREE.Geometry();

    camera.position.z = -3;
    camera.rotation.y = Math.PI;
    camera.position.y = 0.25;
    geometry.dynamic = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x444444, 1);
    document.body.appendChild(renderer.domElement);

    for (var z = 0; z < particleRowSize; z++) {
        for (var x = 0; x < particleRowSize; x++) {
            particles.vertices.push(new THREE.Vector3(
                twoPoint(x, 0, -1, particleRowSize - 1, 1),
                0,
                twoPoint(z, 0, -2, particleRowSize - 1, 2)));
        }
        soundBuckets.push(0);
    }
    particleSystem = new THREE.Points(particles, new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.005
    }));

    document.addEventListener('mousemove', function(e) {
        mousepos = normalizeScreenPos(e.clientX, e.clientY);
    });
})();

function clocktick() {
    time = clock.elapsedTime;
    sinetime = time * Math.PI * 2;
    delta = clock.getDelta();
    step = delta * movespeed;
    timebuff += delta;
}
