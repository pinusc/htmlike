class @Entity extends Thing
    constructor: (image, x, y, map) ->
        super(image, x, y, map)
        this.hp = 1
        this.maxhp = this.hp
        this.isEntity = yes
        this.speed = 10
        this.mainWeapon = 
        this.render()

    ###
    Check if something blocks at position (x, y).
    If there is a wall or the tile doesn't exist, does nothing and returns 
    null.
    If an entity is blocking, attacks it.
    Else, moves there
    ###
    move: (x, y) ->
        # if x and y are not in the margins or there is a wall
        if not (0 <= x < this.map.level[0].width and
          0 <= y < this.map.level[0].height) or
          this.map.map.getTile(x, y, 1)
            return

        for entity in this.map.entitiesL
            if entity.posx is x and entity.poy is y
                return this.attack entity

        if not this.isPlayer and 
          this.map.player.posx is x and this.map.player.posy is y
            return this.attack(this.map.player)

        this.posx = x
        this.posy = y
        this.render()

    ###
    The AI of the entity,
    For now, simply chases the player if he's near enough
    ###
    act: () ->
        x = this.posx
        y = this.posy
        curr = this.map.DKMap[x][y]
        coor = {x: x, y: y}
        for i in [x-1 .. x+1]
            for j in [y-1 .. y+1]
                if 0 <= this.map.DKMap[i][j] < curr
                    curr = this.map.DKMap[i][j]
                    coor = {x: i, y: j}

        this.move(coor.x, coor.y)

    attack: (enemy) ->
        if r2d6() > 6
            enemy.damage(1)

    damage: (hp) ->
        this.hp -= hp
        if this.hp <= 0
            this.die()

    heal: (hp) ->
        this.hp += heal
        this.hp = this.maxhp if this.hp > this.maxhp

    die: () ->
        this.map.entitiesL.splice(this.map.entitiesL.indexOf(this), 1)
        this.image.destroy(true)

    interact: (direction) ->
        toInteractX = this.posx
        toInteractY = this.posy
        switch direction
            when "up"
                toInteractY--
            when "down"
                toInteractY++
            when "left"
                toInteractX--
            when "right"
                toInteractX++

        f = (en) -> 
            en.posx is toInteractX and en.posy is toInteractY
        en = _.find(this.map.entitiesL, f)
        if en?
            this.attack(en)

