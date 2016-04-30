function reset(obj) {
    if (obj.type === 'Geometry') {
        obj.vertices = [];
        obj.colors = [];
        obj.faces = [];
    }
}
