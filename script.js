const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
let numberOfResources = 300;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let lives = 50;


const gameGrid = [];
const defenders = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];

// mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
    mouse.y = undefined;
    mouse.y = undefined;
});

const gameBoard = new Image();
gameBoard.src = "./images/Game Bar (1) (1).png"
// game board

    

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        if (mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
function createGrid(){
    for (let y = cellSize; y < canvas.height; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();
function handleGameGrid(){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}

// player
class Player {
    constructor(){
        this.lives = 50;
    }
  removeLife(){
      this.lives -=1;
  }  
}
// projectiles
const projectile1 = new Image();
projectile1.src = "./images/arrow1.png"

class Projectile {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.power = 20;
        this.speed = 5;
        
    }
    update(){
        this.x += this.speed;
    }
    draw(){
        

        ctx.drawImage(projectile1,this.x, this.y-50, this.width, this.height)
    }
}
function handleProjectiles(){
    for (let i = 0; i < projectiles.length; i++){
        projectiles[i].update();
        projectiles[i].draw();

        for (let j = 0; j < enemies.length; j++){
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}

// defenders
const archerTower = new Image();
archerTower.src = "./images/archerTower2.png"
const stoneTower = new Image();
stoneTower.src = "./images/Stone Tower.png"
const magicTower = new Image();
magicTower.src = "./images/Magic Tower.png"
const fireTower = new Image();
fireTower.src = "./images/Fire Tower.png"

class Defender {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        
        this.projectiles = [];
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 171;
        this.spriteHeight = 163;
        
    }
    draw(){
        
        ctx.drawImage(archerTower, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update(){
        if (this.shooting){
            this.timer++;
            if (this.timer % 100 === 0){
                projectiles.push(new Projectile(this.x + 70, this.y + 50));
            }
        } else {
            this.timer = 0;
        }
    }
}
canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x  - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    for (let i = 0; i < defenders.length; i++){
        if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
    }
    let defenderCost = 100;
    if (numberOfResources >= defenderCost){
        defenders.push(new Defender(gridPositionX, gridPositionY));
        numberOfResources -= defenderCost;
    }
});
function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
        defenders[i].update();
        if (enemyPositions.indexOf(defenders[i].y) !== -1){
            defenders[i].shooting = true;
        } else {
            defenders[i].shooting = false;
        }
       
        }
    }

const card1 = {
  x: 10,
  y: 10,
  width: 70,
  height: 85
}    
const card2 = {
  x: 90,
  y: 10,
  width: 70,
  height: 85
} 

function chooseDefender(){
  ctx.lineWidth = 1;
  ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
  ctx.drawImage
  ctx.drawImage(archerTower, 0, 0, 171, 163, 10, 15, card1.width, card1.height)
  ctx.fillRect(card2.x, card2.y, card2.width, card2.height)
  ctx.drawImage(stoneTower, 0, 0, 171, 163, 90, 15, card2.width, card2.height)
}
// enemies
const enemyTypes = [];
const enemy1 = new Image();
enemy1.src = "./images/enemy1 (2).png"
enemyTypes. push(enemy1)



class Enemy {
    constructor(){
        this.x = 750;
        this.y = 0;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.spriteWidth = 377;
        this.spriteHeight = 404;
    }
    
    update(){
      
      if (this.y < 400 && this.x === 750){
        this.y += this.movement
      } else if(this.x > 550){
        this.x -= this.movement;
        
      } else if (this.x >= 500 && this.y >=50){
        this.y -=this.movement;

      } else if ( this.x > 250 && this.y < 50){
        this.x -=this.movement;
      } else if ( this.x > 200 && this.x < 250 && this.y < 200){
        this.y += this.movement;
      } else if ( this.y > 200 && this.y < 250 && this.x > 75){
        this.x -= this.movement;
      } else if ( this.x > 25 && this.x < 100 && this.y < 450){
        this.y += this.movement;
      } else if ( this.y > 450 && this.x < 200){
        this.x += this.movement;
      } else if (this.y > 450 && this.x > 200 && this.x < 250){
        this.y += this.movement;
      }

        if (this.frameX < this.minFrame) this.frameX++;
        else this.frameX = this.minFrame;
    }
    draw(){
        
        
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
        ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
       
        if (enemies[i].health <= 0){
            let gainedResources = enemies[i].maxHealth/10;
            numberOfResources += gainedResources;
            
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
          }

          if (enemies[i].y >= 500 && enemies[i].x >= 200){
            enemies[i].lives -= 1;
            enemies.splice(i,1);
            i--;
        }
    }
    if (frame % enemiesInterval === 0 && enemies.length < 1){
        
        enemies.push(new Enemy());
        enemyPositions.push();
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
}

// resources
const amounts = [20, 30, 40];
class Resource {
    constructor(){
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Orbitron';
        ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
}
function handleResources(){
    if (frame % 500 === 0 && !gameOver){
        resources.push(new Resource());
    }
    for (let i = 0; i < resources.length; i++){
        resources[i].draw();
        if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
            numberOfResources += resources[i].amount;
            resources.splice(i, 1);
            i--;
        }
    }
}

// utilities
function handleGameStatus(){
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Score: ' , 180, 40);
    ctx.fillText('Resources: ' + numberOfResources, 180, 80);
    if (gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '90px Orbitron';
        ctx.fillText('GAME OVER', 135, 330);
    }
    if ( enemies.length === 0){
        ctx.fillStyle = 'black';
        ctx.font = '60px Orbitron';
        ctx.fillText('LEVEL COMPLETE', 130, 300);
        ctx.font = '30px Orbitron';
        ctx.fillText('You win with '  + ' points!', 134, 340);
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameBoard, 0, 500, 900, 100)
    handleGameGrid();
    handleDefenders();
    handleResources();
    handleProjectiles();
    chooseDefender();
    handleEnemies();
    handleGameStatus();
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
}
animate();

function collision(first, second){
    if (    !(  first.x > second.x + second.width ||
                first.x + first.width < second.x ||
                first.y > second.y + second.height ||
                first.y + first.height < second.y)
    ) {
        return true;
    };
};

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})