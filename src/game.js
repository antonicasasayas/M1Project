

let chosenDefender = 1;
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
  clicked: false,
};
window.addEventListener("mousedown", () => {
  mouse.clicked = true;
});

window.addEventListener("mouseup", function () {
  mouse.clicked = false;
});

class Game {
  constructor(gameScreen) {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.gameOver = false;
    this.roundOver = false;
    this.gameScreen = gameScreen;
    this.score = 0;
    this.livesElement = undefined;
    this.scoreElement = undefined;
    this.defenders = [];
    this.gameGrid = [];
    this.projectiles = [];
    this.enemies = [];
    this.enemiesInterval = 600;
    this.frame = 0;
    this.cellSize = 75;
    this.cellGap = 3;
    this.chosenDefender = 1;
    this.numberOfResources = 300;
    
    
  }
  gameOver() {
    this.gameOver = true;
 // endGame
  }
  draw() {
    if (this.chosenDefender === 1) {
      ctx.drawImage(archerTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 2) {
      ctx.drawImage(magicTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 3) {
      ctx.drawImage(fireTower, this.x, this.y, this.width, this.height);
    } else if (this.chosenDefender === 4) {
      ctx.drawImage(stoneTower, this.x, this.y, this.width, this.height);
    }
  }
  
  
  handleGameStatus() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Orbitron";
    this.ctx.fillText("Lives: " + this.player.lives, 30, 40);
    this.ctx.fillText("Gold: " + this.numberOfResources, 30, 80);
    if (this.gameOver) {
      this.ctx.fillStyle = "black";
      this.ctx.font = "90px Orbitron";
      this.ctx.fillText("GAME OVER", 135, 330);
    }
  }
  handleEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
      this.enemies[i].draw();

      if (this.enemies[i].health <= 0) {
        let gainedResources = this.enemies[i].maxHealth / 10;
        this.numberOfResources += Math.floor(gainedResources * 0.6);

        this.enemies.splice(i, 1);
        i--;
      } else if (this.enemies[i].x <= -50) {
        this.player.lives -= 1;
        this.enemies.splice(i, 1);
        i--;
      }
    }
    if (this.frame % this.enemiesInterval === 0 && !this.gameOver) {
      this.enemies.push(new Enemy(this.canvas, this.cellSize, this.cellGap, this.frame));

      if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
    }
  }
  chooseDefender() {
    this.ctx.lineWidth = 1;

    if (collision(mouse, card1) && mouse.clicked === true) {
      this.chosenDefender = 1;
      
    } else if (collision(mouse, card2) && mouse.clicked === true) {
      this.chosenDefender = 2;
     
    } else if (collision(mouse, card3) && mouse.clicked === true) {
      this.chosenDefender = 3;
      
    } else if (collision(mouse, card4) && mouse.clicked === true) {
      this.chosenDefender = 4;
      
    }

    if (this.chosenDefender === 1) {
      this.ctx.drawImage(chosenImage, 110, 500, 85, 75);
    } else if (this.chosenDefender === 2) {
      this.ctx.drawImage(chosenImage, 290, 500, 85, 75);
    } else if (this.chosenDefender === 3) {
      this.ctx.drawImage(chosenImage, 487, 500, 85, 75);
    } else if (this.chosenDefender === 4) {
      this.ctx.drawImage(chosenImage, 675, 500, 85, 75);
    }
  }
  handleProjectiles() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      this.projectiles[i].draw();

      for (let j = 0; j < this.enemies.length; j++) {
        if (
          this.enemies[j] &&
          this.projectiles[i] &&
          collision(this.projectiles[i], this.enemies[j])
        ) {
          this.enemies[j].health -= this.projectiles[i].power;
          this.projectiles.splice(i, 1);
          i--;
        }
      }

      if (
        this.projectiles[i] &&
        this.projectiles[i].x > this.canvas.width - this.cellSize
      ) {
        this.projectiles.splice(i, 1);
        i--;
      }
    }
  }
  createGrid() {
    for (let y = this.cellSize; y < 600; y += this.cellSize) {
      for (let x = 0; x < 900; x += this.cellSize) {
        this.gameGrid.push(new Cell(this.canvas, x, y));
      }
    }
  }

  handleGameGrid() {
    for (let i = 0; i < this.gameGrid.length; i++) {
      this.gameGrid[i].draw();
    }
  }
  handleDefenders() {
    for (let i = 0; i < this.defenders.length; i++) {
      
      this.defenders[i].draw();
      this.defenders[i].update(this.projectiles);
      if (
        this.enemies.some((enemy) => {
          return (
            this.defenders[i].x <= enemy.x+50 &&
            this.defenders[i].x + this.defenders[i].width >= enemy.x && this.defenders[i].y < enemy.y
          );
        })
      ) {
        
        this.defenders[i].down = true;
      } else {
        this.defenders[i].down = false;
      }
      
      if (
        this.enemies.some((enemy) => {
          return (
            this.defenders[i].x <= enemy.x+50 &&
            this.defenders[i].x + this.defenders[i].width >= enemy.x && this.defenders[i].y > enemy.y
          );
        })
      ) {
        this.defenders[i].vertical = true;
      } else {
        this.defenders[i].vertical = false;
      }

      if (
        this.enemies.some((enemy) => {
          return (
            this.defenders[i].y <= enemy.y &&
            this.defenders[i].y + this.defenders[i].height >= enemy.y
          );
        })
      ) {
        this.defenders[i].shooting = true;
      } else {
        this.defenders[i].shooting = false;
      }


      if (this.enemies.some((enemy) => {
        return (
          this.defenders[i].y >= enemy.y && this.defenders[i].y + this.defenders[i].height <= enemy.y
        );
      })
      ){
        this.defenders[i].left = true;
      } else {
        this.defenders[i].left = false;
      }
      
    }
  }

  start() {
    this.canvas = document.getElementById("canvas1");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 900;
    this.canvas.height = 600;
    this.createGrid();
    this.player = new Player();
    let canvasPosition = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", function (e) {
      
      mouse.x = e.x - canvasPosition.left;
      
      mouse.y = e.y - canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", function () {
      mouse.y = undefined;
      mouse.y = undefined;
    });
    this.canvas.addEventListener("click", () => {
      const gridPositionX = mouse.x - (mouse.x % this.cellSize) + this.cellGap;
      const gridPositionY = mouse.y - (mouse.y % this.cellSize) + this.cellGap;
      if (gridPositionY < this.cellSize) return;
      for (let i = 0; i < this.defenders.length; i++) {
        if (
          this.defenders[i].x === gridPositionX &&
          this.defenders[i].y === gridPositionY
        )
          return;
      }
      let defenderCost = 100 * this.chosenDefender;
      if (this.numberOfResources >= defenderCost && mouse.y < 500) {
        
        if (!(mouse.y < 400 && mouse.x >= 750 && mouse.x <= 850)) {
           this.defenders.push(
             new Defender(this.canvas, gridPositionX, gridPositionY, this.chosenDefender)
           );
           this.numberOfResources -= defenderCost;
        }
         
      }
    });
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(gameBoard, 0, 500, 900, 100);
      this.handleGameGrid();
      this.handleDefenders();
      this.handleProjectiles();
      this.handleEnemies();
      this.chooseDefender();
      this.handleGameStatus();
      if (this.player.lives <= 0) {
        this.gameOver = true;
        removeGameScreen();
        createGameOverScreen();
      }
      console.log(this.frame)
      this.frame++;
      if (!this.gameOver) requestAnimationFrame(loop);
    };
    loop();
  }
}

class Player {
  constructor() {
    this.lives = 50;
  }
  removeLife() {
    this.lives -= 1;
  }
}

const gameBoard = new Image();
gameBoard.src = "./images/lastGameBar.png";
// game board

class Cell {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      this.ctx.strokeStyle = "black";

      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

const card1 = {
  x: 120,
  y: 516,
  width: 70,
  height: 65,
};

const card2 = {
  x: 300,
  y: 516,
  width: 70,
  height: 65,
};

const card3 = {
  x: 492,
  y: 516,
  width: 70,
  height: 65,
};

const card4 = {
  x: 680,
  y: 516,
  width: 70,
  height: 65,
};

function collision(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}

/*window.addEventListener("resize", function () {
  this.canvasPosition = this.canvas.getBoundingClientRect();
});*/


