function createUI()
{
    dbutton = game.add.button(game.width - 32 * 3, 0, 'debug_button', toggleDebug(), this);
    dbutton.onInputDown.add(dbutton_down, this);
    dbutton.fixedToCamera = true;

    fbutton = game.add.button(game.width - 32 * 3, 32, 'fullscreen_button', toggleDebug(), this);
    fbutton.onInputDown.add(fbutton_down, this);
    fbutton.fixedToCamera = true;
}
