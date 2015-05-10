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
    this.player;
};


map.prototype.parseLevel = function(t) {
    /**
    * Parses the level contained in t and set the map's level to t.
    * t is an array of strings where a space means nothing and a # means a block of dirt.
    * In future this will be implemented in JSON or XML.
    */

    // initial level is grass only
    for(var l = 0; l < 1; l++){
        var grid = this.level[l];
        for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
            grid[i] = [];
            for (var j = 0; j < 15; j++) {
                grid[i][j] = new Tile('grass', i, j);
            }
        }
        this.level[l] = grid;
    }

    // read the map
    for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
        var l = new Array();
        for (var j = 0; j < 15; j++) {
            if(t.t[i][j] === '#'){
                l[j] = new Tile('dirt', i, j, true);
            } else {
                l[j] = 0;
            }
            this.level[1][i] = l;
        }
    }
    return 0;
};

map.prototype.loadMap = function(){
    /**
    * Get the map file with an AJAX request, then call parseLevel for having it
    * parsed
    */

    var that = this;

    var t = $.ajax({
        type: "GET",
        url: 'level',
        async: false
    }).responseText;
    this.parseLevel(JSON.parse(t).content);
    this.player = Player('greeny');
    this.entitiesL[0] = new Entity('princess');

    console.log("LoadMap ended");
};

map.prototype.getWidth = function() {
    /**
    * Returns width of the map, in tiles
    */
    return this.level[0].length;
};

map.prototype.getHeight = function() {
    /**
    * Returns height of the map, in tiles
    */
    return this.level[0][0].length;
};
