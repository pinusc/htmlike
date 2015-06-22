function Item(image, x, y, map){
    Thing.call(this, image, x, y, map);
    this.isItem = true;

    this.render();
}
Item.prototype = Thing.prototype;  // let Entity subclass Thing
