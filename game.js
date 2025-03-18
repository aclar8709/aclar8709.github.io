const player = document.getElementById('player');
const gameConsole = document.getElementById('gameConsole');
let playerY = 150;
let obstacleY = 570;
let obstaclePresent = false;
let gameOver = false;

window.addEventListener('DOMContentLoaded',gameLoop);


function gameLoop()
{
   //while(!gameOver)
    {
        updatePlayer(playerY);
       // console.log(obstaclePresent);
        if(!obstaclePresent)
        {
            createObstacle();
        }
       // console.log(obstaclePresent);
    }
   
}

function updatePlayer(y)
{
    player.style.left = y + "px";
}

function createObstacle()
{
   const obstacle = document.createElement('div');
   obstacle.classList.add('obstacle');
   obstacle.style.left =  obstacleY + 'px';
   gameConsole.appendChild(obstacle);
   obstaclePresent =  true;
   moveObstacle(obstacle)
}
function moveObstacle(obstacle)
{
    //const obstacle = document.querySelector('.obstacle');
    console.log(obstacle); 
    while ( obstacleY > 2)
    {
            obstacleY = obstacleY -2;
    }
    console.log(obstacleY);
    obstacle.style.left = obstacleY + 'px';
}