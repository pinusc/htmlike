function Tile(image, block){
    /**
    * This object will handle Tiles.
    * They have an image and a block property. If a tile blocks, nothing can
    * pass through it.
    */
    this.block = block || false;
    if (image instanceof Image){
        this.image = image;
    } else {
        this.image = new Image()
        this.image.src = image;
    }
}

Tile.prototype.render = function() {

}
