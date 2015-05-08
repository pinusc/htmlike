function Player(image){
    var p = Object.create(new Entity(image));
    p.hp = 20;  // player is STRONGER! TODO remove hardcode
    p.posx = 10;
    p.posy = 10;
    return p;
}
