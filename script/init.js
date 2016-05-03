var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer(),
    geometry = new THREE.Geometry(),
    controls = new THREE.OrbitControls(camera),
    clock = new THREE.Clock(),
    time = 0,
    sinetime = 0,
    timebuff = [0, 0], // buffers to be used for time-based increment stuff
    delta = 0,
    step = 0, // the distance to move forward each frame
    soundBuckets = [], // buckets for sound values at each quantization levels
    currentPattern = null,
    movespeed = 0.1,
    mousepos = {
        x: 0,
        y: 0
    };

camera.position.z = -7;
camera.position.x = -1;
camera.position.y = 2;
geometry.dynamic = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x444444, 1);
renderer.localClippingEnabled = true;

document.body.appendChild(renderer.domElement);
document.addEventListener('mousemove', function(e) {
    mousepos = normalizeScreenPos(e.clientX, e.clientY);
});
