function Player(image){
    Entity.call(this, image, 10, 10);
    /**
    * A player isn't an entity like other... but in the core, he is.
    * Returns a modified entity.
    */

    this.hp = 20;  // player is STRONGER! TODO remove hardcode
    this.maxhp = 20;
    this.isPlayer = true;
    this.hearts = [];
    this.alignHearts();

    this.pixelSpeed = globSpeed;  // pixel / second
    game.physics.p2.enable(this.image);
    this.image.body.setZeroDamping();
    this.image.body.fixedRotation = true;
}

Player.prototype = Object.create(Entity.prototype, {});

Player.prototype.constructor = Player;

Player.prototype.oldHeal = Player.prototype.heal;
Player.prototype.heal = function(n) {
    this.oldHeal(n);
    this.alignHearts();
};

Player.prototype.oldDamage = Player.prototype.damage;
Player.prototype.damage = function(n) {
    this.oldDamage(n);
    this.alignHearts();
};

Player.prototype.alignHearts = function(){
    var nh = Math.floor(this.hp / 5); // number of hearths
    var nh_now = this.hearts.length;
    if (nh < nh_now){
        for(var i = 0; i < nh_now - nh; i++){
            this.hearts.pop().destroy(true);
        }
    } else if (nh > nh_now){
        for(var i = 0; i < nh - nh_now; i++){
            this.hearts.push(game.add.sprite(game.width - 50 * (this.hearts.length + 1), game.height - 55, 'heart'));
            this.hearts[this.hearts.length - 1].fixedToCamera = true;
        }
    }
};

Player.prototype.update = function(){
    var posx, posy;
    var body = this.image.body, x = body.x, y = body.y;
    posx = Math.floor(x / gdim);
    posy = Math.floor(y / gdim);
    if(posx === this.posx && posy === this.posy){
        return;
    }
    this.posx = posx;
    this.posy = posy;
    myUpdate();
    //console.log("image.x: " + this.image.x, ", image.y: " + this.image.y);
    //console.log("x: ", + x + ", y: " + y);
    //console.log("posx: " + posx + ", posy: " + posy);
    //console.log("\n\n");
};