(function(){
    loadPattern(floatingIdol);
    animate();

    // destroys the previous pattern and loads a new one
    function loadPattern(pattern) {
        if (currentPattern) currentPattern.destroy();
        currentPattern = pattern;
        currentPattern.init();
    }

    // renders the view every frame
    function animate() {
        clocktick();
        //camera.position.z += step;
        controls.rotateLeft(0.0007);
        controls.update();
        currentPattern.draw();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
})();
