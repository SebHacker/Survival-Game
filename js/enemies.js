var enemySpeed = 3; 
var totalEnemies ;
var sources =["up","left","up","left","right","right","up","left","right","up","up","left","right","left","right","up","left","right","up","left","right","up","left","right"]
var enemiesInField=[];
var enemyWidth = 25;
var enemyHeight = 25;

class Enemy{    
    constructor(){
        this.positionLeft = 150;
        this.positionTop = -50;
        this.source; // (up, left, right)
        //this.HTMLElement;
    }
}

function sendEnemy(source){
    let enemy = new Enemy;
    HtmlElement = createEnemy();
    playingArea.appendChild(HtmlElement);
    HtmlElement.classList.add('enemy');
    enemy.source=source; 
    if (source =="up"){
        enemy.positionLeft= fetchpositionLeft();
        enemy.positionTop = 0; 
    }else if(source == "left"){
        enemy.positionLeft= 0;
        enemy.positionTop = fetchpositionTop(); 
    }else if(source =="right"){
        enemy.positionLeft=1150;
        enemy.positionTop = fetchpositionTop(); 
    }
    HtmlElement.style.top = enemy.positionTop + "px";
    HtmlElement.style.left = enemy.positionLeft + "px";
    enemiesInField.push ({enemy,HtmlElement})
}

function createEnemy() {
    // return document.createElement('div');
    let newEnemy = document.createElement("img");
    newEnemy.src = "../img/walking zombie.gif";
    return newEnemy;
}


function fetchpositionLeft(){
    return Math.floor(Math.random()*1130);
}

function fetchpositionTop(){
    return Math.floor(Math.random()*630);
}


function removeEnemy(index) {
    if (enemiesInField[index].HtmlElement){
        enemiesInField[index].HtmlElement.remove();
    }
    
    enemiesInField.splice(index,1);
}
function moveEnemies(){
    for (let i =0; i<enemiesInField.length; i ++){
        enemySpeed = Math.floor(Math.random()*10);
        if (checkEnemyImpact(enemiesInField[i].enemy)==false){
            if(enemiesInField[i].HtmlElement){
                if (enemiesInField[i].enemy.positionLeft < playerPos.x){
                    enemiesInField[i].enemy.positionLeft += enemySpeed;
                    enemiesInField[i].HtmlElement.style.left = enemiesInField[i].enemy.positionLeft + "px";
                } else {
                    enemiesInField[i].enemy.positionLeft -= enemySpeed;
                    enemiesInField[i].HtmlElement.style.left = enemiesInField[i].enemy.positionLeft + "px";
                }
                if (enemiesInField[i].enemy.positionTop < playerPos.y){
                    enemiesInField[i].enemy.positionTop += enemySpeed;
                    enemiesInField[i].HtmlElement.style.top = enemiesInField[i].enemy.positionTop + "px";
                } else {
                    enemiesInField[i].enemy.positionTop -= enemySpeed;
                    enemiesInField[i].HtmlElement.style.top = enemiesInField[i].enemy.positionTop + "px";
                }
            } 
        } else {
            displayExplosion(player);
            player.classList.add ("blink");
            if (playerInjured == false){
                playerLives-=1;
                playerInjured = true; 
                updateLivesInDom(playerLives);
                setTimeout(() => {
                    killablePlayer ();
                    player.classList.remove("blink");
                }, 2500);

            }
            if (isGameOver() ){
                gameOver();
                return;
            }
        }
    }
}

function checkEnemyImpact(enemy){
// impact between the player and the enemy 
    if (enemy.positionLeft >= playerPos.x && enemy.positionLeft <= playerPos.x +playerWidth && enemy.positionTop >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight){
        return true; 
    } else if (enemy.positionLeft + enemyWidth <= playerPos.x + playerWidth && enemy.positionLeft + enemyWidth >= playerPos.x && enemy.positionTop >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight){
                return true; 
    } else if (enemy.positionTop + enemyHeight >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight && enemy.positionLeft>= playerPos.x && enemy.positionLeft <= playerPos.x + playerWidth){
        return true; 
    } else if (enemy.positionTop + enemyHeight >= playerPos.y && enemy.positionTop + enemyHeight <= playerPos.y + playerHeight && enemy.positionLeft + enemyWidth <= playerPos.x + playerWidth && enemy.positionLeft + enemyWidth >= playerPos.x){
        
        return true;
    } return false; 
}


