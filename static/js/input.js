function Input(){
    this.joystick_l_down = false;
    this.joystick_r_down = false;
}

/**
 * Just creates cursor keys
 */
Input.prototype.createKeys = function(){
    //movement arrows
    this.cursors = box.game.input.keyboard.createCursorKeys();
}

/**
 * Call handleKeys and if necessary handleJoystick
 */
Input.prototype.handleInput = function(){
    this.handleKeys();

    // TODO remove true
    if(box.game.input.x < box.game.world.width){
        this.handleJoystick(this.joystick_base_l, this.joystick_ball_l, this.maxJoystickDistance_l);
    } else {
        this.handleJoystick(this.joystick_base_r, this.joystick_ball_r, this.maxJoystickDistance_r);
    }
}

/**
 * Checks for keypresses and execute desired action.
 * Currently implemented: 
 * - arrow keys(for movement)
 * - g key (for picking up items)
 */
Input.prototype.handleKeys = function(){
    var m = box.m;
    if (this.cursors.left.isDown) {
        move(-m.player.pixelSpeed, 0, m.player.image.body);
    } else if (this.cursors.right.isDown) {
        move(m.player.pixelSpeed, 0, m.player.image.body);
    }

    if (this.cursors.up.isDown) {
        move(0, -m.player.pixelSpeed, m.player.image.body);
    } else if (this.cursors.down.isDown) {
        move(0, m.player.pixelSpeed, m.player.image.body);
    }
    if(box.game.input.keyboard.isDown(71)){  // g
        m.player.getItemOnGround();
    } else if(box.game.input.keyboard.isDown(13)){
        m.time.myUpdate();
    }
}

/**
 * When pointer1 is down...
 * Just makes the joystick visible
 */
Input.prototype.handleDown = function(){
    if(true || ! box.game.device.desktop){  // joystick is needed on mobile only
        var x = box.game.input.x, y = box.game.input.y;
        if(x < box.game.world.width / 2){
            this.joystick_l_down = true;
            this.joystick_base_l.visible = true;
            this.joystick_base_l.cameraOffset.x = x - this.joystick_base_l.height / 2;
            this.joystick_base_l.cameraOffset.y = y - this.joystick_base_l.width / 2;

            this.joystick_ball_l.visible = true;
            this.joystick_ball_l.cameraOffset.x = x - this.joystick_ball_l.height / 2;
            this.joystick_ball_l.cameraOffset.y = y - this.joystick_ball_l.width / 2;
        } else {
            this.joystick_r_down = true;
            this.joystick_base_r.visible = true;
            this.joystick_base_r.cameraOffset.x = x - this.joystick_base_r.height / 2;
            this.joystick_base_r.cameraOffset.y = y - this.joystick_base_r.width / 2;

            this.joystick_ball_r.visible = true;
            this.joystick_ball_r.cameraOffset.x = x - this.joystick_ball_r.height / 2;
            this.joystick_ball_r.cameraOffset.y = y - this.joystick_ball_r.width / 2;
        }
    }
}

/** Hides the joystick if the screen is not being pressed */
Input.prototype.handleUp = function(){
    if(this.joystick_ball_l.visible || this.joystick_base_l.visible){
        this.joystick_l_down = false;
        this.joystick_base_l.visible = false;
        this.joystick_ball_l.visible = false;
    }
    if(this.joystick_ball_r.visible || this.joystick_base_r.visible){
        this.joystick_r_down = false;
        this.joystick_base_r.visible = false;
        this.joystick_ball_r.visible = false;
    }
}

/** Toggles fullscreen */
Input.prototype.gofull = function() {
    if (box.game.scale.isFullScreen){
        box.game.scale.stopFullScreen();
    } else {
        box.game.scale.startFullScreen(false);
    }
}

/**
 * When called, if debug info is displayed, it is no longer displayed.
 * @return {undefined}
 */
Input.prototype.toggleDebug = function() {
    yellow_border.alpha = yellow_border.alpha === 1 ? 0 : 1;
    box.toDebug = !box.toDebug;
};

