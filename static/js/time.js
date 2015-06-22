function Time(map){
    this.map = map
    this.box = map.box;
	this.tick = 0;
}

Time.prototype.advanceWorld = function(){
	this.tick++;
	_.each(this.map.entitiesL, function(entity){
		if ((this.tick % entity.speed) === 0){
			entity.act();
			entity.update();
		}
	}, this);

	if((this.tick % this.map.player.speed) === 0){
		return;
	} else {
		this.advanceWorld();
	}
};

Time.prototype.updateWorld = function(){
    _.each(this.map.itemsL, function(item){
        item.update();
    });

    _.each(this.map.entitiesL, function(entity){
    	entity.update();
    })
}

/**
 * This  is called at every move and:
 * - makes the entities act;
 * - update FOV
 * @return {undefinded}
 */
Time.prototype.myUpdate = function(){
    var ll = this.map.level.length;
    this.map.generateDKMap();
    this.updateWorld();
    this.advanceWorld();

    // iterate through every level of the map
    this.map.do_fov(this.map.player.posx, this.map.player.posy, 5);

    _.each(this.map.light, function(el, i){
        _.each(el, function(v, j){
            var q = 0;
            if(v === this.map.flag){
                q = 1;
            } else if (v === this.map.flag -1){
                q = 0.5;
            }

            if(q){
                _.each(this.map.level, function(f, l){
                    var currTile = this.map.map.getTile(j, i, l);
                    if(currTile){
                        currTile.alpha = q;
                    }
                }, this);
            }
        }, this);
    }, this);
    _.each(this.map.level, function(level){
        level.dirty = true;
    });
    this.map.map.getTile(this.map.player.posx, this.map.player.posy, 0).alpha = 0.5;
    yellow_border.x = this.map.player.posx * this.box.properties.gdim;
    yellow_border.y = this.map.player.posy * this.box.properties.gdim;
}
