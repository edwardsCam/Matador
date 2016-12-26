var scene, camera, renderer, geometry, controls, clock, soundBuckets, movespeed, patterns = [];
var center;

(function() {
    initGlobals();

    scene.add(new THREE.AmbientLight(0x202816));
    geometry.dynamic = true;
    camera.lookAt(new THREE.Vector3(0, 0, Number.MAX_SAFE_INTEGER));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202816, 1);
    renderer.localClippingEnabled = true;

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', IO.mouseMove);
    window.addEventListener('resize', resizeWindow, false);

    function initGlobals() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        geometry = new THREE.Geometry();
        clock = new THREE.Clock();
        center = new THREE.Vector3(),
        soundBuckets = []; // buckets for sound values at each quantization level
        movespeed = 0.5;
    }

    function resizeWindow(e) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
})();
