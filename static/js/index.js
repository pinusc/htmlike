var box;
var yellow_border; // used in debug to see player position
    
function Box(){
    var width = $("#main").width()
    var height = $("#main").height();
    this.properties = new Properties();
    this.m = new map();
    this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'main',
        { preload: preload, create: createGame, update: update, render:render});
    this.toDebug = false;
    this.dbl = [];


    this.input = new Input();
}

/**
 * The only thing this does is to create  a new Phaser.Game object and assign it to game
 */
$(document).ready(function (){
    box = new Box();
    $(window).resize(box.onResize);
});

function createGame(){
    box.socket = io.connect('http://' + document.domain + ':' + location.port + '/game');
    box.socket.on('map', function(msg){
        myCreate(msg);
    });
    box.game.paused = true;
}


/**
 * The actual creation of the game.
 * Makes the camera follow the player.
 * Initializes UI
 * First myUpdate() call
 * @return {[type]} [description]
 */
function myCreate(jMap){
    console.log(jMap);
    box.game.physics.startSystem(Phaser.Physics.P2JS);
    box.m.loadMap(jMap);
    box.game.camera.follow(box.m.player.image);
    box.m.player.fixedToCamera = true;

    yellow_border = box.game.add.image(0, 0, 'yellow_border');
    yellow_border.alpha = 0;

    //input
    box.input.createKeys();
    box.game.input.onDown.add(box.input.handleDown, box.input);
    box.game.input.onUp.add(box.input.handleUp, box.input);

    createUI();

    box.m.time.myUpdate();
    //socket.send("ciao");
    box.game.paused = false;
}

function update() {
    box.m.player.image.body.setZeroVelocity();
    box.input.handleInput();
    box.m.player.update();
}

/**
 * Creates info to debug and renders the debug info
 * @return {[type]} [description]
 */
function render() {
    if(box.toDebug){
        //console.log("toDebug");
        box.debug("playerHP: " + box.m.player.hp);
        box.debug("desktop: " + box.game.device.desktop);
        if(box.m.entitiesL[0]){
            box.debug("Wolf HP: " + box.m.entitiesL[0].hp);
        }
        box.debug(box.game.time.fps || '--', "#00ff00");
        box.debug("fpsMin: " + box.game.time.fpsMin || '--', "#00ff00");
        box.renderDebug();
    }
    //game.debug.pointer(game.input.pointer1);
}

function preload() {
    var baseAssetsFolder = box.properties.baseAssetsFolder;
    box.game.time.advancedTiming = true;  // to show fps
    /* entities */
    box.game.load.image('heart', baseAssetsFolder + '/hearth.png');
    box.game.load.image('greeny', baseAssetsFolder + '/character.png');
    box.game.load.image('princess', baseAssetsFolder + '/dragon.png');

    /* objects */
    box.game.load.image('potion', baseAssetsFolder + '/potion.png');

    /* tiles */
    box.game.load.image('grass', baseAssetsFolder + '/grass.png');
    box.game.load.image('dirt', baseAssetsFolder + '/dirt.png');

    /* ui */
    box.game.load.image('debug_button', baseAssetsFolder + '/debug_button.png');
    box.game.load.image('fullscreen_button', baseAssetsFolder + '/fullscreen_button.png');
    box.game.load.image('yellow_border', baseAssetsFolder + '/yellow_border.png');
    box.game.load.image('controller_ball', baseAssetsFolder + '/controller_ball.png');
    box.game.load.image('controller_ball_r', baseAssetsFolder + '/controller_ball_r.png');
    box.game.load.image('controller_base', baseAssetsFolder + '/controller_base.png');
    box.game.load.image('controller_base_r', baseAssetsFolder + '/controller_base_r.png');

    /* icons */
    //box.game.load.image('bag', baseAssetsFolder + '/bag.png');
    box.game.load.image('tileset', baseAssetsFolder + '/tileset.png');
    //box.game.load.tilemap('tilemap', baseAssetsFolder + "/map.json", null, Phaser.Tilemap.TILED_JSON);
}

/**
 * Actually render the debug info pushed through debug() and clear the dbl list
 * @return {[type]} [description]
 */
Box.prototype.renderDebug = function(){
    var x = 15;
    this.game.debug.text("DEBUG:", 10, x);
    _.each(this.dbl, function(m){
        x += 15;
        this.game.debug.text(m.text, 10, x, m.color);
    }, this);
    this.dbl = [];  // clear debug list
}

/**
 * When called, pushes the desired debug message to phaser and is toDebug is set to true, the info will be rendered in the next render
 * @param  {String} text  [The text to display]
 * @param  {String} color [The color to display in hex format (ex. #FFFFFF)]
 * @return {undefined}
 */
Box.prototype.debug = function(text, color){
    this.dbl.push({text: text, color: color});
}

Box.prototype.onResize = function() {
    var width = $("#main").width()
    var height = $("#main").height();

    box.game.width = width;
    box.game.height = height;
    box.game.camera.setSize(width, height);
    box.game.scale.setSize();
}