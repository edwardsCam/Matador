var scene,
    camera,
    renderer,
    geometry,
    clock,
    time,
    timebuff = 0, // a buffer, to be used for time-based increment stuff
    delta,
    step, // the distance to move forward each frame
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

    camera.position.z = -3;
    camera.rotation.y = Math.PI;
    camera.position.y = 0.25;
    geometry.dynamic = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x444444, 1);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', function(e) {
        mousepos = normalizeScreenPos(e.clientX, e.clientY);
    });
})();

function clocktick() {
    time = clock.elapsedTime;
    delta = clock.getDelta();
    step = delta * movespeed;
    timebuff += delta;
}

function blankPattern() {
    return {
        init: function() {},
        destroy: function() {},
        draw: function() {}
    }
}
