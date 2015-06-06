function createUI()
{
    //enable fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // debug plgin - for a better fps monitoring
    game.add.plugin(Phaser.Plugin.Debug);

    /* debug button */
    dbutton = game.add.button(game.width - 32 * 3, 0, 'debug_button', toggleDebug(), this);
    dbutton.onInputDown.add(dbutton_down, this);
    dbutton.fixedToCamera = true;

    /* fullscreen button */
    fbutton = game.add.button(game.width - 32 * 3, 32, 'fullscreen_button', toggleDebug(), this);
    fbutton.onInputDown.add(fbutton_down, this);
    fbutton.fixedToCamera = true;

    /* joystick */
    joystick_base = game.add.sprite(0, 0, 'controller_base');
    joystick_base.alpha = 0.5;
	joystick_base.visible = false;
	joystick_base.fixedToCamera = true;
	maxJoystickDistance = joystick_base.width / 2;  // radius of the ball

    joystick_ball = game.add.image(0, 0, 'controller_ball');
    joystick_ball.alpha = 0.5;
    joystick_ball.fixedToCamera = true;
	joystick_ball.visible = false;
}