function checkEnemyKill(laserDirection){
//********** ajouter effet du kill */
let lasers =[];
    if (laserDirection =="up"){
        lasers = lasersUp;
    }else if (laserDirection =="left"){
        lasers = lasersLeft;
    }else if (laserDirection == "right"){
        lasers = lasersRight;
    }
    for (let i = 0; i<lasers.length; i ++){
        let currentLaser = lasers[i];
        let currentLaserX = Math.floor(currentLaser[0].style.left.replace("px",""));
        let currentLaserY = Math.floor(currentLaser[0].style.top.replace("px",""));
        for (let j =0; j<enemiesInField.length;j++){
            if(enemiesInField[j].HtmlElement){
                let currentEnemy = enemiesInField[j].HtmlElement;
                let currentEnemyX = Math.floor(currentEnemy.style.left.replace("px","")); 
                let currentenemyY = Math.floor(currentEnemy.style.top.replace("px","")); 
                if (currentLaserX >= currentEnemyX && currentLaserX <= currentEnemyX +enemyWidth && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight){
                    console.log("ici 0");
                    enemiesInField[j].HtmlElement.src ="../img/explosion-2.gif";
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if(currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY +enemyHeight){
                    // displayExplosion(enemiesInField[j].HtmlElement);
                    console.log("ici 1");
                    enemiesInField[j].HtmlElement.src ="../img/explosion-2.gif";
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if (currentLaserY + laserHeight >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight && currentLaserX>= currentEnemyX && currentLaserX<= currentEnemyX + enemyWidth){
                    // displayExplosion(enemiesInField[j].HtmlElement);
                    console.log("ici 2");
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if (currentLaserY + laserHeight >= currentenemyY && currentLaserY +laserHeight <= currentenemyY + enemyHeight && currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX){
                    // displayExplosion(enemiesInField[j].HtmlElement);
                    console.log("ici 3");
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
            }
        }

    }
}

function removeLaser(laserDirection, i){
    if (laserDirection =="up"){
        lasersUp.splice(i,1);
    }else if (laserDirection =="left"){
        lasersLeft.splice(i,1);;
    }else if (laserDirection == "right"){
        lasersRight.splice(i,1);;
    } 
    // ajouter effet au moment du kill ************
}

function addRandomEnemies(nbElements){
// ajoute nbElements d'ennemis 
    let directionsArray = ["left", "right", "up"];
    let randomIndex;

    for (let i=0; i<nbElements; i++){
        randomIndex = directionsArray[Math.floor(Math.random()*directionsArray.length)];
        sendEnemy (randomIndex);
    }
 }


// function checkEnnemiesCollision(enemyObject, index){
//     let enemy = enemyObject.enemy;
//     let HtmlElement = enemyObject.HtmlElement;
//     for (let i=0; i<enemiesInField.length; i++){
//         console.log("enemies in field")
//         console.log(enemiesInField);
//         if (i!==index){
//             let currentEnemy = enemiesInField[i].enemy;
//             if (enemy.positionLeft >= currentEnemy.positionLeft && enemy.positionLeft <= currentEnemy.positionLeft + enemyWidth && enemy.positionTop >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionLeft + enemyWidth <= currentEnemy.positionLeft + enemyWidth && enemy.positionLeft + enemyWidth >= currentEnemy.positionLeft && enemy.positionTop >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionTop + enemyHeight >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight && enemy.positionLeft>= currentEnemy.positionLeft && enemy.positionLeft <= currentEnemy.positionLeft + enemyWidth){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionTop + enemyHeight >= currentEnemy.positionTop && enemy.positionTop + enemyHeight <= currentEnemy.positionTop + enemyHeight && enemy.positionLeft + enemyWidth <= currentEnemy.positionLeft + enemyWidth && enemy.positionLeft + enemyWidth >= currentEnemy.positionLeft){
//                 removeEnemy(i);
//                 return true;  
//             } 
//         }
//     }
// }

