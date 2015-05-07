/* The level is composed by many grids.
* Ex. level[0] contains grass
*     level[1] contains walls
* They are rendered in order, so that level[1] overrides level[0];
* trasparency will work however;
*/
var grass = new Tile('/static/game/grass.png');
var dirt = new Tile('/static/game/dirt.png');

var ox = 6, oy = 4; //Where the player is located repect the screen

function map() { //todo rename to level
    this.level = [[], []];
};


map.prototype.render = function () {
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
    console.log(t);
    for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
        var l = new Array();
        for (var j = 0; j < 15; j++) {
            if(t.t[i][j] === '#'){
                l[j] = dirt;
                // console.log('#');
            } else {
                l[j] = 0;
                // console.log('w');
            }
            this.level[1][i] = l;
        }
    }
    return 0;
};

map.prototype.loadMap = function(){
    var x = this;
    ajaxGet('level', function(content){
        //onSuccess
        // alert("before call parseLevel")
        x.parseLevel(content);
        return 0;
    })
    // initial level is grass only
    for(var l = 0; l < 1; l++){
        var grid = this.level[l];
        for(var i = 0; i < 21; i++){  // TODO remove hardcoded 15
            grid[i] = [];
            for (var j = 0; j < 21; j++) {
                grid[i][j] = grass;
            }
        }
        this.level[l] = grid;
    }
    console.log("LoadMap ended");
};
