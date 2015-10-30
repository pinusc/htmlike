class @Player extends Entity
  constructor: (image, map) ->
    super(image, 10, 10, map)
    this.hp = 5
    this.maxhp = this.hp
    this.isPlayer = yes
    this.hearts = []
    this.inventory = new Inventory(this)
    this.stat = new Stats(2, 2, 2, 2, 2, this.inventory,
      this.map.box.game.add.text(0, 200))
    this.alignHearts()
    this.image.body.immovable = false
    #this.image.body.setSize(this.map.box.properties.gdim / 2,
    #  this.map.box.properties.gdim / 2)
    this.pixelSpeed = this.map.box.properties.globSpeed

  getItemOnGround: () ->
    m = this.map
    to_add = _.filter(m.itemsL, (item) ->
      item.posx == this.posx && item.posy == this.posy
    , this)
    m.itemsL = _.filter(m.itemsL, (item) ->
      item.posx != this.posx || item.posy != this.posy
    , this)

    _.each(to_add,
      (it) ->
        this.inventory.add(it)
        it.setVisible(false)
      , this)
    this.stat.updateStat()

  heal: (hp) ->
    console.log "heal"
    super(hp)
    this.alignHearts()

  damage: (hp) ->
    super(hp)
    this.alignHearts()

  attack: (enemy) ->
    roll = r2d6() + this.stat.attack()
    if  roll >= 10
      enemy.damage(2)
    else if roll >= 6
      enemy.damage(1)

  alignHearts: () ->
    nh = this.hp
    nh_now = this.hearts.length
    if nh < nh_now
      for i in [0 .. nh_now - nh - 1]
        this.hearts.pop().destroy(yes)
    else if nh > nh_now
      for i in [0 .. nh - nh_now - 1]
        this.hearts.push(this.map.box.game.add.sprite(
          this.map.box.game.width - 50 * (this.hearts.length + 1),
          this.map.box.game.height - 55, 'heart'))
        this.hearts[this.hearts.length - 1].fixedToCamera = true

  update: () ->
    body = this.image.body
    x = body.x
    y = body.y
    posx = (x + this.map.box.properties.gdim / 2) //
      this.map.box.properties.gdim
    posy = (y + this.map.box.properties.gdim / 2) //
      this.map.box.properties.gdim
    if posx is this.posx and posy is this.posy
      return
    this.posx = posx
    this.posy = posy
    this.stat.updateStat()
    this.map.time.myUpdate()

  drinkBestPotion: () ->
    # selects the best healing potion for current life from
    # the inventory and automagically drinks it
    # TODO: actually implement best potion choice
    # (now only select first potion
    for item in this.inventory.arr
      if item instanceof Items.Potion
        return item.drink(this)

class Stats
  constructor: (cool, hard, hot, sharp, weird, @inventory, @text) ->
    # player statistics are inspired by Apocalypse World
    this.setStat('cool', cool)
    this.setStat('hard', hard)
    this.setStat('hot', hot)
    this.setStat('sharp', sharp)
    this.setStat('weird', weird)

    this.text.fixedToCamera = true
    this.text.setStyle({
      fill: "white",
      stroke: "black",
      strokeThickness: 2,
      font: "VT323",
      fontSize: 32})

  updateStat: () ->
    this.text.setText(this.genText())
    
  setStat: (stat, num) ->
    # TODO: add check
    this[stat] = num
    this.updateStat()

  attack: () ->
    # attack is calculated based on hard score and weapon modifier
    this.hard + this.inventory.mainWeapon.attack

  genText: () ->
    text = ""
    for stat in ["cool", "hard", "hot", "sharp", "weird"]
      text += stat + ": " + this[stat] + "\n"
    text += "attack: " + this.attack()
