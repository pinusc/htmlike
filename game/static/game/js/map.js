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
    this.itemsL = [];  //DijkistraMap
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


    // set all level tiles to not visible
    for(var l = 0; l < this.level.length; l++){
        for(var i = 0; i < this.map.width; i++){
            var temp = [];
            for(var j = 0; j < this.map.width; j++){
                var currTile = this.map.getTile(i, j, l);
                if(currTile){
                    currTile.alpha = 0;
                }
            }
        } 
    }


    this.player = new Player('greeny');
    this.entitiesL[0] = new Entity('princess', 12, 2);
    this.itemsL.push(new Item('potion', 20, 20));
    console.log(this.map.tiles.length);
    this.map.setCollisionBetween(1, this.map.tiles.length, true, 'walls');
    game.physics.p2.convertTilemap(this.map, 'walls');

    /* FOV code */
    this.mult = [ [1,  0,  0, -1, -1,  0,  0,  1],
                  [0,  1, -1,  0,  0, -1,  1,  0],
                  [0,  1,  1,  0,  0, -1, -1,  0],
                  [1,  0,  0,  1, -1,  0,  0, -1] ];
    this.light = _.range(this.getHeight()).map(function () {
        // Create one row
        return _.range(this.getWidth()).map(function () {
            return 0;
        });
    }, this);
    this.flag = 1;
    console.log("loadmap ended");
    return;
};

/**
 * [To get the width of the map]
 * @return {int} [The width of the map in tiles]
 */
map.prototype.getWidth = function() {
    return this.map.width;
};

/**
 * [To get the height of the map]
 * @return {int} [The height of the map in tiles]
 */
map.prototype.getHeight = function() {
    return this.map.height;
};

map.prototype.square = function(x, y){
    //level = level === null ? 1 : level; // default level to 1
    // TODO make level configurable
    return this.map.getTile(x, y, 1);
};

map.prototype.blocked = function(x, y){
    return (x < 0 || y < 0 ||
            x >= this.getWidth() || y >= this.getHeight() ||
            this.map.getTile(x, y, 1));
};

map.prototype.lit = function(x, y){
    return this.light[y][x] === this.flag;
};

map.prototype.set_lit = function(x, y){
    if(0 <= x && x < this.getWidth() && 0 <= y && y < this.getHeight()){
        this.light[y][x] = this.flag;
    }
};

map.prototype.cast_light = function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id){
    var new_start;
    if(start < end){
        return;
    }
    var radius_squared = radius * radius;
    for(var j = row; j < radius+1; j++){
        var dx = -j -1, dy = -j;
        var blocked = false;
        while(dx <= 0){
            dx++;
            var X = cx + dx * xx + dy * xy, Y = cy + dx * yx + dy * yy;
            var l_slope  = (dx-0.5)/(dy+0.5);
            var r_slope = (dx+0.5)/(dy-0.5);
            if (start < r_slope){
                continue;
            } else if (end > l_slope){
                break;
            } else {
                if (dx*dx + dy*dy < radius_squared){
                    this.set_lit(X, Y);
                }
                if (blocked){
                    if (this.blocked(X, Y)){
                        new_start = r_slope;
                        continue;
                    } else {
                        blocked = false;
                        start = new_start;
                    }
                } else {
                    if(this.blocked(X, Y) && j < radius){
                        blocked = true;
                        this.cast_light(cx, cy, j+1, start, l_slope, radius, xx, xy, yx, yy, id+1);
                        new_start = r_slope;
                    }
                }
            }
        }
        if (blocked){
            break;
        }
    }
};

map.prototype.do_fov = function(x, y, radius){
    console.log("do:fov");
    this.flag += 1;
    for(var oct = 0; oct < 8; oct++){
        this.cast_light(x, y, 1, 1.0, 0.0, radius,
            this.mult[0][oct], this.mult[1][oct],
            this.mult[2][oct], this.mult[3][oct], 0);
    }
};