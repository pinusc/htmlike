class @Time
	constructor: (@map) ->
		this.box = map.box
		this.tick = 0

	advanceWorld: () ->
		this.tick++
		_.each(this.map.entitiesL, 
			(entity) ->
				if this.tick % entity.speed is 0
					entity.act()
					entity.update()
			, this)

		if this.tick % this.map.player.speed is 0
			return
		else 
			this.advanceWorld()

	updateWorld: () ->
		_.each(this.map.itemsL,
			(item) ->
				item.update())
		_.each(this.map.entitiesL,
			(entity) -> 
				entity.update())

	myUpdate: () ->
		console.log "myUpdate"
		ll = this.map.level.length
		this.map.generateDKMap()
		this.updateWorld()
		this.advanceWorld()
		this.map.do_fov(this.map.player.posx, this.map.player.posy, 5)
		_.each(this.map.light, 
			(el, i) ->
				_.each(el, 
					(v, j) ->
						q = 0
						if v is this.map.flag
							q = 1
						else if v is this.map.flag - 1
							q = 0.5
						if q
							_.each(this.map.level,
								(f, l) ->
									currTile = this.map.map.getTile(j, i, l)
									if currTile
										currTile.alpha = q
								, this)
					, this)
			, this)
		_.each(this.map.level
			(level) ->
				level.dirty = true)
		this.map.map.getTile(this.map.player.posx, this.map.player.posy, 0).alpha = 0.5
