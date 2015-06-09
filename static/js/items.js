var Items = {};

Items.Potion = function(image, x, y){
	Item.call(this, image, x, y);
}
Items.Potion.prototype = Item.prototype;

Items.Weapon = function(image, x, y){
	Item.call(this, image, x, y);
}
Items.Weapon.prototype = Item.prototype;


Items.HealPotion1 = function(x, y){
	Items.Potion.call(this, 'potion', x, y);
}
Items.HealPotion1.prototype = Items.Potion.prototype;

Items.IronSword = function(x, y){
	Items.Weapon.call(this, 'iron_sword', x, y);
}
Items.IronSword.prototype = Items.Weapon.prototype;