/** Handler for dbutton presses, toggles debug */
Input.prototype.dbutton_down = function(){
    this.toggleDebug();
};

/** handler for fbutton presses, toggles fullscreen */
Input.prototype.fbutton_down = function(){
    this.gofull();
}

Input.prototype.hJoystick = function(){
    var joystick_ball, joystick_base, maxJoystickDistance;
    var point = box.game.input.activePointer;
    if (!point.isDown){
        return;
    } 

    //left or rigth?
    if(point.x < box.game.camera.width / 2){
        joystick_ball = this.joystick_ball_l;
        joystick_base = this.joystick_base_l;
        maxJoystickDistance = this.maxJoystickDistance_l;
    } else {
        if (! joystick_r_down){
            handleUp();
        }
        joystick_ball = this.joystick_ball_r;
        joystick_base = this.joystick_base_r;
        maxJoystickDistance = maxJoystickDistance_r;
    }

    //calculate joystick graphics...
    var baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
    var baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
    var xdiff = point.x - baseCenterX;
    var ydiff = point.y - baseCenterY;
    var dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
    var xOffset, yOffset;
    if (dis > maxJoystickDistance){
        xOffset = maxJoystickDistance * xdiff / dis; // dis : maxJoystickDistance = xdiff : xOffset
        yOffset = maxJoystickDistance * ydiff / dis;
        joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width/ 2;
        joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
    } else {
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
    }


    //actually do sth
    //left or rigth?
    if(point.x < box.game.camera.width / 2){
        var xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
        var yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
        move(xVelocity, yVelocity, m.player.image.body);
    } else {
        m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        m.time.myUpdate();
        this.handleUp();
    }
}

// TODO remove old definition
Input.prototype.handleJoystick = function(){
    var point = box.game.input.activePointer;
    if (!point.isDown){
        return;
    } 

    //left or rigth?
    if(point.x < box.game.camera.width / 2){
        this.handleJoystick_l(point, this.joystick_ball_l, this.joystick_base_l, this.maxJoystickDistance_l);
    } else {
        this.handleJoystick_r(point, this.joystick_ball_r, this.joystick_base_r, this.maxJoystickDistance_r);
    }

}


Input.prototype.handleJoystick_l = function(point, joystick_ball, joystick_base, maxJoystickDistance){
    //calculate joystick graphics...
    var baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
    var baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
    var xdiff = point.x - baseCenterX;
    var ydiff = point.y - baseCenterY;
    var dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
    var xOffset, yOffset;
    if (dis > maxJoystickDistance){
        xOffset = maxJoystickDistance * xdiff / dis; // dis : maxJoystickDistance = xdiff : xOffset
        yOffset = maxJoystickDistance * ydiff / dis;
        joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width/ 2;
        joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
    } else {
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
    }


    //actually do sth
    //left or rigth?
    if(point.x < box.game.camera.width / 2){
        var xVelocity = xOffset / maxJoystickDistance * box.m.player.pixelSpeed;
        var yVelocity = yOffset / maxJoystickDistance * box.m.player.pixelSpeed;
        move(xVelocity, yVelocity, box.m.player.image.body);
    }

}

Input.prototype.handleJoystick_r = function(point, joystick_ball, joystick_base, maxJoystickDistance){
    if(! this.joystick_r_down){
        return;
    }
    //calculate joystick graphics...
    var baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
    var baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
    var xdiff = point.x - baseCenterX;
    var ydiff = point.y - baseCenterY;
    var dis = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
    var xOffset, yOffset;
    if (dis < maxJoystickDistance){
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
    } else {
        box.m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        box.m.time.myUpdate();
        this.handleUp();

    }
}

function move(x, y, body){
    if(x){
        if (x > 0){
            body.moveRight(x);
        } else {
            body.moveLeft(-x);
        }
    }
    if(y){
        if (y > 0){
            body.moveDown(y);
        } else {
            body.moveUp(-y);
        }
    }
}
