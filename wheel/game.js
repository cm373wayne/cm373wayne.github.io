var game;
var wheel;
var canSpin;
var slices = 8;
var slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];
var prize;
var prizeText;
var graphWheel;
window.onload = function() {
  game = new Phaser.Game(458, 488, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
};
var playGame = function(game) {
};
playGame.prototype = {preload:function() {
  game.load.image("pin", "pin.png");
}, create:function() {
  game.stage.backgroundColor = "#880044";
  var graphics = game.add.graphics(game.world.centerX, game.world.centerY);
  var colors = [12268526, 16763972, 16720452, 48008, 12268526, 16763972, 16720452, 48008];
  for (var i = 0;i < 8;i++) {
    graphics.lineStyle(0);
    graphics.beginFill(colors[i]);
    graphics.arc(0, 0, 228.5, game.math.degToRad(45 * (i + 1)), game.math.degToRad(45 * i), true);
    graphics.endFill();
  }
  graphWheel = game.add.sprite(game.width / 2, game.width / 2, graphics.generateTexture());
  graphWheel.anchor.set(.5);
  graphics.destroy();
  var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
  pin.anchor.set(.5);
  prizeText = game.add.text(game.world.centerX, 480, "");
  prizeText.anchor.set(.5);
  prizeText.align = "center";
  canSpin = true;
  game.input.onDown.add(this.spin, this);
}, spin:function() {
  if (canSpin) {
    prizeText.text = "";
    var rounds = game.rnd.between(2, 4);
    var degrees = game.rnd.between(0, 360);
    prize = slices - 1 - Math.floor(degrees / (360 / slices));
    canSpin = false;
    var spinTween = game.add.tween(graphWheel).to({angle:360 * rounds + degrees}, 3E3, Phaser.Easing.Quadratic.Out, true);
    spinTween.onComplete.add(this.winPrize, this);
  }
}, winPrize:function() {
  canSpin = true;
  prizeText.text = slicePrizes[prize];
}};