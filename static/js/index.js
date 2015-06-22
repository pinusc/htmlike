var boxx;
var yellow_border; // used in debug to see player position
    
function Box(){
    var width = $("#main").width()
    var height = $("#main").height();
    this.properties = new Properties();
    this.m = new map(this);
    var that = this;
    this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'main',
        {   preload: preload,
            create: createGame, 
            update: update, 
            render: render});
    this.toDebug = false;
    this.dbl = [];
    this.input = new Input(this);
}

/**
 * The only thing this does is to create  a new Phaser.Game object and assign it to game
 */
$(document).ready(function (){
    boxx = new Box();
    $(window).resize(boxx.onResize);
});

function createGame(){
    boxx.socket = io.connect('http://' + document.domain + ':' + location.port + '/game');
    boxx.socket.on('map', function(msg){
        boxx.myCreate(msg);
    });
    boxx.game.paused = true;
}


/**
 * The actual creation of the game.
 * Makes the camera follow the player.
 * Initializes UI
 * First myUpdate() call
 * @return {[type]} [description]
 */
Box.prototype.myCreate = function(jMap){
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.m.loadMap(jMap);
    this.game.camera.follow(this.m.player.image);
    this.m.player.fixedToCamera = true;

    yellow_border = this.game.add.image(0, 0, 'yellow_border');
    yellow_border.alpha = 0;

    //input
    this.input.createKeys();
    this.game.input.onDown.add(this.input.handleDown, this.input);
    this.game.input.onUp.add(this.input.handleUp, this.input);

    createUI(this);

    this.m.time.myUpdate();
    //socket.send("ciao");
    this.game.paused = false;
}

function update() {
    boxx.m.player.image.body.setZeroVelocity();
    boxx.input.handleInput();
    boxx.m.player.update();
}

/**
 * Creates info to debug and renders the debug info
 * @return {[type]} [description]
 */
function render() {
    var box = boxx;
    if(box.toDebug){
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
    var box = boxx;
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
    var box = boxx;
    var width = $("#main").width()
    var height = $("#main").height();

    box.game.width = width;
    box.game.height = height;
    box.game.camera.setSize(width, height);
    box.game.scale.setSize();
}