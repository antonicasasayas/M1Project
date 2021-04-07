const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 75;
const cellGap = 3;
let numberOfResources = 300;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let chosenDefender = 1;
const gameGrid = [];
const defenders = [];
const enemies = [];
const projectiles = [];
const resources = [];

// mouse
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
  clicked: false,
};

window.addEventListener("mousedown", function () {
  mouse.clicked = true;
})

window.addEventListener("mouseup", function () {
  mouse.clicked = false;
});


let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
  
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener("mouseleave", function () {
  mouse.y = undefined;
  mouse.y = undefined;
});

const gameBoard = new Image();
gameBoard.src = "./images/gameBar2.0.png";
// game board

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
function createGrid() {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
}
createGrid();
function handleGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}

// player
class Player {
  constructor() {
    this.lives = 50;
  }
  removeLife() {
    this.lives -= 1;
  }
}
let player = new Player();
// projectiles
const projectile1 = new Image();
projectile1.src = "./images/arrow1.png";
const projectile2= new Image();
projectile2.src = "./images/arrow4.png"

class Projectile {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.power = 20;
    this.speed = 5;
    this.direction = direction;
  }
  update() {
    if (this.direction === "up"){
      
      this.y -=this.speed
    } else if (this.direction === "right") {
      
      this.x += this.speed
    }
      
  }
  draw() {
    if (this.direction === "up"){
      
      ctx.drawImage(projectile2, this.x, this.y - 50, this.width, this.height);
    } else {
      ctx.drawImage(projectile1, this.x, this.y - 50, this.width, this.height);
    }
    
  }
}
function handleProjectiles() {
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].update();
    projectiles[i].draw();

    for (let j = 0; j < enemies.length; j++) {
      if (
        enemies[j] &&
        projectiles[i] &&
        collision(projectiles[i], enemies[j])
      ) {
        enemies[j].health -= projectiles[i].power;
        projectiles.splice(i, 1);
        i--;
      }
    }

    if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
      projectiles.splice(i, 1);
      i--;
    }
  }
}

// defenders
const archerTower = new Image();
archerTower.src = "./images/archerTower1.png";
const magicTower = new Image();
magicTower.src = "./images/Magic Tower.png";
const stoneTower = new Image();
stoneTower.src = "./images/stoneTower.png";
const fireTower = new Image();
fireTower.src = "./images/Fire Tower.png";

class Defender {
  constructor(x, y,) {
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.vertical = false;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 171;
    this.spriteHeight = 163;
    this.chosenDefender = chosenDefender;
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
  update() {
    
    if (this.vertical) {
      this.timer += 1;
      
      if (this.timer % 50 === 0) {
          projectiles.push(new Projectile(this.x + 70, this.y + 50, "up"));
      }
    } else if (this.shooting) {
      this.timer++;
      
      if (this.timer % 50 === 0) {
        projectiles.push(new Projectile(this.x + 70, this.y + 50, "right"));
      }
    } else {
      //this.timer = 0;
    }
  }
}
canvas.addEventListener("click", function () {
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
  if (gridPositionY < cellSize) return;
  for (let i = 0; i < defenders.length; i++) {
    if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY)
      return;
  }
  let defenderCost = 100;
  if (numberOfResources >= defenderCost && mouse.y < 500)  {
    defenders.push(new Defender(gridPositionX, gridPositionY));
    numberOfResources -= defenderCost;
  }
});
function handleDefenders() {
    
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw();
    defenders[i].update();

    if (enemies.some((enemy) => {
      return defenders[i].x <= enemy.x && defenders[i].x + defenders[i].width >= enemy.x ;
    })){
        defenders[i].vertical= true;
        
        
    } else {
      defenders[i].vertical = false;
    }
   
     if (
        
      enemies.some((enemy) => {
        return defenders[i].y <= enemy.y && defenders[i].y + defenders[i].height >= enemy.y ;
      })
    ) {
      
      defenders[i].shooting = true;
      
    }  else {
          defenders[i].shooting = false;
         
      }
      
    

    
  }
}

const card1 = {
  x: 120,
  y: 516,
  width: 70,
  height: 65

}

