function Tile(image, posx, posy, block){
    /**
    * This object will handle Tiles.
    * They have an image and a block property. If a tile blocks, nothing can
    * pass through it.
    */
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
}