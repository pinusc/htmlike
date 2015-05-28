function handleKeys(e){
    /**
    * Takes care of any key event.
    * If an arrow is pressed, moves the player in the given direction
    * If Enter is pressed, heals the player
    * F3: toggle debug info
    */
    player = m.player;  //much less ugly than repeating it
    switch (e.which) {
        case 37: // left arrow
        player.move(player.posx - 1, player.posy);
        break;

        case 38: // up arrow
        player.move(player.posx, player.posy - 1);
        break;

        case 39: // right arrow
        player.move(player.posx + 1, player.posy);
        break;

        case 40: // down arrow
        player.move(player.posx, player.posy + 1);
        break;

        case 13: //enter
        player.heal(1);
        break;

        case 51:
        toggleDebug();
        break;

        default:
        console.log("Key pressed: " + e.which);
        break;
    }

    myUpdate();
}

function handleTap(){
    console.log("handleTap()");
    if(game.input.pointer1.isMouse) return;

    player = m.player;
    if (Math.floor(game.input.pointer1.x/(this.game.width/3)) === 0) {
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
    }
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
