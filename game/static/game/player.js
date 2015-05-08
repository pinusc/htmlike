function Player(image){
    var p = Object.create(new Entity(image));
    p.hp = 20;  // player is STRONGER! TODO remove hardcode
    p.maxhp = p.hp;
    p.posx = 10;
    p.posy = 10;
    p.isPlayer = true;
    return p;
}
