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
};


map.prototype.render = function () {
    /**
    * Render tiles and entities relatively to the camera ie the player.
    */
    var p = player;
    var px = p.posx, py = p.posy;
    context.clearRect(0, 0, frame_width_px, frame_height_px);
    for(var l = 0; l < this.level.length; l++){
        var grid = this.level[l];

        for(var i = 0; i < grid.length; i++){
            for (var j = 0; j < grid[i].length; j++) {
                if(i >= 0 && j >= 0){
                    if(grid[i][j] !== 0){  // TODO: sustitute with Tile.render() method
                        context.drawImage(grid[i][j].image, (ox + i - px) * gdim, (oy + j - py) * gdim);
                    }
                }
            }
        }
    }

    for (var i = 0; i < entitiesL.length; i++) {
        entitiesL[i].render();
    }
    player.render();

};


map.prototype.parseLevel = function(t) {
    /**
    * Parses the level contained in t and set the map's level to t.
    * t is an array of strings where a space means nothing and a # means a block of dirt.
    * In future this will be implemented in JSON or XML.
    */
    console.log(t);
    for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
        var l = new Array();
        for (var j = 0; j < 15; j++) {
            if(t.t[i][j] === '#'){
                l[j] = new Tile('/static/game/dirt.png', true);
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
    * Get the map file with an AJAX request, then call parseLevel for using it.
    */
    var x = this;
    ajaxGet('level', function(content){
        //onSuccess
        x.parseLevel(content);
        return 0;
    })
    // initial level is grass only
    for(var l = 0; l < 1; l++){
        var grid = this.level[l];
        for(var i = 0; i < 21; i++){  // TODO remove hardcoded 15
            grid[i] = [];
            for (var j = 0; j < 21; j++) {
                grid[i][j] = new Tile('/static/game/grass.png');
            }
        }
        this.level[l] = grid;
    }
    console.log("LoadMap ended");
};
