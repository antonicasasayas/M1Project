const projectile1 = new Image();
projectile1.src = "./images/arrow1.png";
const projectile2 = new Image();
projectile2.src = "./images/arrow4.png";
const magicProjectile = new Image();
magicProjectile.src = "./images/magicProjectile.png"
const stoneProjectile = new Image();
stoneProjectile.src = "./images/stoneProjectile (1).png"
const fireProjectile = new Image();
fireProjectile.src = "./images/fireProjectile.png"
const projectile3 = new Image();
projectile3.src = "./images/arrowDown.png"

class Projectile {
  
  constructor(canvas, x, y, direction, chosenDefender) {
    
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    if (chosenDefender === 1) {
      this.power = 25;
      this.speed = 5;
    } else if (chosenDefender === 2) {
      this.power = 4
      this.speed = 10;
    } else if (chosenDefender === 3) {
      this.power = 80
      this.speed = 4;
    } else if (chosenDefender === 4) {
      this.power = 120
      this.speed = 4;
    } 
    this.direction = direction;
    this.chosenDefender = chosenDefender;
  }

  update() {
    if (this.direction === "up") {
      this.y -= this.speed;
    } else if (this.direction === "right") {
      this.x += this.speed;
    } else if (this.direction === "down") {
      this.y += this.speed;
    } else {
      this.x -= this.speed;
    }
  }
  draw() {
    if (this.direction === "up" && this.chosenDefender === 1) {
      this.ctx.drawImage(
        projectile2,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.direction === "right" && this.chosenDefender === 1) {
      this.ctx.drawImage(
        projectile1,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.direction === "up" && this.chosenDefender === 2) {
      this.ctx.drawImage(
        magicProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.direction === "right" && this.chosenDefender === 2) {
      this.ctx.drawImage(
        magicProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 3 && this.direction === "up") {
      this.ctx.drawImage(
        fireProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 3 && this.direction === "right") {
      this.ctx.drawImage(
        fireProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 4 && this.direction === "up") {
      this.ctx.drawImage(
        stoneProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 4 && this.direction === "right") {
      this.ctx.drawImage(
        stoneProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 4 && this.direction === "down") {
      this.ctx.drawImage(
        stoneProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 4 && this.direction === "left") {
      this.ctx.drawImage(
        stoneProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 3 && this.direction === "down") {
      this.ctx.drawImage(
        fireProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 3 && this.direction === "left") {
      this.ctx.drawImage(
        fireProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 2 && this.direction === "down") {
      this.ctx.drawImage(
        magicProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 2 && this.direction === "left") {
      this.ctx.drawImage(
        magicProjectile,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 1 && this.direction === "left") {
      this.ctx.drawImage(
        projectile1,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } else if (this.chosenDefender === 1 && this.direction === "down") {
      this.ctx.drawImage(
        projectile3,
        this.x,
        this.y - 50,
        this.width,
        this.height
      );
    } 
  }
}

// this.defenders
const archerTower = new Image();
archerTower.src = "./images/archerTower1.png";
const magicTower = new Image();
magicTower.src = "./images/Magic Tower.png";
const stoneTower = new Image();
stoneTower.src = "./images/stoneTower.png";
const fireTower = new Image();
fireTower.src = "./images/Fire Tower.png";

class Defender {
  constructor(canvas, x, y, chosenDefender) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = x;
    this.y = y;
    this.width = 75 - 3 * 2;
    this.height = 75 - 3 * 2;
    this.vertical = false;
    this.shooting = false;
    this.down = false;
    this.left = false;
    this.timer = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 171;
    this.spriteHeight = 163;
    this.chosenDefender = chosenDefender;
  }
  draw() {
    if (this.chosenDefender === 1) {
      this.ctx.drawImage(archerTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 2) {
      this.ctx.drawImage(magicTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 3) {
      this.ctx.drawImage(fireTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 4) {
      this.ctx.drawImage(stoneTower, this.x, this.y, this.width, this.height);
    }
  }
  update(projectiles) {
    
    if (this.vertical) {
      if (!this.shooting && !this.down && !this.left) {
        this.timer += 1;
      }

      if (this.timer % 50 === 0 && this.chosenDefender === 1) {
        
        projectiles.push(
          new Projectile(this.canvas, this.x, this.y + 50, "up", this.chosenDefender)
        );
      }
    
      if (this.timer % 70 === 0 && this.chosenDefender === 3) {
        projectiles.push(
          new Projectile(this.canvas, this.x, this.y + 50, "up", this.chosenDefender)
        );
      }
      if (this.timer % 100 === 0 && this.chosenDefender === 4) {
        projectiles.push(
          new Projectile(this.canvas, this.x, this.y + 50, "up", this.chosenDefender)
        );
      }
      

      if (this.timer % 20 === 0 && this.chosenDefender === 2) {
        projectiles.push(
          new Projectile(this.canvas, this.x, this.y + 50, "up", this.chosenDefender)
        );
      }
    }
    if (this.shooting) {
      if (!this.down && !this.vertical && !this.left) {
        this.timer++;
      }
        if (this.timer % 20 === 0 && this.chosenDefender === 2) {
          projectiles.push(
            new Projectile(this.canvas, this.x + 70, this.y + 50, "right", this.chosenDefender)
          );
        }
        if (this.timer % 50 === 0 && this.chosenDefender === 1) {
          projectiles.push(
            new Projectile(this.canvas, this.x + 70, this.y + 50, "right", this.chosenDefender)
          );
        }
        if (this.timer % 70 === 0 && this.chosenDefender === 3) {
          projectiles.push(
            new Projectile(this.canvas, this.x + 70, this.y + 50, "right", this.chosenDefender)
          );
        }
        if (this.timer % 100 === 0 && this.chosenDefender === 4) {
          projectiles.push(
            new Projectile(this.canvas, this.x + 70, this.y + 50, "right", this.chosenDefender)
          );
        }
      
    }
    if (this.down) {
      if (!this.shooting && !this.vertical && !this.left) {
        this.timer++;
      }
      if (this.timer % 20 === 0 && this.chosenDefender === 2) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 35,
            this.y + 50,
            "down",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 50 === 0 && this.chosenDefender === 1) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x ,
            this.y + 50,
            "down",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 70 === 0 && this.chosenDefender === 3) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x -50,
            this.y + 50,
            "down",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 100 === 0 && this.chosenDefender === 4) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 70,
            this.y + 50,
            "down",
            this.chosenDefender
          )
        );
      }
    }
    if (this.left) {
      if (!this.shooting && !this.vertical && !this.down) {
        this.timer++;
      }

      if (this.timer % 20 === 0 && this.chosenDefender === 2) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 70,
            this.y + 50,
            "left",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 50 === 0 && this.chosenDefender === 1) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 70,
            this.y + 50,
            "left",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 70 === 0 && this.chosenDefender === 3) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 70,
            this.y + 50,
            "left",
            this.chosenDefender
          )
        );
      }
      if (this.timer % 100 === 0 && this.chosenDefender === 4) {
        projectiles.push(
          new Projectile(
            this.canvas,
            this.x + 70,
            this.y + 50,
            "left",
            this.chosenDefender
          )
        );
      }
    }
  }
}
let chosenImage = new Image();
chosenImage.src = "./images/chosendefender1.png";
