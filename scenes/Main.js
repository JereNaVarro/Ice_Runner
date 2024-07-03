export default class Main extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.playerLife = 1;
  }
  
  preload() {
    this.load.image("sky", "../public/assets/sky.webp");
    this.load.image("platform", "../public/assets/platform.png");
    this.load.image("gameover", "../public/assets/gameover.png");
    this.load.image("ground", "../public/assets/ground.png");
    this.load.spritesheet("dude", "../public/assets/dude.png",{
    frameWidth: 32,
    frameHeight: 48,
    });
  }

  create() {
    //MAPA
    this.add.image(400, 300, "sky").setScale(2);
    this.ground = this.physics.add.image(400, 568, "ground").setImmovable().setScale(2);
    this.ground.body.allowGravity = false;
    this.plataformas = this.physics.add.group();
    const platform = this.plataformas.create(400, 800, "platform").setScale(2);
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
    this.physics.add.collider(this.player, this.ground);
    this.player.body.setGravityY(800);
    this.player.anims.play("right", true);
    this.player.setCollideWorldBounds(true);
    //plataformas
    this.time.addEvent({
      delay: 2000,
      callback: this.createPlatform,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.player, this.plataformas, this.platformImpact, null, this);
  }

    
  update() {
      if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-600);
      }
  }

  createPlatform() {
    const x = 800;
    const y = 520;
    const width = Phaser.Math.FloatBetween(0.2, 0.4);
    const platform = this.plataformas.create(x, y, "platform");
    platform.setScale(width, 1).refreshBody();
    platform.setVelocityX(-200);
    platform.setImmovable(true);
    platform.body.allowGravity = false;

  }   
  platformImpact() {
    this.playerLife = 0
    console.log(this.playerLife); 
  }
    
  
}