export default class Main extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
  }
  
  preload() {
    this.load.image("sky", "../public/assets/sky.webp");
    this.load.image("platform", "../public/assets/platform.png");
    this.load.image("gameover", "../public/assets/gameover.png");
    this.load.spritesheet("dude", "../public/assets/dude.png",{
    frameWidth: 32,
    frameHeight: 48,
    });
  }

  create() {
    //MAPA
    this.add.image(400, 300, "sky").setScale(2);
    this.plataformas = this.physics.add.group();
    const platform = this.plataformas.create(400, 568, "platform").setScale(2);
    platform.setImmovable(true);
    platform.body.allowGravity = false;
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    //PERSONAJE
    this.cursor = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0, 0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.plataformas);
    //this.player.body.setGravityY(300)
    this.player.anims.play("right", true);
    this.player.setCollideWorldBounds(true);
  }
    
  update() {
      if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-230);
      }
  }










}