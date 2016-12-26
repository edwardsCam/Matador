function _Baseline_(len) {
    this.init = __init__;
    this.destroy = __destroy__;
    this.draw = __draw__;

    var lenMin1 = len -1;

    var g = new THREE.BufferGeometry(),
        m = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 2
        }),
        positions = new Float32Array(len * 3),
        l;
    g.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setDrawRange(0, 10);

    function __init__() {
        l = new THREE.Line(g, m);
        scene.add(l);
    }

    function __destroy__() {}

    function __draw__() {
        var mpos = IO.mousepos();
        for (var i = 0; i < lenMin1; i++) {
            var i3 = i * 3,
                i1 = (i + 1) * 3;
            positions[i3] = positions[i1];
            positions[i3 + 1] = positions[i1 + 1];
            positions[i3 + 2] = positions[i1 + 2];
        }
        positions[lenMin1 * 3] = -mpos.x;
        positions[lenMin1 * 3 + 1] = mpos.y;
        positions[lenMin1 * 3 + 2] = camera.position.z + 5;

        l.geometry.attributes.position.needsUpdate = true;
    }

}
