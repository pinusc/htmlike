class @Player extends Entity
	constructor: (image, map) ->
		super(image, 10, 10, map)
		this.hp = 5
		this.maxhp = this.hp
		this.isPlayer = yes
		this.hearts = []
		this.inventory = []
		this.alignHearts()
		this.pixelSpeed = this.map.box.properties.globSpeed
		this.map.box.game.physics.p2.enable(this.image)
		this.image.body.setZeroDamping()
		this.image.body.fixedRotation = on

	addToInventory: (item) ->
		this.inventory.push(item)

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
			    this.addToInventory(it)
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
		posx = x // this.map.box.properties.gdim
		posy = y // this.map.box.properties.gdim
		if posx is this.posx and posy is this.posy 
			return
		this.posx = posx
		this.posy = posy
		this.map.time.myUpdate()
