
/**
 * @param  {Entity or Array of int} coord1 [The object or the coordinate of the object to calculate the distance of]
 * @param  {Entity or Array of int} coord2 [The object or the coordinate of the object to calculate the distance of]
 * @return {float} [The distance between the points indicated]
 */
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


function direction(x1, y1, x2, y2){
    var xdiff = Math.abs(x1 - x2);
    var ydiff = Math.abs(y1 - y2);
    if (xdiff > ydiff){
        if (x1 > x2){
            return "right"
        } else {
            return "left"
        }
    } else {
        if (y1 > y2){
            return "down"
        } else {
            return "up"
        }
    }
}