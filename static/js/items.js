var Items = {};

Items.Potion = function(image, x, y, map){
	Item.call(this, image, x, y, map);
}
Items.Potion.prototype = Item.prototype;

Items.Weapon = function(image, x, y, map){
	Item.call(this, image, x, y, map);
}
Items.Weapon.prototype = Item.prototype;


Items.HealPotion1 = function(x, y, map){
	Items.Potion.call(this, 'potion', x, y, map);
}
Items.HealPotion1.prototype = Items.Potion.prototype;

Items.IronSword = function(x, y, map){
	Items.Weapon.call(this, 'iron_sword', x, y, map);
}
Items.IronSword.prototype = Items.Weapon.prototype;