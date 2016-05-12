var scene, camera, renderer, geometry, controls, clock, time, sinetime, timebuff, delta, step, soundBuckets, currentPattern, movespeed, mousepos;

window.addEventListener('load', function() {
    initGlobals();

    scene.add(new THREE.AmbientLight(0x505050));
    camera.position.z = -3;
    camera.position.x = -1;
    camera.position.y = 2;
    geometry.dynamic = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x444444, 1);
    renderer.localClippingEnabled = true;

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', resizeWindow, false);

    function initGlobals() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        geometry = new THREE.Geometry();
        controls = new THREE.OrbitControls(camera);
        clock = new THREE.Clock();
        time = 0;
        sinetime = 0;
        timebuff = [0, 0]; // buffers to be used for time-based increment stuff
        delta = 0;
        step = 0; // the distance to move forward each frame
        soundBuckets = []; // buckets for sound values at each quantization level
        currentPattern = null;
        movespeed = 0.1;
        mousepos = {
            x: 0,
            y: 0
        };
    }

    function mouseMove(e) {
        mousepos = normalizeScreenPos(e.clientX, e.clientY);
    }

    function resizeWindow(e) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});
