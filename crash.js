const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startStopButton = document.getElementById('startStopButton');
const multiplierDisplay = document.getElementById('multiplier');
const playerMultiDisplay = document.getElementById('playerStopMultiplier');
const winorlose = document.getElementById('winorlose');
const stillgoing = document.getElementById('stillgoing');

let multiplier = 1;
let crashPoint = generateCrashPoint();
let lastPoint = { x: 0, y: canvas.height };
let animationId;
let stopped = false;
let gameSpeed = 1;
let scale = 1;
let stoppedValue = 0;


startStopButton.addEventListener('click', () => {
    if (animationId) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    multiplier = 1;
    crashPoint = generateCrashPoint();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startStopButton.innerText = 'STOP';
    startStopButton.style.backgroundColor = '#F1C008'; 
    multiplierDisplay.style.color = '#000000';
    winorlose.innerText = '';
    playerMultiDisplay.innerText = '';
    stillgoing.innerText = '';
    lastPoint = { x: 0, y: canvas.height };
    gameSpeed = 0.3; // Reset speed at the beginning of each game
    scale = 1; // Reset scale at the beginning of each game
    let panDistance = 0;
    drawGraph();
    startStopButton.disabled = false;
    stopped = false;
}

function stopGame() {
    startStopButton.disabled = true;
    playerMultiDisplay.innerText = `X${multiplier.toFixed(2)}`;
    stoppedValue = multiplier;
    stopped = true;
    winorlose.innerText = 'PUSSY!';
    winorlose.style.color = '#11A81A';
    startStopButton.style.backgroundColor = '#6E6E6E';
}

function handleCrash() {
    cancelAnimationFrame(animationId);
    animationId = null;
    startStopButton.innerText = 'START';
    startStopButton.style.backgroundColor = '#000000';
    stillgoing.innerText = '';
    multiplierDisplay.style.color = '#EF1515';

    if (stoppedValue == 0) {
        winorlose.innerText = 'YOU CRASHED BIATCH!';
        winorlose.style.style.backgroundColor = '#FF5733';

    }
    else {
        
    }

    startStopButton.disabled = false;
}

function drawGraph() {
    if (multiplier < crashPoint) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        multiplier += 0.005 * gameSpeed;

        const x = lastPoint.x + 1;
        //const y = canvas.height - (lastPoint.x / 5);
        const y = (canvas.height - (lastPoint.x / 5) - Math.pow(multiplier, 10));
        
        ctx.lineTo(x, y);
        ctx.stroke();
        lastPoint = { x: x, y: y };
        multiplierDisplay.innerText = `X${multiplier.toFixed(2)}`;
        animationId = requestAnimationFrame(drawGraph);

        if (y < 0)
        {
            stillgoing.innerText = '(still going...)';
        }
        
    } else {
        handleCrash();
    }
}



// Use exponential distribution to generate crash point.
// The mean of the distribution is set to 2 for a reasonable crash point.
function generateCrashPoint() {
    const mean = 2;
    return -mean * Math.log(1 - Math.random()) + 1;
}
