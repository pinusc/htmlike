var maxJoystickDistance_l;
var maxJoystickDistance_r;
var joystick_ball_l, joystick_base_l;  // joystick_base is the grey circle, joystick_ball the red circle
var joystick_ball_r, joystick_base_r;  // joystick_base is the grey circle, joystick_ball the red circle
var joystick_l_down = false, joystick_r_down = false;

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

    // TODO remove true
    if(game.input.x < game.world.width){
        handleJoystick(joystick_base_l, joystick_ball_l, maxJoystickDistance_l);
    } else {
        console.log("joystick_r");
        handleJoystick(joystick_base_r, joystick_ball_r, maxJoystickDistance_r);
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
    } else if(game.input.keyboard.isDown(13)){
        m.time.myUpdate();
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
    if(true || ! game.device.desktop){  // joystick is needed on mobile only
        var x = game.input.x, y = game.input.y;
        if(x < game.world.width / 2){
            joystick_l_down = true;
            joystick_base_l.visible = true;
            joystick_base_l.cameraOffset.x = x - joystick_base_l.height / 2;
            joystick_base_l.cameraOffset.y = y - joystick_base_l.width / 2;

            joystick_ball_l.visible = true;
            joystick_ball_l.cameraOffset.x = x - joystick_ball_l.height / 2;
            joystick_ball_l.cameraOffset.y = y - joystick_ball_l.width / 2;
        } else {
            joystick_r_down = true;
            joystick_base_r.visible = true;
            joystick_base_r.cameraOffset.x = x - joystick_base_r.height / 2;
            joystick_base_r.cameraOffset.y = y - joystick_base_r.width / 2;

            joystick_ball_r.visible = true;
            joystick_ball_r.cameraOffset.x = x - joystick_ball_r.height / 2;
            joystick_ball_r.cameraOffset.y = y - joystick_ball_r.width / 2;
        }
    }
}

/** Hides the joystick if the screen is not being pressed */
function handleUp(){
    if(joystick_ball_l.visible || joystick_base_l.visible){
        joystick_l_down = false;
        joystick_base_l.visible = false;
        joystick_ball_l.visible = false;
    }
    if(joystick_ball_r.visible || joystick_base_r.visible){
        joystick_r_down = false;
        joystick_base_r.visible = false;
        joystick_ball_r.visible = false;
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

function hJoystick(){
    var joystick_ball, joystick_base, maxJoystickDistance;
    var point = game.input.activePointer;
    if (!point.isDown){
        return;
    } 

    //left or rigth?
    if(point.x < game.camera.width / 2){
        joystick_ball = joystick_ball_l;
        joystick_base = joystick_base_l;
        maxJoystickDistance = maxJoystickDistance_l;
    } else {
        if (! joystick_r_down){
            handleUp();
        }
        joystick_ball = joystick_ball_r;
        joystick_base = joystick_base_r;
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
    if(point.x < game.camera.width / 2){
        var xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
        var yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
        move(xVelocity, yVelocity, m.player.image.body);
    } else {
        m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        m.time.myUpdate();
        handleUp();
    }
}

// TODO remove old definition
function handleJoystick(){
    var point = game.input.activePointer;
    if (!point.isDown){
        return;
    } 

    //left or rigth?
    if(point.x < game.camera.width / 2){
        handleJoystick_l(point, joystick_ball_l, joystick_base_l, maxJoystickDistance_l);
    } else {
        handleJoystick_r(point, joystick_ball_r, joystick_base_r, maxJoystickDistance_r);
    }

}


function handleJoystick_l(point, joystick_ball, joystick_base, maxJoystickDistance){
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
    if(point.x < game.camera.width / 2){
        var xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
        var yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
        move(xVelocity, yVelocity, m.player.image.body);
    }

}

function handleJoystick_r(point, joystick_ball, joystick_base, maxJoystickDistance){
    if(! joystick_r_down){
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
        m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        m.time.myUpdate();
        handleUp();

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
