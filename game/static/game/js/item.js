function Item(image, x, y){
    Thing.call(this, image, x, y);
    this.isItem = true;

    this.render();
}
Item.prototype = Thing.prototype;  // let Entity subclass Thing
