class @Player extends Entity
	constructor: (image, map) ->
		super(image, 10, 10, map)
		this.hp = 5
		this.maxhp = this.hp
		this.isPlayer = yes
		this.hearts = []
		this.stat = new Stat(2, 2, 2, 2, 2)
		this.inventory = new Inventory()
		this.alignHearts()
		this.image.body.immovable = false
		this.image.body.setSize(this.map.box.properties.gdim / 2, this.map.box.properties.gdim / 2)
		this.pixelSpeed = this.map.box.properties.globSpeed

	getItemOnGround: () ->
		m = this.map
		to_add = _.filter(m.itemsL, `function(item) {
				return item.posx === this.posx && item.posy === this.posy; 
			}`, this)
		m.itemsL = _.filter(m.itemsL, `function(item) {
				return item.posx !== this.posx || item.posy !== this.posy; 
			}`, this)

		_.each(to_add, 
			(it) -> 
				this.inventory.add(it)
				it.setVisible(false)
			, this)

	heal: (hp) ->
		super(hp)
		this.alignHearts()

	damage: (hp) ->
		super(hp)
		this.alignHearts()

	alignHearts: () ->
		nh = this.hp
		nh_now = this.hearts.length
		if nh < nh_now
			for i in [0 .. nh_now - nh - 1]
				this.hearts.pop().destroy(yes)
		else if nh > nh_now
			for i in [0 .. nh - nh_now - 1]
				this.hearts.push(this.map.box.game.add.sprite(
					this.map.box.game.width - 50 * (this.hearts.length + 1), 
					this.map.box.game.height - 55, 'heart'));
				this.hearts[this.hearts.length - 1].fixedToCamera = true

	update: () ->
		body = this.image.body
		x = body.x
		y = body.y
		posx = (x + this.map.box.properties.gdim / 2) // this.map.box.properties.gdim
		posy = (y + this.map.box.properties.gdim / 2) // this.map.box.properties.gdim
		if posx is this.posx and posy is this.posy 
			return
		this.posx = posx
		this.posy = posy
		this.map.time.myUpdate()

class Stats
	constructor: (cool, hard, hot, sharp, weird) ->
		# player statistics are inspired by Apocalypse World
		this.setStat('cool', cool)
		this.setStat('hard', hard)
		this.setStat('hot', hot)
		this.setStat('sharp', sharp)
		this.setStat('weird', weird)

	setStat: (stat, num) ->
		# TODO: add check
		this[stat] = num