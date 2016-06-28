window.addEventListener('load', function() {
    loadPattern(floatingIdol);
    animate();

    // destroys the previous pattern and loads a new one
    function loadPattern(pattern) {
        if (currentPattern) currentPattern.destroy();
        currentPattern = pattern;
        currentPattern.init();
    }

    var rotateLSpeed = 0,
        rotateUSpeed = 0,
        rotateAccel = 0.00004,
        maxRotateSpeed = 0.01;

    // renders the view every frame
    function animate() {
        clocktick();
        if (rotateLSpeed < maxRotateSpeed) {
            rotateLSpeed += rotateAccel;
        }
        var xpos = Math.PI * (mousepos.x + 1),
            xgoal = -4 * Math.sin(xpos),
            ygoal = -4 * mousepos.y;
            zgoal = 4 * Math.cos(xpos);

        camera.position.x += (xgoal - camera.position.x) * 0.03;
        camera.position.y += (ygoal - camera.position.y) * 0.03;
        camera.position.z += (zgoal - camera.position.z) * 0.03;
        camera.lookAt(center);

        currentPattern.draw();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
});
