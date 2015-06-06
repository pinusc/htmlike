/** The map contains tilemap, player, entities and items */
function map() { //todo rename to level
    this.level = [[], []];
    this.itemsL = [];  //DijkistraMap
    this.entitiesL = [];
    this.time = new Time();
    this.DKMap = []
}

/**
 * Make an AJAX request  to get map, then actyally create it by calling game.add.tilemap
 * Instantiate base entities and objects, including player
 * Set all tiles of the map to be hidden
 * @return undefined
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
    this.map.setCollisionBetween(1, this.map.tiles.length, true, 'walls');
    game.physics.p2.convertTilemap(this.map, 'walls');


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

    this.DKMap = _.range(this.getHeight()).map(function () {
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
 * @return {int} [The width of the map in tiles]
 */
map.prototype.getWidth = function() {
    return this.map.width;
};

/**
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

/**
 * To know if a tille blocks the view or not
 * @param  int x x coordinate in tiles
 * @param  int y y coord in tiles
 * @return bool
 */
map.prototype.blocked = function(x, y){
    return (x < 0 || y < 0 ||
            x >= this.getWidth() || y >= this.getHeight() ||
            this.map.getTile(x, y, 1));
};

/**
 * @param  int x x coordinate in tiles
 * @param  int y y coord in tiles
 * @return bool The tile is currently visible
 */
map.prototype.lit = function(x, y){
    return this.light[y][x] === this.flag;
};


map.prototype.set_lit = function(x, y){
    if(0 <= x && x < this.getWidth() && 0 <= y && y < this.getHeight()){
        this.light[y][x] = this.flag;
    }
};

/**
 * The core of the FOV algorithm
 * Uses recursive shadowcasting to accomplish Line of Sight
 */
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

/**
 * Call this to compute FOV
 * @param  int x [the coordinate to start at]
 * @param  int y [the coordinate to start at]
 * @param  int radius [How many tiles the player can see]
 * @return undefined
 */
map.prototype.do_fov = function(x, y, radius){
    console.log("do:fov");
    this.flag += 1;
    for(var oct = 0; oct < 8; oct++){
        this.cast_light(x, y, 1, 1.0, 0.0, radius,
            this.mult[0][oct], this.mult[1][oct],
            this.mult[2][oct], this.mult[3][oct], 0);
    }
};


map.prototype.generateDKMap = function(){
    for(var kx = 0; kx < this.DKMap.length; kx++){
        for(var ky = 0; ky < this.DKMap[0].length; ky++){
            if(this.map.getTile(kx, ky, 1)){
                this.DKMap[kx][ky] = -1;
            } else {
                this.DKMap[kx][ky] = 100;
            }
        }
    }
    this.DKMap[this.player.posx][this.player.posy] = 0;  // the player is the only goal

    var changed = false;
    do {
        changed = false;
        for(var x = 0; x < this.DKMap.length; x++){
            for(var y = 0; y < this.DKMap[0].length; y++){
                var curr = this.DKMap[x][y];
                if (curr <= 0){
                    continue;
                }
                var lowest = curr;
                for(var i = x - 1; i <= x + 1; i++){
                    for(var j = y - 1; j <= y + 1; j++){
                        if(i >= 0 && j >= 0 &&
                            i < this.DKMap.length && j < this.DKMap[0].length){

                            var icurr = this.DKMap[i][j];

                            if(icurr < 0){ // solid block0
                                continue;
                            } else if(icurr < lowest){
                                lowest = icurr;
                            }
                        }
                    }
                }
                if(lowest <= curr - 2){
                    this.DKMap[x][y] = lowest + 1;
                    changed = true;
                }
            }
        }
    } while (changed);
    console.log(this.DKMap)
};