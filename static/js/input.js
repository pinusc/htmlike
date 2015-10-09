// Generated by CoffeeScript 1.9.3
(function() {
  var Joystick;

  this.Input = (function() {
    function Input(box, game) {
      this.box = box;
      this.game = game;
      this.joystick_l_down = false;
      this.joystick_r_down = false;
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.game.input.onUp.add(this.handleUp, this);
      this.game.input.onDown.add(this.handleDown, this);
      this.joystick_l = new Joystick('controller_base', 'controller_ball', this.box, function(baseCenter, diff, dis) {
        var offset, xVelocity, yVelocity;
        if (dis > this.maxJoystickDistance) {
          offset = {
            x: this.maxJoystickDistance * diff.x / dis,
            y: this.maxJoystickDistance * diff.y / dis
          };
          this.ball.cameraOffset.x = baseCenter.x + offset.x - this.ball.width / 2;
          this.ball.cameraOffset.y = baseCenter.y + offset.y - this.ball.height / 2;
        } else {
          offset = diff;
        }
        xVelocity = offset.x / this.maxJoystickDistance * this.box.m.player.pixelSpeed;
        yVelocity = offset.y / this.maxJoystickDistance * this.box.m.player.pixelSpeed;
        return move(xVelocity, yVelocity, this.box.m.player.image.body);
      });
      this.joystick_r = new Joystick('controller_base_r', 'controller_ball_r', this.box, function(baseCenter, diff, dis) {
        if (dis < this.maxJoystickDistance) {
          return;
        }
        this.box.m.player.interact(direction(this.ball.cameraOffset.x, this.ball.cameraOffset.y, baseCenter.x, baseCenter.y));
        this.box.m.time.myUpdate();
        return this.handleUp();
      });
    }

    Input.prototype.handleInput = function() {
      this.handleKeys();
      this.joystick_l.handle();
      return this.joystick_r.handle();
    };

    Input.prototype.handleKeys = function() {
      var m;
      m = this.box.m;
      if (this.cursors.left.isDown) {
        if (this.cursors.left.altKey) {
          this.box.m.player.interact("left");
          this.cursors.left.reset();
          m.time.myUpdate();
        } else {
          move(-m.player.pixelSpeed, 0, m.player.image.body);
        }
      } else if (this.cursors.right.isDown) {
        if (this.cursors.right.altKey) {
          this.box.m.player.interact("right");
          this.cursors.right.reset();
          m.time.myUpdate();
        } else {
          move(m.player.pixelSpeed, 0, m.player.image.body);
        }
      }
      if (this.cursors.up.isDown) {
        if (this.cursors.up.altKey) {
          this.box.m.player.interact("up");
          this.cursors.up.reset();
          m.time.myUpdate();
        } else {
          move(0, -m.player.pixelSpeed, m.player.image.body);
        }
      } else if (this.cursors.down.isDown) {
        if (this.cursors.down.altKey) {
          this.box.m.player.interact("down");
          this.cursors.down.reset();
          m.time.myUpdate();
        } else {
          move(0, m.player.pixelSpeed, m.player.image.body);
        }
      }
      if (this.game.input.keyboard.isDown(71)) {
        return m.player.getItemOnGround();
      } else if (this.game.input.keyboard.isDown(13)) {
        return m.time.myUpdate();
      }
    };

    Input.prototype.handleDown = function() {
      var x, y;
      if (true || !this.game.device.desktop) {
        x = this.game.input.x;
        y = this.game.input.y;
        if (x < this.game.camera.width / 2) {
          return this.joystick_l.handleDown(x, y);
        } else {
          return this.joystick_r.handleDown(x, y);
        }
      }
    };

    Input.prototype.handleUp = function() {
      this.joystick_r.handleUp();
      return this.joystick_l.handleUp();
    };

    Input.prototype.gofull = function() {
      if (this.game.scale.isFullScreen) {
        return this.game.scale.stopFullScreen();
      } else {
        return this.game.scale.startFullScreen(false);
      }
    };

    Input.prototype.toggleDebug = function() {
      return this.box.toDebug = !this.box.toDebug;
    };

    Input.prototype.dbutton_down = function() {
      return this.toggleDebug();
    };

    Input.prototype.fbutton_down = function() {
      return this.gofull();
    };

    return Input;

  })();

  window.move = function(x, y, body) {
    if (x) {
      body.velocity.x = x;
    }
    if (y) {
      return body.velocity.y = y;
    }
  };

  Joystick = (function() {
    function Joystick(base, ball, box, wrapper) {
      this.box = box;
      this.wrapper = wrapper;
      this.game = this.box.game;
      this.ball = this.game.add.image(0, 0, ball);
      this.ball.alpha = 0.5;
      this.ball.fixedToCamera = true;
      this.ball.visible = false;
      this.base = this.game.add.image(0, 0, base);
      this.base.alpha = 0.5;
      this.base.fixedToCamera = true;
      this.base.visible = false;
      this.maxJoystickDistance = this.base.width / 2;
      this.isDown = false;
    }

    Joystick.prototype.handle = function() {
      var baseCenter, diff, dis, point;
      point = this.game.input.activePointer;
      if (!this.isDown) {
        return;
      }
      baseCenter = {
        x: this.base.cameraOffset.x + this.base.width / 2,
        y: this.base.cameraOffset.y + this.base.height / 2
      };
      diff = {
        x: point.x - baseCenter.x,
        y: point.y - baseCenter.y
      };
      dis = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
      if (dis < this.maxJoystickDistance) {
        this.ball.cameraOffset.x = point.x - this.ball.height / 2;
        this.ball.cameraOffset.y = point.y - this.ball.width / 2;
      }
      return this.wrapper(baseCenter, diff, dis);
    };

    Joystick.prototype.handleDown = function(x, y) {
      this.isDown = true;
      this.base.visible = true;
      this.base.cameraOffset.x = x - this.base.height / 2;
      this.base.cameraOffset.y = y - this.base.width / 2;
      this.ball.visible = true;
      this.ball.cameraOffset.x = x - this.ball.height / 2;
      return this.ball.cameraOffset.y = y - this.ball.width / 2;
    };

    Joystick.prototype.handleUp = function(x, y) {
      this.isDown = false;
      this.base.visible = false;
      return this.ball.visible = false;
    };

    return Joystick;

  })();

}).call(this);

//# sourceMappingURL=input.js.map
