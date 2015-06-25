class @Input
    constructor: (@box) ->
        this.joystick_l_down = false
        this.joystick_r_down = false

    createKeys: () ->
        this.cursors = this.box.game.input.keyboard.createCursorKeys()

    handleInput: () ->
        this.handleKeys()
        if this.box.game.input.x < this.box.game.world.width
            this.handleJoystick(this.joystick_base_l, this.joystick_ball_l, this.maxJoystickDistance_l)
        else
            this.handleJoystick(this.joystick_base_r, this.joystick_ball_r, this.maxJoystickDistance_r)

    handleKeys: () ->
        m = this.box.m
        if this.cursors.left.isDown
            move(-m.player.pixelSpeed, 0, m.player.image.body)
         else if this.cursors.right.isDown
            move(m.player.pixelSpeed, 0, m.player.image.body)


        if this.cursors.up.isDown
            move(0, -m.player.pixelSpeed, m.player.image.body)
         else if this.cursors.down.isDown
            move(0, m.player.pixelSpeed, m.player.image.body)

        if this.box.game.input.keyboard.isDown(71)  # g
            m.player.getItemOnGround()
        else if this.box.game.input.keyboard.isDown(13)
            m.time.myUpdate()

    handleDown: () ->
        if true or not this.box.game.device.desktop  # FIXME: joystick is needed on mobile only
            x = this.box.game.input.x
            y = this.box.game.input.y
            if x < this.box.game.world.width / 2
                this.joystick_l_down = true
                this.joystick_base_l.visible = true
                this.joystick_base_l.cameraOffset.x = x - this.joystick_base_l.height / 2
                this.joystick_base_l.cameraOffset.y = y - this.joystick_base_l.width / 2

                this.joystick_ball_l.visible = true
                this.joystick_ball_l.cameraOffset.x = x - this.joystick_ball_l.height / 2
                this.joystick_ball_l.cameraOffset.y = y - this.joystick_ball_l.width / 2
            else
                this.joystick_r_down = true
                this.joystick_base_r.visible = true
                this.joystick_base_r.cameraOffset.x = x - this.joystick_base_r.height / 2
                this.joystick_base_r.cameraOffset.y = y - this.joystick_base_r.width / 2

                this.joystick_ball_r.visible = true
                this.joystick_ball_r.cameraOffset.x = x - this.joystick_ball_r.height / 2
                this.joystick_ball_r.cameraOffset.y = y - this.joystick_ball_r.width / 2

    handleUp: () ->
        if this.joystick_ball_l.visible or this.joystick_base_l.visible
            this.joystick_l_down = false
            this.joystick_base_l.visible = false
            this.joystick_ball_l.visible = false
        
        if this.joystick_ball_r.visible or this.joystick_base_r.visible
            this.joystick_r_down = false
            this.joystick_base_r.visible = false
            this.joystick_ball_r.visible = false

    gofull: () ->
        if this.box.game.scale.isFullScreen
            this.box.game.scale.stopFullScreen()
        else
            this.box.game.scale.startFullScreen(false)

    toggleDebug: () ->
        this.box.toDebug = !this.box.toDebug

    dbutton_down: () ->
        this.toggleDebug()

    fbutton_down: () ->
        this.gofull()

    hJoystick: () ->
        point = this.box.game.input.activePointer
        if not point.isDown
            return

        #left or rigth?
        if point.x < this.box.game.camera.width / 2
            joystick_ball = this.joystick_ball_l
            joystick_base = this.joystick_base_l
            maxJoystickDistance = this.maxJoystickDistance_l
        else
            if not joystick_r_down
                handleUp()
            joystick_ball = this.joystick_ball_r
            joystick_base = this.joystick_base_r
            maxJoystickDistance = maxJoystickDistance_r

        #calculate joystick graphics...
        baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2
        baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2
        xdiff = point.x - baseCenterX
        ydiff = point.y - baseCenterY
        dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff)
        if dis > maxJoystickDistance
            xOffset = maxJoystickDistance * xdiff / dis # dis : maxJoystickDistance = xdiff : xOffset
            yOffset = maxJoystickDistance * ydiff / dis
            joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width/ 2
            joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2
        else
            xOffset = xdiff
            yOffset = ydiff
            joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2
            joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2


        #actually do sth
        #left or rigth?
        if point.x < this.box.game.camera.width / 2
            xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed
            yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed
            move(xVelocity, yVelocity, m.player.image.body)
        else
            m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY))
            m.time.myUpdate()
            this.handleUp()

    handleJoystick: () ->
        point = this.box.game.input.activePointer;
        if not point.isDown
            return
        # left or rigth?
        if point.x < this.box.game.camera.width / 2
            this.handleJoystick_l(point, this.joystick_ball_l, this.joystick_base_l, this.maxJoystickDistance_l);
        else
            this.handleJoystick_r(point, this.joystick_ball_r, this.joystick_base_r, this.maxJoystickDistance_r);

    handleJoystick_l: (point, joystick_ball, joystick_base, maxJoystickDistance) ->
        #calculate joystick graphics...
        baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
        baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
        xdiff = point.x - baseCenterX;
        ydiff = point.y - baseCenterY;
        dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
        if dis > maxJoystickDistance
            xOffset = maxJoystickDistance * xdiff / dis; # dis : maxJoystickDistance = xdiff : xOffset
            yOffset = maxJoystickDistance * ydiff / dis;
            joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width/ 2;
            joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
        else
            xOffset = xdiff;
            yOffset = ydiff;
            joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
            joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;


        #actually do sth
        #left or rigth?
        if point.x < this.box.game.camera.width / 2
            xVelocity = xOffset / maxJoystickDistance * this.box.m.player.pixelSpeed;
            yVelocity = yOffset / maxJoystickDistance * this.box.m.player.pixelSpeed;
            move(xVelocity, yVelocity, this.box.m.player.image.body);

    handleJoystick_r: (point, joystick_ball, joystick_base, maxJoystickDistance) ->
        if not this.joystick_r_down
            return
        # calculate joystick graphics...
        baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
        baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
        xdiff = point.x - baseCenterX;
        ydiff = point.y - baseCenterY;
        dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
        if dis < maxJoystickDistance
            xOffset = xdiff;
            yOffset = ydiff;
            joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
            joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
        else
            this.box.m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
            this.box.m.time.myUpdate();
            this.handleUp();

window.move = (x, y, body) ->
    if x
        if x > 0
            body.moveRight(x)
        else
            body.moveLeft(-x)

    if y
        if y > 0
            body.moveDown(y)
        else
            body.moveUp(-y)

