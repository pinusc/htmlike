var context, h, w;
var posx = 1, posy = 1;
var m = new map();
var gdim = 13 * 4; // 12 is theo riginal image size, 4 the scaling;

function handleKeys(e){
    var pl = entitiesL[0];
    switch (e.which) {
        case 37: // left arrow
        pl.move(pl.posx - 1, pl.posy);
        break;

        case 38: // up arrow
        pl.move(pl.posx, pl.posy - 1);
        break;

        case 39: // right arrow
        pl.move(pl.posx + 1, pl.posy);
        break;

        case 40: // down arrow
        pl.move(pl.posx, pl.posy + 1);
        break;
    }
    m.render();
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

    $(document.body).on('keydown', handleKeys);
    m.loadMap()
    m.render();
});
