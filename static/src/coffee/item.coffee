class @Item extends Thing
  constructor: (image, x, y, map) ->
    super(image, x, y, map)
    this.isItem = true
    this.render()
