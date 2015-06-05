function Item(image, x, y){
    x = x || 0;
    y = y || 0;
    this.image = game.add.sprite(0, 0, image);
    this.posy = y;
    this.posx = x;

    this.isItem = true;

    this.render();
}

/**
 * Doesn't actually render the image...
 * Just set the right image coordinates, based on posx and posx and gdim
 * @return {[type]} [description]
 */
Item.prototype.render = function() {
    var x = this.posx * gdim;
    var y = this.posy * gdim;
    if (this.image.height > gdim) { // If image is 2 tiles high
        y -= gdim;  // So that bottom of image corresponds to tile
    }
    this.image.x = x;
    this.image.y = y;

};

/**
 * Calculates the distance from an entity or an array of coordinates
 * @param  {Entity} coordinates [The entity to which calculate the distance from]
 * @param  {Array} coordinates [The pair of [x, y] coordinates to which calculate the distance from]
 * @return {[type]}             [description]
 */
Item.prototype.distance = function(coordinates) {
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

Item.prototype.update = function() {
    /**
    * This is going to be the AI of the entity.
    * For now, it's simply "chase the player" using a very naive algorithm
    * If the entity bumps in the player, it attack it (implemented in move())
    */
    if (this.distance(m.player) > 4){  // the player is too far, do nothing
        this.setVisible(false);
        return;
    }
    this.setVisible(true);
};

Item.prototype.setVisible = function(val){
    this.image.visible = val;
};