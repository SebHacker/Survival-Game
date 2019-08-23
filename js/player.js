  var playerInjured = false; 
  var playerLives =3;
  var currentLevel;
  var playerWidth = 50;
  var playerHeight = 50; 
  
  movePlayer=()=> { 
    if (key.right === true) {
      playerPos.x += playerSpeed;
    } else if (key.left === true) {
      playerPos.x -= playerSpeed;
    }
    if (key.up === true) {
      playerPos.y -= playerSpeed;
    } else if (key.down === true) {
      playerPos.y += playerSpeed;
    }
    if (playerPos.x < playingArea.leftBoundary) {
      playerPos.x = playingArea.leftBoundary;
    }
    if (playerPos.x > playingArea.rightBoundary) {
      playerPos.x = playingArea.rightBoundary;
    }
    if (playerPos.y < playingArea.topBoundary) {
      playerPos.y = playingArea.topBoundary;
    }
    if (playerPos.y > playingArea.bottomBoundary) {
      playerPos.y = playingArea.bottomBoundary;
    }
    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }

  // **********************
  function isGameOver(){
    if (playerLives == 0){
      return true;
    }return false; 
  }

  function gameOver(){
    killOldGame();  
    modalGameOver.classList.remove("hide");
  }

  function nextLevel(){
    if (enemiesInField.length ==0){
      currentLevel = document.getElementById("level-select-box").value;
      if (currentLevel =="Extreme"){
        modalEndGame.classList.toggle("hide");
      } else {
        currentLevel = upgradeLevel(currentLevel);
        updateSelectionList(currentLevel);
        modalNextLevel.classList.toggle("hide");
      }
    }
  }

function goToNextLevel(level){
  if (level !="Game Completed"){
    killOldGame();
    updateLevelInDom(level);
    loadNewGame (level);
    playGame(level);
  } else{
    modalNextLevel.classList.remove("hide");
  }
}

  function isLevelOver(){
    if (enemiesInField.length==0){
      nextLevel();
    }
  }
  
  function killOldGame(){
    window.clearInterval(interval.player);
    window.clearInterval(interval.enemies);
    window.clearInterval(interval.laser);
    window.clearInterval(interval.randomEnemies);
  }


function killablePlayer(){
  playerInjured = false;
}

function updateLivesInDom(playerLives){
  let livesInDom = document.getElementById("lives-count");
  if (playerLives>=0){
    livesInDom.innerHTML = "Lives: " + playerLives;
  }
}

function updateLevelInDom(currentLevel){
  let levelInDom = document.getElementById("level-count");
  levelInDom.innerHTML = "Level: " + currentLevel;
}

function updateSelectionList(level){
  let levelInSelection = document.getElementById("level-select-box");
  levelInSelection.value = level;
} 

function upgradeLevel(level){
  if(level =="Easy"){
    level ="Medium";
  }else if (level =="Medium"){
    level = "Hard";
  }else if (level == "Hard"){
    level ="Extreme";
  }else if (level =="Extreme"){
    level = "Game Completed";
  }
  return level;
} 


function displayExplosion(gameElement){
  if (playerInjured ==false){
    gameElement.src = "./img/explosion-sticker.gif";
    window.setTimeout(() => {
      if (gameElement == player){
        gameElement.src = "./img/tank 3 canons.png";
      } 
  }, 1000)
  } else {
    gameElement.src ="./img/explosion-2.gif"
    window.setTimeout(() => {
      if (gameElement == player){
        gameElement.src = "./img/tank 3 canons.png";
      } // else à ajouter pour les ennemis ************
    }, 500)
  }
}