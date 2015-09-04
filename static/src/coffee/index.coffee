window.boxx = null

class @Box
	constructor: () ->
		# initializes map, properties, game and input. 
		width = $("#main").width()
		height = $("#main").height()
		this.properties = new Properties()
		this.m = new map(this)
		this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'main', load_status)
		main_state = 
			{create: create,
			update: update,
			render: render}
		this.game.state.add('main_state', main_state)
		this.input = new Input(this)
		this.toDebug = false
		this.dbl = []

	renderDebug: () ->
		# Tells the game to print out debug info with game.debug.text()
		x = 15
		this.game.debug.text("DEBUG:", 10, x)
		_.each(this.dbl,
			(m) ->
				x += 15
				this.game.debug.text(m.text, 10, x, m.color)
			, this)
		this.dbl = []  # clear debug list

	debug: (text, color) ->
		# pushes a debug text to the queue
		this.dbl.push({text: text, color: color})

	onResize: () ->
		# doesn't work
		box = boxx
		width = $("#main").width()
		height = $("#main").height()

		box.game.width = width
		box.game.height = height
		box.game.camera.setSize(width, height)
		box.game.scale.setSize()

$(document).ready(() ->
	window.boxx = new Box()
	$(window).resize(boxx.onResize))

create = () ->
	# actualli loads the map, initializes phyisics and input.
	# creates UI
	# starts time cycle
	# start game
	jMap = this.game.jMap
	#this.game.physics.startSystem(Phaser.Physics.P2JS)
	this.game.physics.startSystem(Phaser.Physics.ARCADE)
	boxx.m.loadMap(jMap)
	this.game.camera.follow(boxx.m.player.image)
	boxx.m.player.fixedToCamera = true

	# input
	boxx.input.createKeys()
	this.game.input.onDown.add(boxx.input.handleDown, boxx.input)
	this.game.input.onUp.add(boxx.input.handleUp, boxx.input)

	createUI(boxx)

	boxx.m.time.myUpdate()
	this.game.paused = false


update = () ->
	#boxx.m.player.image.body.moves = false
	a = boxx.game.physics.arcade.collide(boxx.m.player.image, boxx.m.level[1])
	_.each(boxx.m.entitiesL, (entity) ->
		boxx.game.physics.arcade.collide(boxx.m.player.image, entity.image)
		)
	boxx.m.player.image.body.velocity.set(0)
	boxx.input.handleInput()
	boxx.m.player.update()

render = () ->
	box = boxx
	if box.toDebug
		box.debug("playerHP: " + box.m.player.hp)
		box.debug("desktop: " + box.game.device.desktop)
		if box.m.entitiesL[0]
			box.debug("Wolf HP: " + box.m.entitiesL[0].hp)
		box.debug(box.game.time.fps || '--', "#00ff00")
		box.debug("fpsMin: " + box.game.time.fpsMin || '--', "#00ff00")
		box.renderDebug()