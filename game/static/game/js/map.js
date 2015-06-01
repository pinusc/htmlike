/* The level is composed by many grids.
* Ex. level[0] contains grass
*     level[1] contains walls
* They are rendered in order, so that level[1] overrides level[0];
* trasparency will work however;
*/

var ox = 6, oy = 4; //Where the player is located repect the screen

function map() { //todo rename to level
    /**
    * This is the constructor for the map object that will contain every tile in the game.
    */
    this.level = [[], []];
    this.entitiesL = [];
}

/**
 *  Parse the level contained in t and set the map's level
 * @param  {Array of String} t [Every String has the same length. If a character is a space, the tile generated will be empty. If is '#', the tile will be a block of dirt]
 * @return {undefined}
 */
map.prototype.parseLevel = function(t) {
    /**
    * Parses the level contained in t and set the map's level to t.
    * t is an array of strings where a space means nothing and a # means a block of dirt.
    * In future this will be implemented in JSON or XML.
    */
    var i, j, l;

    // initial level is grass only
    for(l = 0; l < 1; l++){
        var grid = this.level[l];
        for(i = 0; i < 15; i++){  // TODO remove hardcoded 15
            grid[i] = [];
            for (j = 0; j < 15; j++) {
                grid[i][j] = new Tile('grass', i, j);
            }
        }
        this.level[l] = grid;
    }

    // read the map
    for(i = 0; i < 15; i++){  // TODO remove hardcoded 15
        l = [];
        for (j = 0; j < 15; j++) {
            if(t.t[i][j] === '#'){
                l[j] = new Tile('dirt', i, j, true);
            } else {
                l[j] = null;
            }
            this.level[1][i] = l;
        }
    }
    return;
};

/**
 * Make an AJAX request that will return the map, then call parseLevel() to have it parsed
 * @return {[type]} [description]
 */
map.prototype.loadMap = function(){
    var that = this;

    var t = $.ajax({  // TODO make this receive the map through ajax
        type: "GET",
        url: 'level',
        async: false
    }).responseText;
    t = JSON.parse(t).content;
    game.load.tilemap('base', null, t, Phaser.Tilemap.TILED_JSON);
    this.map = game.add.tilemap('base');
    this.map.addTilesetImage('tiles', 'tiles');
    this.level[0] = this.map.createLayer('ground');
    this.level[1] = this.map.createLayer('walls');
    this.level[0].resizeWorld();
    this.level[1].resizeWorld();
    this.player = new Player('greeny');
    this.entitiesL[0] = new Entity('princess');
    console.log(this.map.tiles.length);
    this.map.setCollisionBetween(1, this.map.tiles.length, true, 'walls');
    game.physics.p2.convertTilemap(this.map, 'walls');
    return;
};
/**
 * [To get the width of the map]
 * @return {int} [The width of the map in tiles]
 */
map.prototype.getWidth = function() {
    return this.level[0].length;
};

/**
 * [To get the height of the map]
 * @return {int} [The height of the map in tiles]
 */
map.prototype.getHeight = function() {
    return this.level[0][0].length;
};
