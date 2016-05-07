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
        currentPattern.draw();
        controls.rotateLeft(0.0007);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
})();
