// variables globales
var player;
var playingArea;
var interval ={
  player: 0,
  laser: 0,
  enemies: 0,
  randomEnemies:0
}

var key = {
  right: false,
  left: false,
  up: false,
  down: false
};

var shootAuthorized ={
  right: true,
  left: true,
  up: true
}

var playerPos = {
  x: 0,
  y: 0
};
var playerSpeed = 4;
var key = {
  right: false,
  left: false,
  up: false,
  down: false
};

var levelSelected = "Easy";
var modalEndGame;
var levelChoice;
var modalNextLevel;
var modalGameOver;

// var livesInDom; 

function keyDown(evt) {
  if (evt.key == "ArrowRight") {
    key.right = true;
  } else if (evt.key == "ArrowLeft") {
    key.left = true;
  } else if (evt.key == "ArrowUp") {
    key.up = true;
  } else if (evt.key == "ArrowDown") {
    key.down = true;
  }
  if (evt.keyCode === 90) {
    //(shoot up z)
    if (lasersUp.length < maxLaserDisplay) {
      checkLaserUp();
    }
  } else if (evt.keyCode === 81) {
    // (shoot left q)
    if (lasersLeft.length < maxLaserDisplay) {
      checkLaserLeft();
    }
  } else if (evt.keyCode === 68) {
    // (shoot right d)
    if (lasersRight.length < maxLaserDisplay) {
      checkLaserRight();
    }
  }
}


function keyUp(evt) {
  if (evt.key == "ArrowRight") {
    key.right = false;
  } else if (evt.key == "ArrowLeft") {
    key.left = false;
  } else if (evt.key == "ArrowUp") {
    key.up = false;
  } else if (evt.key == "ArrowDown") {
    key.down = false;
  }
}

function loadNewGame(level) {
  // création de player et initiation de la zone de jeu
  playingArea.appendChild(player);
  player.classList.add("player"); // à modifier lors de l'ajout de plusieurs avatars
  playerPos.x = playingArea.offsetWidth / 2 - player.offsetWidth / 2;
  playerPos.y = playingArea.offsetHeight - player.offsetHeight * 2;
  playingArea.leftBoundary = 0;
  playingArea.rightBoundary = playingArea.offsetWidth - player.offsetWidth - 20;
  playingArea.topBoundary = 0;
  playingArea.bottomBoundary =
  playingArea.offsetHeight - player.offsetHeight - 20;
  if (level == "Easy"|| level =="Medium"){
    shootAuthorized.right = true;
    shootAuthorized.left = true; 
    shootAuthorized.up = true; 
  } else if (level =="Hard" || level =="Extreme"){
    shootAuthorized.right = false;
    shootAuthorized.left = false; 
    shootAuthorized.up = true; 
  } else {
    console.log("le niveau n'est pas défini")
  }
}

function playGame(level) {
  console.log("playing game");
  let nbEnemiesToAdd = 0;
  if (level =="Easy"){
    nbEnemiesToAdd = 0;
    shootAuthorized.left =true;
    shootAuthorized.right =true;
    shootAuthorized.up = true; 
  } else if(level == "Medium"){
    nbEnemiesToAdd = 3;
    shootAuthorized.left =true;
    shootAuthorized.right =true;
    shootAuthorized.up = true; 
  } else if (level == "Hard"){
    nbEnemiesToAdd = 6;
    shootAuthorized.left =true;
    shootAuthorized.right =true;
    shootAuthorized.up = true; 
  } else if(level =="Extreme"){
    nbEnemiesToAdd = 5;
    shootAuthorized.left =false;
    shootAuthorized.right =false;
    shootAuthorized.up = true; 
  }
  movePlayer();
  moveLaser();
  
  setTimeout(()=>{
    for (let i = 0; i < sources.length; i++) {
      sendEnemy(sources[i]);
    }
  }, 2000);
  moveEnemies();
  interval.player = setInterval(() => movePlayer(), 1000 / 60);
  interval.laser = setInterval(() => moveLaser(), 1000 / 60);
  interval.enemies = setInterval(() => moveEnemies(), 100);
  interval.randomEnemies = setInterval(() => {
    addRandomEnemies(nbEnemiesToAdd)
  }, 5000);
}

// functions lors du Load du DOM

window.addEventListener("DOMContentLoaded", function(event) {

  playingArea = document.getElementById("playing-area");
  player = document.createElement("img");
  player.src ="./img/tank-3-canons.png";
  // player.style.image-orientation(45);
  const playBtn = document.getElementById ("btn-lunch-the-game");
  levelChoice = document.getElementById("level-select-box");
  const sidebar = document.getElementById("sidebar");
  const btnGameCompleted = document.getElementById("btn-quit");
  modalEndGame = document.getElementById("game-completed");
  modalNextLevel = document.getElementById("level-completed");
  const btnNextLevel = document.getElementById ("btn-next-level");
  const btnQuitGame = document.getElementById("btn-quit-game");
  modalNextLevel = document.getElementById("level-completed");
  modalGameOver = document.getElementById("game-over");
  const btnQuitEndGame = document.getElementById("btn-quit-everything");
  const btnRetry = document.getElementById("btn-try-again");

  levelChoice.onchange = ()=> {
    levelSelected = levelChoice.value;
    updateLevelInDom(levelSelected);
  }
  playBtn.onclick = () => {
    sidebar.classList.toggle("is-active");
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    lunchGame(levelSelected);
  }

  btnNextLevel.onclick =() =>{
    modalNextLevel.classList.toggle("hide");
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    goToNextLevel(levelSelected);
  }

  btnQuitGame.onclick = () => {
    modalNextLevel.classList.toggle("hide");
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    
    killOldGame();
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    loadNewGame(levelSelected);
    sidebar.classList.add("is-active");
  }
  
  btnGameCompleted.onclick=()=>{
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    modalEndGame = document.getElementById("game-completed");
    modalEndGame.classList.add("hide");
    killOldGame();
    loadNewGame(levelSelected);
    sidebar.classList.add("is-active");
  }

  btnQuitEndGame.onclick =() =>{
    modalGameOver.classList.add("hide");
    killOldGame();
    sidebar.classList.add("is-active");
  }

  btnRetry.onclick = () => {
    modalGameOver.classList.add("hide");
    levelChoice = document.getElementById("level-select-box");
    levelSelected = levelChoice.value;
    playerLives =3;
    let livesInDom = document.getElementById("lives-count");
    livesInDom.innerHTML = "Lives: " + playerLives;
    killOldGame();
    loadNewGame(levelSelected);
    lunchGame(levelSelected);
  }

  document.addEventListener(
    "keydown",
    evt => {
      keyDown(evt);
    },
    false
  );
  document.addEventListener(
    "keyup",
    evt => {
      keyUp(evt);
    },
    false
  );
  
  const setting = document.getElementById("btn-settings");
  setting.onclick = () => {
    sidebar.classList.toggle("is-active");
  }
});

// window.requestAnimationFrame() equivalent a set timeout mais plus rapide 

function lunchGame(level){
  levelChoice = document.getElementById("level-select-box");
  level = levelChoice.value;
  loadNewGame(level);
  playGame(level); 
}


