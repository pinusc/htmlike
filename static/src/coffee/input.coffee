class @Input
	constructor: (@box, @game) ->
		this.joystick_l_down = false
		this.joystick_r_down = false
		this.cursors = this.game.input.keyboard.createCursorKeys()
		this.game.input.onUp.add(this.handleUp, this)
		this.game.input.onDown.add(this.handleDown, this)


		this.joystick_l = new Joystick('controller_base', 'controller_ball', this.box,
			(baseCenter, diff, dis) ->
				if dis > this.maxJoystickDistance
					offset =
						x: this.maxJoystickDistance * diff.x / dis; # dis : maxJoystickDistance = diff.x : offset.x
						y: this.maxJoystickDistance * diff.y / dis;
					this.ball.cameraOffset.x = baseCenter.x + offset.x - this.ball.width / 2
					this.ball.cameraOffset.y = baseCenter.y + offset.y - this.ball.height / 2

				else 
					offset = diff
				xVelocity = offset.x / this.maxJoystickDistance * this.box.m.player.pixelSpeed
				yVelocity = offset.y / this.maxJoystickDistance * this.box.m.player.pixelSpeed
				move(xVelocity, yVelocity, this.box.m.player.image.body)
		)

		
		this.joystick_r = new Joystick('controller_base_r', 'controller_ball_r', this.box, 
			(baseCenter, diff, dis) ->
				if dis < this.maxJoystickDistance 
					return
				this.box.m.player.interact(direction(this.ball.cameraOffset.x, this.ball.cameraOffset.y, baseCenter.x, baseCenter.y))
				this.box.m.time.myUpdate()
				this.handleUp()
		)

	handleInput: () ->
		this.handleKeys()
		this.joystick_l.handle()
		this.joystick_r.handle()

	handleKeys: () ->
		m = this.box.m
		# movement keys
		if this.cursors.left.isDown
			if this.cursors.left.altKey
				this.box.m.player.interact("left")
				this.cursors.left.reset()
				m.time.myUpdate()
			else
				move(-m.player.pixelSpeed, 0, m.player.image.body)
		else if this.cursors.right.isDown
			if this.cursors.right.altKey
				this.box.m.player.interact("right")
				this.cursors.right.reset()
				m.time.myUpdate()
			else
				move(m.player.pixelSpeed, 0, m.player.image.body)
		if this.cursors.up.isDown
			if this.cursors.up.altKey
				this.box.m.player.interact("up")
				this.cursors.up.reset()
				m.time.myUpdate()
			else
				move(0, -m.player.pixelSpeed, m.player.image.body)
		else if this.cursors.down.isDown
			if this.cursors.down.altKey
				this.box.m.player.interact("down")
				this.cursors.down.reset()
				m.time.myUpdate()
			else
				move(0, m.player.pixelSpeed, m.player.image.body)

		# other keys
		if this.game.input.keyboard.isDown(71)  # g
			m.player.getItemOnGround()
		else if this.game.input.keyboard.isDown(13)
			m.time.myUpdate()

	handleDown: () ->
		if true or not this.game.device.desktop  # FIXME: joystick is needed on mobile only
			x = this.game.input.x
			y = this.game.input.y
			if x < this.game.camera.width / 2
				this.joystick_l.handleDown(x, y)
			else
				this.joystick_r.handleDown(x, y)

	handleUp: () ->
		this.joystick_r.handleUp()
		this.joystick_l.handleUp()

	# there be buttons #
	gofull: () ->
		if this.game.scale.isFullScreen
			this.game.scale.stopFullScreen()
		else
			this.game.scale.startFullScreen(false)

	toggleDebug: () ->
		this.box.toDebug = !this.box.toDebug

	dbutton_down: () ->
		this.toggleDebug()

	fbutton_down: () ->
		this.gofull()

window.move = (x, y, body) ->
	#body.moves = true
	if x
		body.velocity.x = x
		#commented line is for p2
#		if x > 0
			#body.moveRight(x)
#		else
			#body.moveLeft(-x)

	if y
		body.velocity.y = y
		#if y > 0
		#	body.moveDown(y)
		#else
		#	body.moveUp(-y)

class Joystick
	constructor: (base, ball, @box, @wrapper) ->
		# base is the name of the base image
		# ball is the name of the ball image
		# box is needed but will be removed soon
		# wrapper is a function that gets called every time handle is called, with parameters baseCenter, diff, dis
		this.game = this.box.game
		this.ball = this.game.add.image(0, 0, ball)
		this.ball.alpha = 0.5
		this.ball.fixedToCamera = true
		this.ball.visible = false

		this.base = this.game.add.image(0, 0, base)
		this.base.alpha = 0.5
		this.base.fixedToCamera = true
		this.base.visible = false
		this.maxJoystickDistance = this.base.width / 2
		
		this.isDown = false

	handle: () ->
		point = this.game.input.activePointer
		if not this.isDown
			return
		# calculate joystick graphics...
		baseCenter =  
			# this is the center of the base of the joystick
			# it is equal to the coordinates of the point that is touched when the joystick appears
			x: this.base.cameraOffset.x + this.base.width / 2
			y: this.base.cameraOffset.y + this.base.height / 2
		diff = 
			# this is a point representing the coordinates of the center of the controller ball with respect to the center ball
			# the point being pressed NOW
			x: point.x - baseCenter.x
			y: point.y - baseCenter.y
		dis = Math.sqrt(diff.x*diff.x + diff.y*diff.y)  # the distance between baseCenter and the point now being pressed 
		if dis < this.maxJoystickDistance
			this.ball.cameraOffset.x = point.x - this.ball.height / 2
			this.ball.cameraOffset.y = point.y - this.ball.width / 2
		this.wrapper(baseCenter, diff, dis)

	handleDown: (x, y) ->
		# show the joystick
		this.isDown = true
		this.base.visible = true	
		this.base.cameraOffset.x = x - this.base.height / 2
		this.base.cameraOffset.y = y - this.base.width / 2

		this.ball.visible = true
		this.ball.cameraOffset.x = x - this.ball.height / 2
		this.ball.cameraOffset.y = y - this.ball.width / 2

	handleUp: (x, y) ->
		# hide the joystick
		this.isDown = false
		this.base.visible = false
		this.ball.visible = false
