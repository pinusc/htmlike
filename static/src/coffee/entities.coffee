class @Entity extends Thing
  constructor: (image, x, y, map) ->
    super(image, x, y, map)
    this.hp = 1
    this.maxhp = this.hp
    this.isEntity = yes
    this.speed = 10
    this.mainWeapon = null
    this.image.game.physics.arcade.enable(this.image)
    this.image.body.collideWorldBounds = true
    #this.image.body.setZeroDamping()
    #this.image.body.fixedRotation = on
    this.pixelSpeed = this.map.box.properties.globSpeed
    this.image.body.immovable = true
    this.render()
    this.hitSprite =
      this.image.game.add.image(this.image.x, this.image.y, 'hit')
    this.hitSprite.visible = false

  move: (x, y) ->
    if not
    (0 <= x < this.map.level[0].width and 0 <= y < this.map.level[0].height) or
    this.map.map.getTile(x, y, 1)
      return

    for entity in this.map.entitiesL
      if entity.posx is x and entity.posy is y
        return this.attack entity

    if not this.isPlayer and
    this.map.player.posx is x and this.map.player.posy is y
      return this.attack(this.map.player)

    this.posx = x
    this.posy = y
    this.render()
    this.hitSprite.x = this.image.x
    this.hitSprite.y = this.image.y

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
    this.hitSprite.x = this.image.x
    this.hitSprite.y = this.image.y
    this.hitSprite.visible = true
    window.setTimeout((sprite) ->
      sprite.visible = false
    , 300, this.hitSprite)
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

