loadPattern(particleWave);
animate();

function animate() {
    clocktick();
    currentPattern();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function loadPattern(pattern) {
    pattern.init();
    currentPattern = pattern.draw;
}
