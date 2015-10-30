class @Item extends Thing
  constructor: (image, x, y, map) ->
    super(image, x, y, map)
    this.isItem = true
    this.render()

  startInventory: (updateFunc, context) ->
    # when inventory is shown, object sprites need to
    # accept input
    # for now its just click to activate
    # console.log updateFunc
    this.image.input.start()
    this.image.update = updateFunc
    this.context = context
    # FIXME this is uglyy

  stopInventory: () ->
    this.image.input.stop()
    this.update = undefined
    this.context = undefined

  destroy: () ->
    this.image.destroy()
