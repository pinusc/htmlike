var context, frame_height_px, frame_width_px, frame_height, frame_width;
var game;
var m = new map();
var gdim = 32; // 12 is the original image size, 4 the scaling;
var toDebug = true, dbl = [];

/**
 * The only thing this does is to create  a new Phaser.Game object and assign it to game
 */
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


/**
 * The actual creation of the game.
 * Makes the camera follow the player.
 * Initializes UI
 * First myUpdate() call
 * @return {[type]} [description]
 */
function create() {
//    player = game.add.sprite(0, 0, 'greeny');
    m.loadMap();
    game.world.setBounds(0, 0, m.getWidth() * gdim, m.getHeight() * gdim);
    game.camera.follow(m.player.image);
    m.player.fixedToCamera = true;

    //input
    $(document.body).on('keydown', handleKeys);
    game.input.onTap.add(handleTap);

    createUI();
    //game.world.bringToTop(debug_button);

    //fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    myUpdate();
}

function update() {

}

/**
 * Creates info to debug and renders the debug info
 * @return {[type]} [description]
 */
function render() {
    if(toDebug){
        //console.log("toDebug");
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
    game.load.image('heart', '/static/game/assets/hearth.png');
    game.load.image('greeny', '/static/game/assets/character.png');
    game.load.image('princess', '/static/game/assets/dragon.png');

    /* tiles */
    game.load.image('grass', '/static/game/assets/grass.png');
    game.load.image('dirt', '/static/game/assets/dirt.png');

    /* ui */
    game.load.image('debug_button', '/static/game/assets/debug_button.png');
    game.load.image('fullscreen_button', '/static/game/assets/fullscreen_button.png');
}

/**
 * Actually render the debug info pushed through debug() and clear the dbl list
 * @return {[type]} [description]
 */
function renderDebug(){
    var x = 15;
    game.debug.text("DEBUG:", 10, x);
    for(var i = 0; i < dbl.length; i++){
        x += 15;
        var m = dbl[i];
        var temp = game.debug.text(m.text, 10, x, m.color);
    }
    dbl = [];  // clear debug list
}

/**
 * When called, pushes the desired debug message to phaser and is toDebug is set to true, the info will be rendered in the next render
 * @param  {String} text  [The text to display]
 * @param  {String} color [The color to display in hex format (ex. #FFFFFF)]
 * @return {undefined}
 */
function debug(text, color){
    dbl.push({text: text, color: color});
}

/**
 * When called, if debug info is displayed, it is no longer displayed.
 * @return {undefined}
 */
function toggleDebug() {
    toDebug = !toDebug;
}

/**
 * This  is called at every move and:
 * - makes the entities act;
 * - update FOV
 * @return {undefinded}
 */
function myUpdate(){
    for (var i = 0; i < m.entitiesL.length; i++) {
        m.entitiesL[i].act();
    }
    // iterate through every level of the map
    for(var l = 0; l < m.level.length; l++) {
        var currLev = m.level[l];
        for(i = 0; i < currLev.length; i++){
            for(var j = 0; j < currLev[i].length; j++){
                var currSprite = currLev[i][j];
                if(currSprite){
                    if (distance([i, j], m.player) > 4){
                        currSprite.setVisible(false);
                    } else {
                        currSprite.setVisible(true);
                    }
                }
            }
        }
    }
}