const card2 = {
  x: 300,
  y: 516,
  width: 70,
  height: 65,
}

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

let chosenImage = new Image();
chosenImage.src = "./images/chosendefender1.png"

function chooseDefender() {
  ctx.lineWidth = 1;
  

  if (collision(mouse, card1) && mouse.clicked === true) {
    chosenDefender = 1;
    ctx.drawImage(chosenImage, 110, 507, 85, 75);
  } else if (collision(mouse, card2) && mouse.clicked === true) {
    chosenDefender = 2;
    ctx.drawImage(chosenImage, 295, 507, 85, 75);
  } else if (collision(mouse, card3) && mouse.clicked === true) {
    chosenDefender = 3;
    ctx.drawImage(chosenImage, 487, 507, 85, 75);
  } else if (collision(mouse, card4) && mouse.clicked === true) {
    chosenDefender = 4;
    ctx.drawImage(chosenImage, 675, 507, 85, 75);
  }
  
  if (chosenDefender === 1) {
    ctx.drawImage(chosenImage, 110, 507, 85, 75);
  } else if (chosenDefender === 2) {
    ctx.drawImage(chosenImage, 295, 507, 85, 75);
  } else if (chosenDefender === 3) {
    ctx.drawImage(chosenImage, 487, 507, 85, 75);
  } else if (chosenDefender === 4) {
    ctx.drawImage(chosenImage, 675, 507, 85, 75);
  } 
}

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
  constructor() {
    this.x = 750;
    this.y = 0;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
    this.enemyType = enemyTypes[3];
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    this.spriteWidth = 292;
    this.spriteHeight = 248;
  }

  update() {
    if (this.y < 400 && this.x === 750) {
      this.y += this.movement;
    } else if (this.x > 550) {
      this.x -= this.movement;
    } else if (this.x >= 500 && this.y >= 50) {
      this.y -= this.movement;
    } else if (this.x > 250 && this.y < 50) {
      this.x -= this.movement;
    } else if (this.x > 200 && this.x < 250 && this.y < 200) {
      this.y += this.movement;
    } else if (this.y > 200 && this.y < 250 && this.x > 75) {
      this.x -= this.movement;
    } else if (this.x > 25 && this.x < 100 && this.y < 350) {
      this.y += this.movement;
    } else if (this.y > 350 && this.x < 200) {
      this.x -= this.movement;
      this.y += this.movement;
    }

    if (this.frameX < this.maxFrame) this.frameX += 1;
    else this.frameX = this.minFrame;
  
  }
  draw() {
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    ctx.drawImage(
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
function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();

    if (enemies[i].health <= 0) {
      let gainedResources = enemies[i].maxHealth / 10;
      numberOfResources += gainedResources;

      enemies.splice(i, 1);
      i--;
    } else if (enemies[i].x <= -50) {
      player.lives -= 1;
      enemies.splice(i, 1);
      i--;
    }
  }
  if (frame % enemiesInterval === 0 && !gameOver) {
    
    enemies.push(new Enemy());

    if (enemiesInterval > 120) enemiesInterval -= 200;
  }
}

// resources
const amounts = [20, 30, 40];
class Resource {
  constructor() {
    this.x = Math.random() * (canvas.width - cellSize);
    this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.amount = amounts[Math.floor(Math.random() * amounts.length)];
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "20px Orbitron";
    ctx.fillText(this.amount, this.x + 15, this.y + 25);
  }
}

// utilities
function handleGameStatus() {
  ctx.fillStyle = "gold";
  ctx.font = "30px Orbitron";
  ctx.fillText("Lives " + player.lives, 180, 40);
  ctx.fillText("Resources: " + numberOfResources, 180, 80);
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "90px Orbitron";
    ctx.fillText("GAME OVER", 135, 330);
  }
  
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gameBoard, 0, 500, 900, 100);
  handleGameGrid();
  handleDefenders();
  handleProjectiles();
  handleEnemies();
  chooseDefender();
  handleGameStatus();

  frame++;
  if (!gameOver) requestAnimationFrame(animate);
}
animate();

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

window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});
