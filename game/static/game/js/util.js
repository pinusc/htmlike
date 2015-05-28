
function distance(coord1, coord2) {
    if (coord1.isEntity){
        // ectract coordinates from entity
        coord1 = [coord1.posx, coord1.posy];
    }
    if (coord2.isEntity){
        // ectract coordinates from entity
        coord2 = [coord2.posx, coord2.posy];
    }
    var x1 = coord1[0];
    var y1 = coord1[1];

    var x2 = coord2[0];
    var y2 = coord2[1];

    var difx = x1 - x2;
    var dify = y1 - y2;
    var dist = Math.sqrt(difx * difx + dify * dify);
    return dist;
}
