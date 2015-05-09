function Player(image){
    /**
    * A player isn't an entity like other... but in the core, he is.
    * Returns a modified entity.
    */
    var p = Object.create(new Entity(image));
    p.hp = 20;  // player is STRONGER! TODO remove hardcode
    p.maxhp = p.hp;
    p.posx = 10;
    p.posy = 10;
    p.isPlayer = true;
    return p;
}
