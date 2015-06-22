function Time(){
	this.tick = 0;
}

Time.prototype.advanceWorld = function(){
	this.tick++;
	_.each(box.m.entitiesL, function(entity){
		if ((this.tick % entity.speed) === 0){
			entity.act();
			entity.update();
		}
	}, this);

	if((this.tick % box.m.player.speed) === 0){
		return;
	} else {
		this.advanceWorld();
	}
};

Time.prototype.updateWorld = function(){
    _.each(box.m.itemsL, function(item){
        item.update();
    });

    _.each(box.m.entitiesL, function(entity){
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
    var ll = box.m.level.length;
    box.m.generateDKMap();
    box.m.time.updateWorld();
    box.m.time.advanceWorld();

    // iterate through every level of the map
    box.m.do_fov(box.m.player.posx, box.m.player.posy, 5);

    _.each(box.m.light, function(el, i){
        _.each(el, function(v, j){
            var q = 0;
            if(v === box.m.flag){
                q = 1;
            } else if (v === box.m.flag -1){
                q = 0.5;
            }

            if(q){
                _.each(box.m.level, function(f, l){
                    var currTile = box.m.map.getTile(j, i, l);
                    if(currTile){
                        currTile.alpha = q;
                    }
                }, this);
            }
        }, this);
    });
    _.each(box.m.level, function(level){
        level.dirty = true;
    });
    box.m.map.getTile(box.m.player.posx, box.m.player.posy, 0).alpha = 0.5;
    yellow_border.x = box.m.player.posx * box.properties.gdim;
    yellow_border.y = box.m.player.posy * box.properties.gdim;
}
