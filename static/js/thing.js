function Thing(image, x, y){
    x = x || 0;
    y = y || 0;
    this.image = box.game.add.sprite(0, 0, image);
    this.posy = y;
    this.posx = x;
}

/**
 * Calculates the distance from an entity or an array of coordinates
 * @param  {Entity} coordinates [The entity to which calculate the distance from]
 * @param  {Array} coordinates [The pair of [x, y] coordinates to which calculate the distance from]
 * @return {[type]}             [description]
 */
Thing.prototype.distance = function(coordinates) {
    if (coordinates.isEntity || coordinates.isPlayer){
        // ectract coordinates from entity
        coordinates = [coordinates.posx, coordinates.posy]
    }
    var x = this.posx;
    var y = this.posy;
    var x1 = coordinates[0];
    var y1 = coordinates[1];
    var difx = x - x1;
    var dify = y - y1;
    var dist = Math.sqrt(difx * difx + dify * dify);
    return dist;
};

/**
 * Doesn't actually render the image...
 * Just set the right image coordinates, based on posx and posx and gdim
 * @return {[type]} [description]
 */
Thing.prototype.render = function() {
    var gdim = box.properties.gdim;
    var x = this.posx * gdim;
    var y = this.posy * gdim;
    if (this.image.height > gdim) { // If image is 2 tiles high
        y -= gdim;  // So that bottom of image corresponds to tile
    }
    this.image.x = x;
    this.image.y = y;
};

/**
 * Called at every myUpdate: if the Thing is too distant, hides it
 * @return undefined
 */
Thing.prototype.update = function() {
    if (this.distance(m.player) >= 5){  // the player is too far, do nothing
        this.setVisible(false);
        return;
    }
    this.setVisible(true);
};

/**
 * This sets the "visible" property of the Thing sprite
 * @param {bool} val [the value to set "visible" at]
 */
Thing.prototype.setVisible = function(val){
    this.image.visible = val;
}
