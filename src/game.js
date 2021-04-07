/* class Game {
    constructor(gameScreen) {
      this.canvas = null;
      this.ctx = null;
      this.enemies = [];
      this.player = null;
      this.gameIsOver = false;
      this.gameScreen = gameScreen;
      this.score = 0;
      this.livesElement = undefined;
      this.scoreElement = undefined;
    }

start(){
    const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
}

animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameBoard, 0, 500, 900, 100);
    handleGameGrid();
    handleDefenders();
  
    handleProjectiles();
  
    handleEnemies();
    handleGameStatus();
  
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
  }
  
} */