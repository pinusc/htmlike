function Time(){
	this.tick = 0;
}

Time.prototype.advanceWorld = function(){
	this.tick++;
	_.each(m.entitiesL, function(entity){
		if ((this.tick % entity.speed) === 0){
			entity.act();
			entity.update();
		}
	}, this);

	if((this.tick % m.player.speed) === 0){
		return;
	} else {
		this.advanceWorld();
	}
};

Time.prototype.updateWorld = function(){
    _.each(m.itemsL, function(item){
        item.update();
    });

    _.each(m.entitiesL, function(entity){
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
    var ll = m.level.length;
    m.generateDKMap();
    m.time.updateWorld();
    m.time.advanceWorld();

    // iterate through every level of the map
    m.do_fov(m.player.posx, m.player.posy, 5);

    _.each(m.light, function(el, i){
        _.each(el, function(v, j){
            var q = 0;
            if(v === m.flag){
                q = 1;
            } else if (v === m.flag -1){
                q = 0.5;
            }

            if(q){
                _.each(m.level, function(f, l){
                    var currTile = m.map.getTile(j, i, l);
                    if(currTile){
                        currTile.alpha = q;
                    }
                }, this);
            }
        }, this);
    });
    _.each(m.level, function(level){
        level.dirty = true;
    });
    m.map.getTile(m.player.posx, m.player.posy, 0).alpha = 0.5;
    yellow_border.x = m.player.posx * gdim;
    yellow_border.y = m.player.posy * gdim;
}
