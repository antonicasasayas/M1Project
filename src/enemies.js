// enemies
const enemyTypes = [];
const enemy1 = new Image();
enemy1.src = "./images/animatedEnemy.png";
enemyTypes.push(enemy1);
const enemy2 = new Image();
enemy2.src = "./images/enemy2.png";
enemyTypes.push(enemy2);
const enemy3 = new Image();
enemy3.src = "./images/enemy3.png";
enemyTypes.push(enemy3);
const enemy4 = new Image();
enemy4.src = "./images/littleEnemy.png";
enemyTypes.push(enemy4);

class Enemy {
    constructor(canvas, cellSize, cellGap, frame) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 750;
    this.y = 0;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    
    
      this.enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      if (this.enemyType === enemyTypes[0]) {
        this.health = 150+0.02*frame;
        this.spriteWidth = 377;
        this.spriteHeight = 404;
        this.speed =  0.8;
      } else if (this.enemyType === enemyTypes[1]) {
        this.health = 200+0.02*frame;
        this.spriteWidth = 445;
        this.spriteHeight = 469;
        this.speed = 0.6;
      } else if (this.enemyType === enemyTypes[2]) {
        this.health = 250+0.02*frame;
        this.spriteWidth = 396;
        this.spriteHeight = 406;
        this.speed = 0.4;
      } else {
        this.health = 100+0.02*frame;
        this.spriteWidth = 292;
        this.spriteHeight = 248;
        this.speed = 1;
      }
      this.movement = this.speed;
      this.maxHealth = this.health;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    
    
  }
 
  update() {
    // y = 0-400 x = 750
    if (this.y < 400 && this.x === 750) {
      this.y += this.movement;
    } // y = 400 x = 750-550
    else if (this.x > 550) {
      this.x -= this.movement;
    } // y = 400-50 x = 550
    else if (this.x >= 500 && this.y >= 50) {
      this.y -= this.movement;
    } //  y = 50 x = 550-250
    else if (this.x > 225 && this.y < 50) {
      this.x -= this.movement;
    } //  y = 50-200 x = 250
    else if (this.x > 200 && this.x < 250 && this.y < 220) {
      this.y += this.movement;
    } // y = 200 x = 250-75
    else if (this.y > 200 && this.y < 250 && this.x > 75) {
      this.x -= this.movement;
    } // y = 200-350 x =75
    else if (this.x > 25 && this.x < 100 && this.y < 375) {
      this.y += this.movement;
    } // y = 352 x = 75-0
    else if (this.y > 350 && this.x < 200) {
      this.x -= this.movement;
      this.y += this.movement;
    }

    if (this.frameX < this.maxFrame) this.frameX += 1;
    else this.frameX = this.minFrame;
  }
  draw() {
    this.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    this.ctx.drawImage(
      this.enemyType,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
