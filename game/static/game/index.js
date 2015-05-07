var context, frame_height_px, frame_width_px, frame_height, frame_width;
var m = new map();
var gdim = 13 * 4; // 12 is the original image size, 4 the scaling;
function handleKeys(e){
    switch (e.which) {
        case 37: // left arrow
        player.move(player.posx - 1, player.posy);
        break;

        case 38: // up arrow
        player.move(player.posx, player.posy - 1);
        break;

        case 39: // right arrow
        player.move(player.posx + 1, player.posy);
        break;

        case 40: // down arrow
        player.move(player.posx, player.posy + 1);
        break;
    }

    for (var i = 0; i < entitiesL.length; i++) { // Starting at 1 so doesn't affect player
        entitiesL[i].act();
    }
    m.render();
}

$(document).ready(function (){
    var $canvas = $("#screen");  //canvas

    // Set canvas height and width based on container dimensions
    var width = $("#main").css("width");
    var height = $("#main").css("height");
    frame_width_px = parseInt(width.substring(0, width.length - 2)); // numerical values
    frame_height_px = parseInt(height.substring(0, height.length - 2));
    frame_height = frame_height_px / gdim;
    frame_width = frame_width_px / gdim;
    $canvas.attr("width", width);
    $canvas.attr("height", height);

    context = $canvas[0].getContext('2d');

    m.loadMap()
    m.render();
    $(document.body).on('keydown', handleKeys);
});
