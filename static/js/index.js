var game;
var m = new map();
var gdim = 32; // tile size, stands for GraphicDIMension
var toDebug = false, dbl = [];
var cursors;  // the arrow keys
var yellow_border; // used in debug to see player position
var globSpeed = 100;  // GLOBalSPEED
var socket;
    
var baseAssetsFolder = '/static/assets';

/**
 * The only thing this does is to create  a new Phaser.Game object and assign it to game
 */
$(document).ready(function (){
    /* initializazion */

    // Set canvas height and width based on container dimensions
    var width = $("#main").width()
    var height = $("#main").height();
    $(window).resize(onResize);
    game = new Phaser.Game(width, height, Phaser.CANVAS, 'main',
        { preload: preload, create: create, update: update, render:render});
});


/**
 * The actual creation of the game.
 * Makes the camera follow the player.
 * Initializes UI
 * First myUpdate() call
 * @return {[type]} [description]
 */
function create() {
    socket = io.connect('http://' + document.domain + ':' + location.port + '/game');
    socket.on('map', function(msg){
        myCreate(msg);
    });
    game.paused = true;
}

function myCreate(jMap){
    console.log(jMap);
    game.physics.startSystem(Phaser.Physics.P2JS);
    m.loadMap(jMap);
    game.camera.follow(m.player.image);
    m.player.fixedToCamera = true;

    yellow_border = game.add.image(0, 0, 'yellow_border');
    yellow_border.alpha = 0;

    //input
    createKeys();
    game.input.onTap.add(handleTap);
    game.input.onDown.add(handleDown);
    game.input.onUp.add(handleUp);

    createUI();

    m.time.myUpdate();
    //socket.send("ciao");
    game.paused = false;
}

function update() {
    m.player.image.body.setZeroVelocity();
    handleInput();
    m.player.update();
}

/**
 * Creates info to debug and renders the debug info
 * @return {[type]} [description]
 */
function render() {
    if(toDebug){
        //console.log("toDebug");
        debug("playerHP: " + m.player.hp);
        debug("desktop: " + game.device.desktop);
        if(m.entitiesL[0]){
            debug("Wolf HP: " + m.entitiesL[0].hp);
        }
        debug(game.time.fps || '--', "#00ff00");
        debug("fpsMin: " + game.time.fpsMin || '--', "#00ff00");
        renderDebug();
    }
    //game.debug.pointer(game.input.pointer1);
}

function preload() {
    game.time.advancedTiming = true;  // to show fps
    /* entities */
    game.load.image('heart', baseAssetsFolder + '/hearth.png');
    game.load.image('greeny', baseAssetsFolder + '/character.png');
    game.load.image('princess', baseAssetsFolder + '/dragon.png');

    /* objects */
    game.load.image('potion', baseAssetsFolder + '/potion.png');

    /* tiles */
    game.load.image('grass', baseAssetsFolder + '/grass.png');
    game.load.image('dirt', baseAssetsFolder + '/dirt.png');

    /* ui */
    game.load.image('debug_button', baseAssetsFolder + '/debug_button.png');
    game.load.image('fullscreen_button', baseAssetsFolder + '/fullscreen_button.png');
    game.load.image('yellow_border', baseAssetsFolder + '/yellow_border.png');
    game.load.image('controller_ball', baseAssetsFolder + '/controller_ball.png');
    game.load.image('controller_ball_r', baseAssetsFolder + '/controller_ball_r.png');
    game.load.image('controller_base', baseAssetsFolder + '/controller_base.png');
    game.load.image('controller_base_r', baseAssetsFolder + '/controller_base_r.png');

    /* icons */
    game.load.image('bag', baseAssetsFolder + '/bag.png');

    game.load.image('tiles', baseAssetsFolder + '/tileset.png');
    game.load.tilemap('tilemap', baseAssetsFolder + "/map.json", null, Phaser.Tilemap.TILED_JSON);
}

/**
 * Actually render the debug info pushed through debug() and clear the dbl list
 * @return {[type]} [description]
 */
function renderDebug(){
    var x = 15;
    game.debug.text("DEBUG:", 10, x);
    _.each(dbl, function(m){
        x += 15;
        game.debug.text(m.text, 10, x, m.color);
    });
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
    yellow_border.alpha = yellow_border.alpha === 1 ? 0 : 1;
    toDebug = !toDebug;
}

function onResize() {
    console.log("onResize");
    var width = $("#main").width()
    var height = $("#main").height();

    game.width = width;
    game.height = height;
    game.stage.bounds.width = width;
    game.stage.bounds.height = height;
    game.scale.width = width;
    game.scale.height = height;
    game.camera.setSize(width, height);
    game.scale.setSize();

}