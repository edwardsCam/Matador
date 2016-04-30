loadPattern(particleWave);
animate();

var test = true;

function animate() {
    clocktick();
    currentPattern.draw();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function loadPattern(pattern) {
    if (currentPattern) {
        currentPattern.destroy();
    }
    currentPattern = pattern;
    currentPattern.init();
}
