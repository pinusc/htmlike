var context, frame_height_px, frame_width_px, frame_height, frame_width;
var game;
var m = new map();
var gdim = 13 * 4; // 12 is the original image size, 4 the scaling;
var debug = false;
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
        debug = !debug;
        break;

        default:
        console.log("Key pressed: " + e.which);
        break;
    }

    for (var i = 0; i < m.entitiesL.length; i++) {
        m.entitiesL[i].act();
    }
}

$(document).ready(function (){
    /* initializazion */

    // Set canvas height and width based on container dimensions
    var width = $("#main").css("width");
    var height = $("#main").css("height");
    frame_width_px = parseInt(width.substring(0, width.length - 2)); // numerical values
    frame_height_px = parseInt(height.substring(0, height.length - 2));
    frame_height = frame_height_px / gdim;
    frame_width = frame_width_px / gdim;

    // TODO see if Phaser can handle the size itself
    game = new Phaser.Game(frame_width_px, frame_height_px, Phaser.CANVAS, 'main',
        { preload: preload, create: create, update: update, render: render });
});

function create() {
    $(document.body).on('keydown', handleKeys);
//    player = game.add.sprite(0, 0, 'greeny');
    m.loadMap();
    game.world.setBounds(0, 0, m.getWidth() * gdim, m.getHeight() * gdim);
    game.camera.follow(m.player.image);
    m.player.fixedToCamera = false;
}

function update() {

}

function render() {
    if(debug){
        game.debug.text("DEBUG:", 10, 10);
        game.debug.text("playerHP: " + m.player.hp, 10, 25);
    }
}

function preload() {
    /* entities */
    game.load.image('greeny', '/static/game/assets/greeny.png');
    game.load.image('princess', '/static/game/assets/princess.png');

    /* tiles */
    game.load.image('grass', '/static/game/assets/grass.png');
    game.load.image('dirt', '/static/game/assets/dirt.png');
}
