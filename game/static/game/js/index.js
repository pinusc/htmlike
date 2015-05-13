var context, frame_height_px, frame_width_px, frame_height, frame_width;
var game;
var m = new map();
var gdim = 13 * 4; // 12 is the original image size, 4 the scaling;
var toDebug = true, dbl = [];

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
    game = new Phaser.Game(frame_width_px, frame_height_px, Phaser.AUTO, 'main',
        { preload: preload, create: create, update: update, render: render });
});

function create() {
//    player = game.add.sprite(0, 0, 'greeny');
    m.loadMap();
    game.world.setBounds(0, 0, m.getWidth() * gdim, m.getHeight() * gdim);
    game.camera.follow(m.player.image);
    m.player.fixedToCamera = false;

    //input
    $(document.body).on('keydown', handleKeys);
    game.input.onTap.add(handleTap);

    //fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
}

function update() {

}

function render() {
    if(toDebug){
        console.log("toDebug");
        debug("playerHP: " + m.player.hp, "#000000");
        if(m.entitiesL[0]){
            debug("PrincessHP: " + m.entitiesL[0].hp);
        }
        renderDebug();
    }
    //game.debug.pointer(game.input.pointer1);
}

function preload() {
    /* entities */
    game.load.image('greeny', '/static/game/assets/greeny.png');
    game.load.image('princess', '/static/game/assets/princess.png');

    /* tiles */
    game.load.image('grass', '/static/game/assets/grass.png');
    game.load.image('dirt', '/static/game/assets/dirt.png');
}


function renderDebug(){
    /**
    * Tell Phaser to actually render the debug info pushed through debug()
    */
    var x = 15;
    game.debug.text("DEBUG:", 10, x);
    for(var i = 0; i < dbl.length; i++){
        x += 15;
        var m = dbl[i];
        game.debug.text(m.text, 10, x, m.color);
    }
    dbl = [];  // clear debug list
}

function debug(text, color){
    /**
    * Add a debug text
    */

    dbl.push({text: text, color: color});
}
