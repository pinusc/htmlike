var maxJoystickDistance;

function createKeys(){
    //movement arrows
    cursors = game.input.keyboard.createCursorKeys();
}


function handleKeys(e){
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

function handleTap(){
    console.log("handleTap()");
    //if(game.input.pointer1.isMouse) return;

    player = m.player;
    /*if (Math.floor(game.input.pointer1.x/(this.game.width/3)) === 0) {
        player.move(player.posx - 1, player.posy);
    }

    else if (Math.floor(game.input.pointer1.x/(this.game.width/3)) === 2) {
        player.move(player.posx + 1, player.posy);
    }
    else if (Math.floor(game.input.pointer1.y/(this.game.height/3)) === 0) {
        player.move(player.posx, player.posy - 1);
    }

    else if (Math.floor(game.input.pointer1.y/(this.game.height/3)) === 2) {
        player.move(player.posx, player.posy + 1);
    }

    for (var i = 0; i < m.entitiesL.length; i++) {
        m.entitiesL[i].act();
    }*/
}

function handleDown(){
    joystick_base.visible = true;
    joystick_base.cameraOffset.x = game.input.x - joystick_base.height / 2;
    joystick_base.cameraOffset.y = game.input.y - joystick_base.width / 2;

    joystick_ball.visible = true;
    joystick_ball.cameraOffset.x = game.input.x - joystick_ball.height / 2;
    joystick_ball.cameraOffset.y = game.input.y - joystick_ball.width / 2;
    console.log(game.input.y);
}

function handleUp(){
    joystick_base.visible = false;
    joystick_ball.visible = false;
}

function gofull() {
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

function dbutton_down(){
    toggleDebug();
}

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
    if (dis > maxJoystickDistance){
        var xOffset = maxJoystickDistance * xdiff / dis; // dis : maxJoystickDistance = xdiff : xOffset
        var yOffset = maxJoystickDistance * ydiff / dis;
        joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width/ 2;
        joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
    } else {
        var xOffset = xdiff;
        var yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
    }
    var xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
    var yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
    //console.log("xVelocity: " + xVelocity + ", yVelocity: " + yVelocity);
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
