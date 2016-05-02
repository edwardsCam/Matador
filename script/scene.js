loadPattern(lineWave);
animate();

var test = true;

function animate() {
    clocktick();
    currentPattern.draw();
    controls.rotateLeft(0.0007);
    controls.update();
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
