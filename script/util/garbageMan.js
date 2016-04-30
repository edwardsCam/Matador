function reset(obj) {
    if (obj instanceof THREE.Camera) {
        obj = undefined;
    } else if (obj instanceof THREE.Light) {
        obj.dispose();
        obj = undefined;
    } else if (obj instanceof THREE.Mesh) {
        if (obj.geometry) {
            obj.geometry.dispose();
            obj.geometry = undefined;
        }
        if (obj.material) {
            if (obj.material instanceof THREE.MeshFaceMaterial) {
                _.map(obj.material.materials, function(mtrl) {
                    if (mtrl.map) mtrl.map.dispose();
                    if (mtrl.lightMap) mtrl.lightMap.dispose();
                    if (mtrl.bumpMap) mtrl.bumpMap.dispose();
                    if (mtrl.normalMap) mtrl.normalMap.dispose();
                    if (mtrl.specularMap) mtrl.specularMap.dispose();
                    if (mtrl.envMap) mtrl.envMap.dispose();

                    mtrl.dispose(); // disposes any programs associated with the material
                    mtrl = undefined;
                });
            } else {
                if (obj.material.map) obj.material.map.dispose();
                if (obj.material.lightMap) obj.material.lightMap.dispose();
                if (obj.material.bumpMap) obj.material.bumpMap.dispose();
                if (obj.material.normalMap) obj.material.normalMap.dispose();
                if (obj.material.specularMap) obj.material.specularMap.dispose();
                if (obj.material.envMap) obj.material.envMap.dispose();
                obj.material.dispose(); // disposes any programs associated with the material
                obj.material = undefined;
            }
        }
    } else if (obj instanceof THREE.Geometry) {
        obj.dispose();
        obj = undefined;
    } else if (obj instanceof THREE.Object3D) {
        obj = undefined;
    }
}
