const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('gameOver');
const retryBtn = document.getElementById('retryBtn');
const quitBtn = document.getElementById('quitBtn');

canvas.width = 320;
canvas.height = 320;

const gridSize = 20;
let snake, direction, food, score, level, speed, interval;

function initGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: 0, y: 0 };
    food = { x: 0, y: 0 };
    score = 0;
    level = 1;
    speed = 200;
    scoreElement.innerText = score;
    levelElement.innerText = level;
    gameOverElement.classList.add('hidden'); // Esconde el mensaje al comenzar el juego
    createFood();
    clearInterval(interval);
    interval = setInterval(gameLoop, speed);
}

function createFood() {
    food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        snake.push({});
        createFood();
        score += 10;
        scoreElement.innerText = score;
        level = Math.floor(score / 100) + 1;
        levelElement.innerText = level;

        if (level > 700) {
            alert("¡Has alcanzado el nivel máximo!");
            resetGame();
            return;
        }

        if (speed > 60) {
            clearInterval(interval);
            speed -= 6;
            interval = setInterval(gameLoop, speed);
        }
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        endGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function gameLoop() {
    update();
    draw();
}

function resetGame() {
    initGame(); // Reinicia el juego y esconde el mensaje
}

function endGame() {
    clearInterval(interval);
    gameOverElement.classList.remove('hidden'); // Muestra el mensaje solo cuando se pierde
}

retryBtn.addEventListener('click', () => {
    resetGame(); // Reinicia el juego al hacer clic en "Sí"
});

quitBtn.addEventListener('click', () => {
    gameOverElement.innerHTML = "<p>Gracias por jugar</p>";
});

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

document.getElementById('upBtn').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -gridSize };
});

document.getElementById('downBtn').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: gridSize };
});

document.getElementById('leftBtn').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -gridSize, y: 0 };
});

document.getElementById('rightBtn').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: gridSize, y: 0 };
});

initGame(); // Inicia el juego inmediatamente al cargar la página
