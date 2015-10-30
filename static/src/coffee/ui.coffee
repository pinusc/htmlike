window.yellow_border # used in debug to see player position

window.createUI = (box) ->
  #enable fullscreen
  box.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL

  # debug plugin - for a better fps monitoring
  box.game.add.plugin(Phaser.Plugin.Debug)

  # debug button #
  box.input.dbutton = box.game.add.button(box.game.width - 32 * 3, 0,
    'debug_button', Box.prototype.toggleDebug, box)
  box.input.dbutton.onInputDown.add(box.input.dbutton_down, box.input)
  box.input.dbutton.fixedToCamera = true

  # fullscreen button #
  box.input.fbutton = box.game.add.button(box.game.width - 32 * 3, 32,
    'fullscreen_button', box.input.gofull, box)
  #box.input.fbutton.onInputDown.add(box.input.fbutton_down, box.input)
  box.input.fbutton.fixedToCamera = true
