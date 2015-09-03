class Potion extends Item
	constructor: (image, x, y, map) ->
		super(image, x, y, map)

class HealPotion1 extends Potion
	constructor: (x, y, map) ->
		super('potion', x, y, map)

class Weapon extends Item
	constructor: (image, x, y, map) ->
		super(image, x, y, map)


window.Items =
	Potion: Potion
	HealPotion1: HealPotion1