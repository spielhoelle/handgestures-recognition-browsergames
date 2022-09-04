"use strict";
/*PONG 2 PLAYERS: USE "Z" & "S" for the left side and "up arrow" and "down arrow" for the right side*/
/*Project of Simon Ajzenman & Romuald Vanderlin */
var length = window.innerWidth;
var height = window.innerHeight;
var positionPlayer1 = height / 2;
var positionPlayer2 = height / 2;
var zPressed = false;
var sPressed = false;
var upPressed = false;
var downPressed = false;
var ballPositionY = height / 2;
var speedBalleY = 2;
var ballPositionX = length / 2;
var speedBalleX = 2;
function movePlayer() {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    if (player1 && player2) {
        if (sPressed && positionPlayer1 > 0) {
            player1.style.top = (positionPlayer1 -= 5).toString();
        }
        if (zPressed && positionPlayer1 < height - 105) {
            player1.style.top = (positionPlayer1 += 5).toString();
        }
        if (upPressed && positionPlayer2 > 0) {
            player2.style.top = (positionPlayer2 -= 5).toString();
        }
        if (downPressed && positionPlayer2 < height - 105) {
            player2.style.top = (positionPlayer2 += 5).toString();
        }
    }
}
function moveBall() {
    if (ballPositionY < 0) {
        speedBalleY = speedBalleY * -1;
    }
    if (ballPositionY > height) {
        speedBalleY = speedBalleY * -1;
    }
    if (ballPositionX < 0) {
        changeScore(2);
    }
    if (ballPositionX > length) {
        changeScore(1);
    }
    if (ballPositionX < 70 && ballPositionY + 20 > positionPlayer1 && ballPositionY < positionPlayer1 + 100) {
        speedBalleX = speedBalleX * -1;
    }
    if (ballPositionX + 20 > length - 70 && ballPositionY + 20 > positionPlayer2 && ballPositionY < positionPlayer2 + 100) {
        speedBalleX = speedBalleX * -1;
    }
    const ball = document.getElementById("ball");
    if (ball) {
        ball.style.left = (ballPositionX += speedBalleX).toString();
        ball.style.top = (ballPositionY += speedBalleY).toString();
    }
}
function changeScore(numero) {
    ballPositionY = height / 2;
    ballPositionX = length / 2;
    if (numero == 1) {
        document.getElementById("scoreplayer1").innerHTML++;
    }
    if (numero == 2) {
        document.getElementById("scoreplayer2").innerHTML++;
    }
}
function mainLoop() {
    movePlayer();
    moveBall();
    setTimeout(mainLoop, 5);
}
document.addEventListener('keydown', (event) => {
    switch (event.which) {
        case 90:
            zPressed = true;
            break;
        case 83:
            sPressed = true;
            break;
        case 38:
            upPressed = true;
            break;
        case 40:
            downPressed = true;
            break;
    }
});
document.addEventListener('keyup', (event) => {
    switch (event.which) {
        case 90:
            zPressed = false;
            break;
        case 83:
            sPressed = false;
            break;
        case 38:
            upPressed = false;
            break;
        case 40:
            downPressed = false;
            break;
    }
});
mainLoop();
