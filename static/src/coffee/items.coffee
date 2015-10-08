class Potion extends Item
	constructor: (image, x, y, map) ->
		super(image, x, y, map)

class HealPotion1 extends Potion
	constructor: (x, y, map) ->
		super('potion', x, y, map)

class Weapon extends Item
	constructor: (image, x, y, map) ->
		super(image, x, y, map)

class Sword extends Weapon
	constructor: (x, y, map) ->
		super('sword', x, y, map)
		this.attack = 1

class Fists extends Weapon
	constructor: (map) ->
		this.attack = 0


window.Items =
	Potion: Potion
	HealPotion1: HealPotion1
	Weapon: Weapon
	Sword: Sword
	Fists: Fists