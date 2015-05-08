function Tile(image, block){
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
