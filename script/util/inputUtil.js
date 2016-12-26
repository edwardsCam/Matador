var IO = (function() {

    var mpos = defaultPos(),
        prev_mpos = defaultPos();

    return {
        mouseMove: mouseMove,
        mousepos: mousepos
    };

    function mouseMove(e) {
        prev_mpos = mpos;
        mpos = normalizeScreenPos(e.clientX, e.clientY);
    }

    function mousepos() {
        return mpos;
    }

    function defaultPos() {
        return {
            x: 0,
            y: 0
        };
    }

})();
