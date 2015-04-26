var context, h, w;
var posx = 1, posy = 1;

var gdim = 13 * 4; // 12 is theo riginal image size, 4 the scaling;

var greeny = new Image(), grass = new Image(), dirt = new Image();
greeny.src = '/static/game/greeny.png';
grass.src = '/static/game/grass.png';
dirt.src = '/static/game/dirt.png';

var entities = [greeny];
var level = [[], []];
/* The level is composed by many grids.
* Ex. level[0] contains grass
*     level[1] contains walls
* They are rendered in order, so that level[1] overrides level[0];
* trasparency will work however;
*/

level[1] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
];

// initial level is grass only
for(var l = 0; l < 1; l++){
  var grid = level[l];
  for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
    grid[i] = [];
    for (var j = 0; j < 15; j++) {
      grid[i][j] = grass;
    }
  }
}


for(var i = 0; i < 15; i++){  // TODO remove hardcoded 15
  for (var j = 0; j < 15; j++) {
    if(level[1][i][j] == 1){
      level[1][i][j] = dirt;
    }
  }
}

function move(x, y) {
  if(!level[1][x][y]){
    posx = x;
    posy = y;
  }
}

function handleKeys(e){
  console.log("Pressed: " + e.which)
  switch (e.which) {
    case 37: // left arrow
      move(posx - 1, posy);
      break;

    case 38: // up arrow
      move(posx, posy - 1);
      break;

    case 39: // right arrow
      move(posx + 1, posy);
      break;

    case 40: // down arrow
      move(posx, posy + 1);
      break;
  }
}

$(document).ready(function (){
  var $canvas = $("#screen");  //canvas

  // Set canvas height and width based on container dimensions
  var width = $("#main").css("width");
  var height = $("#main").css("height");
  w = parseInt(width.substring(0, width.length -2)); // numerical values
  h = parseInt(height.substring(0, height.length -2));
  $canvas.attr("width", width);
  $canvas.attr("height", height);

  context = $canvas[0].getContext('2d');
  greeny.onload = function() {
    context.drawImage(greeny, posx, posy);
  };

  $(document.body).on('keydown', handleKeys);
});

function render() {
  context.clearRect(0, 0, w, h);
  for(var l = 0; l < level.length; l++){
    var grid = level[l];
    for(var i = 0; i < grid.length; i++){
      for (var j = 0; j < grid[0].length; j++) {
        if(grid[i][j] != 0){
          context.drawImage(grid[i][j], i * gdim, j * gdim);
        }
      }
    }
  }

  for (var i = 0; i < entities.length; i++) {
    context.drawImage(entities[i], posx * gdim, posy * gdim);
  }
}

setInterval(render, 1000 / 60);
