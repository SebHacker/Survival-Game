var lasersUp=[];
var lasersRight=[];
var lasersLeft=[];
var laserSpeed=6;
var laserHeight = 10;
var laserWidth = 10;
var maxLaserDisplay = 15; 
var laserDirection ={
  up : false,
  right : false, 
  left: false
};

function lunchLaser(){
  let laser = document.createElement("img");
  laser.src ="../img/Bomb_1.png";
  // let laser = document.createElement("div");
  return laser; 
}

function moveLaserUp() {
  for (let i = 0; i < lasersUp.length; i++) {
    lasersUp[i][1] -= laserSpeed;
    lasersUp[i][0].style.top = lasersUp[i][1] + 'px';
    if (parseInt(lasersUp[i][0].style.top) < playingArea.topBoundary) {
      playingArea.removeChild(lasersUp[i][0]);
      lasersUp.splice(i, 1);
    }
  }
}

function moveLaserLeft() {
  if (shootAuthorized.left == true){
    for (let i = 0; i < lasersLeft.length; i++) {
      lasersLeft[i][2] -= laserSpeed;
      lasersLeft[i][0].style.left = lasersLeft[i][2] + 'px';
      if (parseInt(lasersLeft[i][0].style.left) < playingArea.leftBoundary) {
        playingArea.removeChild(lasersLeft[i][0]);
        lasersLeft.splice(i, 1);
      }
    }
  }
}

function moveLaserRight() {
  if (shootAuthorized.right==true){
    for (let i = 0; i < lasersRight.length; i++) {
      lasersRight[i][2] += laserSpeed;
      lasersRight[i][0].style.left = lasersRight[i][2] + 'px';
      if (parseInt(lasersRight[i][0].style.left) > playingArea.rightBoundary || lasersRight[i][0].style.left< "0px") {
        playingArea.removeChild(lasersRight[i][0]);
        lasersRight.splice(i, 1);
      }
    }
    laserDirection.right = true;
    if (lasersUp.length == 0) {
      laserDirection.up = false;
    }
    if (lasersLeft.length == 0) {
      laserDirection.left = false;
    }
  }
}

function checkLaserUp() {
  let laser = lunchLaser();
  lasersUp.push([laser, playerPos.y, playerPos.x]);
  playingArea.appendChild(lasersUp[lasersUp.length - 1][0]);
  lasersUp[lasersUp.length - 1][0].classList.add("laser");
  lasersUp[lasersUp.length - 1][0].style.top =
    lasersUp[lasersUp.length - 1][1] + "px";
  lasersUp[lasersUp.length - 1][0].style.left = playerPos.x + 25 + "px";
  laserDirection.up = true;
  if (lasersRight.length == maxLaserDisplay) {
    laserDirection.right = false;
  }
  if (lasersLeft.length == maxLaserDisplay) {
    laserDirection.left = false;
  }
}

function checkLaserLeft() {
  if (shootAuthorized.left == true){
    let laser = lunchLaser();
    lasersLeft.push([laser, playerPos.y, playerPos.x]);
    playingArea.appendChild(lasersLeft[lasersLeft.length - 1][0]);
    lasersLeft[lasersLeft.length - 1][0].classList.add("laser");
    lasersLeft[lasersLeft.length - 1][0].style.top = playerPos.y + 25 + "px";
    lasersLeft[lasersLeft.length - 1][0].style.left = playerPos.x - 12 + "px";
  
    laserDirection.left = true;
    if (lasersUp.length == 0) {
      laserDirection.up = false;
    }
    if (lasersRight.length == 0) {
      laserDirection.right = false;
    }
  }
}

function checkLaserRight() {
  let laser = lunchLaser();
  lasersRight.push([laser, playerPos.y, playerPos.x]);
  playingArea.appendChild(lasersRight[lasersRight.length - 1][0]);
  lasersRight[lasersRight.length - 1][0].classList.add("laser");
  lasersRight[lasersRight.length - 1][0].style.top = playerPos.y + 25 + "px";
  lasersRight[lasersRight.length - 1][0].style.left = playerPos.x + 12 + "px";

  laserDirection.right = true;
  if (lasersUp.length == 0) {
    laserDirection.up = false;
  }
  if (lasersLeft.length == 0) {
    laserDirection.left = false;
  }
}

function moveLaser(){
  if (laserDirection.up == true){
    moveLaserUp();
    checkEnemyKill("up");
    // isLevelOver();
  }
  if(laserDirection.right == true){
    moveLaserRight();
    checkEnemyKill("right");
    // isLevelOver();
  }
  if (laserDirection.left ==true){
    moveLaserLeft();
    checkEnemyKill("left");
    // isLevelOver();
  }
}