var bound = {
    enforce: function(val, min, max) {
        return Math.max(Math.min(val, max), min);
    },
    toCircle: function(x, y, radius, theta) {
        if (theta === undefined) theta = thetaFromCoord(mousepos.x, mousepos.y);
        var max = coordsFromTheta(theta, radius);
        max.x = Math.abs(max.x);
        max.y = Math.abs(max.y);
        return {
            x: this.enforce(x, -max.x, max.x),
            y: this.enforce(y, -max.y, max.y)
        };
    }
};
