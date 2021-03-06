class Potion extends Item
  constructor: (image, x, y, map) ->
    this.used = false
    super(image, x, y, map)

  drink: () ->
    if not this.used
      this.used = true
      return true
    throw new AlreadyUsedException this

class HealPotion1 extends Potion
  constructor: (x, y, map) ->
    super('potion', x, y, map)
    this.image.inputEnabled = true

  drink: (entity) ->
    super()  # check if potion is drinkable and everything
    if entity instanceof Player
      console.debug("drink potion this")
      console.debug(this)
      entity.heal(1)
      entity.inventory.update()  # TODO remove this horrible hack
      # TODO FIXME this.image.game is null, very big bug
      # entity.inventory.updateShowInventory(this.map.box.game, 32)
      # FIXME this is too hacky
      entity.inventory.toggleInventory()  # refresh the inventory
      entity.inventory.toggleInventory()

  startInventory: (entity) ->
    func = () ->
      if this.input.pointerDown(this.game.input.activePointer.id)
        this.input.reset()  # avoid 60 calls per second
        context.potion.drink(context.entity)
    context = {"potion": this, "entity": entity}
    super(func, context)



class Weapon extends Item
  constructor: (image, x, y, map) ->
    super(image, x, y, map)

class Sword extends Weapon
  constructor: (x, y, map) ->
    super('sword', x, y, map)
    this.attack = 1

class Fists extends Weapon
  constructor: (map) ->
    this.attack = 0

class AlreadyUsedException extends Error
  constructor: (item) ->
    this.message = "Already used Item: " + item


window.Items =
  Potion: Potion
  HealPotion1: HealPotion1
  Weapon: Weapon
  Sword: Sword
  Fists: Fists

