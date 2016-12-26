window.addEventListener('load', function() {
    loadPattern(new _Cage_(200, 0.25));
    animate();

    // destroys the previous pattern and loads a new one
    function loadPattern(pattern) {
        patterns.push(pattern);
        pattern.init();
    }

    // renders the view every frame
    function animate() {
        clocktick();
        //moveCamera();
        draw();
        requestAnimationFrame(animate);
    }

    function clocktick() {
        schedule.setTime(clock);
    }

    function moveCamera() {
        camera.position.z += schedule.getStep(movespeed);
    }

    function draw() {
        patterns.forEach(function(p) {
            p.draw();
        });
        renderer.render(scene, camera);
    }

});
