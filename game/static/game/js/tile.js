/**
 * Handles tiles
 * @param {String} image [The name of the resource to be loaded as image]
 * @param {int} posx  [The x position of the tile]
 * @param {int} posy  [The y position of the tile]
 * @param {bool} block [If true, entities can not step on block]
 */
function Tile(image, posx, posy, block){
	Thing.call(this);
    this.block = block || false;
    posx = posx || 0;
    posy = posy || 0;
    this.image = game.add.sprite(0, 0, image);
    this.posx = posx;
    this.posy = posy;
    this.image.x = posx * gdim;
    this.image.y = posy * gdim;
}

/**
 * This sets the "visible" property of the tile image
 * @param {bool} val [the value to set "visible" at]
 */
Tile.prototype.setVisible = function(val){
    this.image.visible = val;
};