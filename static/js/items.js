var Items = {};

Items.Potion = function(image, x, y){
	Item.call(this, image, x, y);
}
Items.Potion.prototype = Item.prototype;