function Tile(image){
    if (image instanceof Image){
        this.image = image;
    } else {
        this.image = new Image(image)
    }
}
