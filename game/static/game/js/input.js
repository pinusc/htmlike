var maxJoystickDistance;

/**
 * Just creates cursor keys
 */
function createKeys(){
    //movement arrows
    cursors = game.input.keyboard.createCursorKeys();
}

/**
 * Call handleKeys and if necessary handleJoystick
 */
function handleInput(){
    handleKeys();

    if(! game.device.desktop){  // joystick is needed on mobile only
        handleJoystick();
    }
}

/**
 * Checks for keypresses and execute desired action.
 * Currently implemented: 
 * - arrow keys(for movement)
 * - g key (for picking up items)
 */
function handleKeys(){
    if (cursors.left.isDown) {
        move(-m.player.pixelSpeed, 0, m.player.image.body);
    } else if (cursors.right.isDown) {
        move(m.player.pixelSpeed, 0, m.player.image.body);
    }

    if (cursors.up.isDown) {
        move(0, -m.player.pixelSpeed, m.player.image.body);
    } else if (cursors.down.isDown) {
        move(0, m.player.pixelSpeed, m.player.image.body);
    }
    if(game.input.keyboard.isDown(71)){  // g
        m.player.getItemOnGround();
    }
}

/** Actually does nothing (for now) */
function handleTap(){
}

/**
 * When pointer1 is down...
 * Just makes the joystick visible
 */
function handleDown(){
    if(! game.device.desktop){  // joystick is needed on mobile only
        joystick_base.visible = true;
        joystick_base.cameraOffset.x = game.input.x - joystick_base.height / 2;
        joystick_base.cameraOffset.y = game.input.y - joystick_base.width / 2;

        joystick_ball.visible = true;
        joystick_ball.cameraOffset.x = game.input.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = game.input.y - joystick_ball.width / 2;
    }
}

/** Hides the joystick if the screen is not being pressed */
function handleUp(){
    if(joystick_ball.visible || joystick_base.visible){
        joystick_base.visible = false;
        joystick_ball.visible = false;
    }
}

/** Toggles fullscreen */
function gofull() {
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

/** Handler for dbutton presses, toggles debug */
function dbutton_down(){
    toggleDebug();
}

/** handler for fbutton presses, toggles fullscreen */
function fbutton_down(){
    gofull();
}

function handleJoystick(){
    var point = game.input.activePointer;
    if (!point.isDown){
        return;
    }
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
    var xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
    var yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
    move(xVelocity, yVelocity, m.player.image.body);
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