window.addEventListener('load', function() {
    loadPattern(floatingIdol);
    animate();

    // destroys the previous pattern and loads a new one
    function loadPattern(pattern) {
        if (currentPattern) currentPattern.destroy();
        currentPattern = pattern;
        currentPattern.init();
    }

    var rotateSpeed = 0;

    // renders the view every frame
    function animate() {
        clocktick();
        //camera.position.z += step;
        if (rotateSpeed < 0.01) {
            rotateSpeed += 0.00004;
        }
        controls.rotateLeft(rotateSpeed);
        controls.update();
        currentPattern.draw();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
});
