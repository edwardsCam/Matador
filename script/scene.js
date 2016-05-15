window.addEventListener('load', function() {
    loadPattern(floatingIdol);
    animate();

    // destroys the previous pattern and loads a new one
    function loadPattern(pattern) {
        if (currentPattern) currentPattern.destroy();
        currentPattern = pattern;
        currentPattern.init();
    }

    var rotateSpeed = 0,
        rotateAccel = 0.00004,
        maxRotateSpeed = 0.01;

    // renders the view every frame
    function animate() {
        clocktick();
        //camera.position.z += step;
        if (rotateSpeed < maxRotateSpeed) {
            rotateSpeed += rotateAccel;
        }
        controls.rotateLeft(rotateSpeed);
        controls.update();
        currentPattern.draw();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
});
