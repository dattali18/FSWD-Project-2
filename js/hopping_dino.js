document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const gameCanvas = document.getElementById('gameCanvas');

    const relpath = '../static/images/'; // relative path to the images
    // Get Highscore var from html
    const highScoreDisplay = document.getElementById('highScoreDisplay');
    let currentUser = JSON.parse(localStorage.getItem('current-user'));
    let users = JSON.parse(localStorage.getItem('users'));
    let highScore = currentUser.score;
    highScoreDisplay.textContent = `High Score: ${highScore}`;


    // Game sounds
    let backgroundMusic = [
        new Audio('../static/audio/DinoGame.mp3'),
        new Audio('../static/audio/Jump.mp3'),
        new Audio('../static/audio/Crash.mp3')];
    backgroundMusic[0].loop = true;
    const BASE_WIDTH = 1200;
    const BASE_HEIGHT = 500;
    let scale = 1; // for size of the page changeable
    let gameStarted = false;

    function resizeCanvas() { // when page is resized
        const screenWidth = window.innerWidth;
        scale = screenWidth / BASE_WIDTH;
        gameCanvas.width = BASE_WIDTH * scale;
        gameCanvas.height = BASE_HEIGHT * scale;
        if (gameStarted) {
            console.log("Game has started, resizing will trigger reload.");
            window.location.reload(); // reloads the page
        }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    playButton.addEventListener('click', function () {
        playButton.style.display = 'none';
        backgroundMusic[0].play();
        gameStarted = true;
        startGame();
    });

    function startGame() {
        const ctx = gameCanvas.getContext('2d');
        const SCREEN_WIDTH = gameCanvas.width;
        const SCREEN_HEIGHT = gameCanvas.height;
        // 60 FPS
        let previousTimestamp = 0;
        const frameInterval = 1000 / 60;

        const speedBackground = 3 * scale;
        let score = 0;
        let speedcac = 16 * scale;
        let gameState = 'running';


        // #region Dino
        class Dinosaur {
            constructor(callback) {
                this.imagePaths = [
                    relpath + 'run3.png',
                    relpath + 'run2.png',
                    relpath + 'run1.png',
                    relpath + 'jump.png'];

                this.images = this.imagePaths.map(path => {
                    let img = new Image();
                    img.onload = () => {
                        if (this.images.every(image => image.complete)) {
                            this.radius = this.images[0].width * scale / 4;
                            if (callback) callback();
                        }
                    };
                    img.src = path;
                    return img;
                });
                this.currentImageIndex = 0;
                this.x = 10 * scale;
                this.y = SCREEN_HEIGHT - 200 * scale;
                this.dy = 0;
                this.gravity = 1.5 * scale;
                this.isJumping = false;
                this.animationFrame = 0;

            }

            draw() {
                const currentImage = this.images[this.currentImageIndex];
                ctx.drawImage(currentImage, this.x, this.y, currentImage.width * scale / 2, currentImage.height * scale / 2);
            }

            update() {
                this.dy += this.gravity;
                this.y += this.dy;

                if (this.y > SCREEN_HEIGHT - 200 * scale) {
                    this.y = SCREEN_HEIGHT - 200 * scale;
                    this.dy = 0;
                    this.isJumping = false;
                    if (this.currentImageIndex == 3) {
                        this.currentImageIndex = 0;
                    }
                }

                this.animationFrame++;
                if (this.animationFrame % 20 === 0 && !this.isJumping) {
                    this.currentImageIndex = (this.currentImageIndex + 1) % 3;
                }
            }

            jump() {
                if (!this.isJumping) {
                    this.currentImageIndex = 3;
                    this.isJumping = true;
                    this.dy = -28 * scale;
                    backgroundMusic[1].play();
                }
            }

            checkCollision_square(cacti) {
                for (let cactus of cacti) {
                    console.log(cactus.x + cactus.image.width / 5)
                    if (this.x < cactus.x + cactus.image.width * scale / 5 && this.x + this.images[0].width * scale / 2 > cactus.x) {
                        if (this.y < cactus.y + cactus.image.height * scale / 4 && this.y + this.images[0].height * scale / 2 > cactus.y) {
                            return true;
                        }
                    }
                }
                return false;
            }
            checkCollision_round(cacti) {
                for (let cactus of cacti) {
                    let cx = (this.x + this.images[0].width * scale / 4) - (cactus.x + cactus.image.width * scale / 10);
                    let cy = (this.y + this.images[0].height * scale / 4) - (cactus.y + cactus.image.height * scale / 8);
                    let distance = Math.sqrt(cx * cx + cy * cy);

                    let sumOfRadii = this.radius + cactus.radius;

                    if (distance < sumOfRadii) {
                        return true;
                    }
                }
                return false;
            }
        }
        // #endregion

        // #region Cactus
        class Cactus {
            constructor(callback) {
                this.image = new Image();
                this.image.onload = () => {
                    this.radius = this.image.width * scale / 10;
                    if (callback) callback();
                };
                this.image.src = relpath + 'drunk.png';
                this.x = SCREEN_WIDTH;
                this.y = SCREEN_HEIGHT - 200 * scale;
                this.dx = -speedcac;

            }

            draw() {
                ctx.drawImage(this.image, this.x, this.y, this.image.width * scale / 5, this.image.height * scale / 4);
            }

            update() {
                this.x += this.dx;
            }

            isOffScreen() {
                return this.x + 150 * scale < 0;
            }
        }
        // #endregion

        // #region Background 
        class Background {
            constructor(imagePaths) {
                this.images = imagePaths.map(path => {
                    let img = new Image();
                    img.src = path;
                    return img;
                });
                this.x = [0, SCREEN_WIDTH];
            }

            update() {
                this.x = this.x.map(x => x - speedBackground);

                if (this.x[0] <= -SCREEN_WIDTH) {
                    this.x.shift();
                    this.x.push(this.x[this.x.length - 1] + SCREEN_WIDTH);
                    let firstImage = this.images.shift();
                    this.images.push(firstImage);
                }
            }

            draw() {
                for (let i = 0; i < this.x.length; i++) {
                    ctx.drawImage(this.images[i % this.images.length], this.x[i], 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                }
            }
        }

        //#endregion

        //Objects initialization
        let dinoready = false;
        let dino = new Dinosaur(() => {
            dinoready = true;
        });
        let cacti = [];
        cacti.push(new Cactus(() => { }));
        let background = new Background([relpath + 'Back1.jpg', relpath + 'Back2.jpg', relpath + 'Back3.jpg']);

        //#region  Game Loop
        function gameLoop(timestamp) {

            const elapsedTime = timestamp - previousTimestamp;
            if (elapsedTime > frameInterval) { //60 fps security
                previousTimestamp = timestamp - (elapsedTime % frameInterval);
                if (gameState == 'ended') {

                    backgroundMusic[0].pause();
                    //backgroundMusic.currentTime = 0;
                    backgroundMusic[2].play();
                    if (score > highScore) {
                        highScore = score;
                        currentUser.score = highScore;
                        localStorage.setItem('current-user', JSON.stringify(currentUser));

                        let userIndex = users.findIndex(user => user.id === currentUser.id);
                        if (userIndex !== -1) {
                            users[userIndex].score = score;
                            localStorage.setItem('users', JSON.stringify(users));
                        }
                        highScoreDisplay.textContent = `High Score: ${highScore}`;
                    }
                    document.getElementById('replayButton').style.display = 'block';
                    return;
                }

                ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // empty the canvas to redraw
                background.update(); //update postion
                background.draw();
                dino.update();
                dino.draw();

                if (dino.checkCollision_round(cacti)) { //_square
                    console.log('Collision detected!');
                    gameState = 'ended';
                }

                score++;
                ctx.font = 30*scale +'px Arial'; //scale Score font
                ctx.fillStyle = 'black';
                ctx.fillText(`Score: ${score}`, 10*scale, 50*scale);

                cacti.forEach((cactus, index) => {
                    cactus.update();
                    cactus.draw();
                    if (cactus.isOffScreen()) {
                        cactus.markedForRemoval = true;
                    }
                });

                cacti = cacti.filter(cactus => !cactus.markedForRemoval); // if cactus offscree remove
                if (speedcac < 32) {
                    speedcac = (16 + score / 200) * scale;
                }

                let canSpawnNewCactus = true;
                if (cacti.length > 0) {
                    const rightmostCactus = cacti[cacti.length - 1];
                    const distanceFromRightEdge = SCREEN_WIDTH - (rightmostCactus.x); // calculate if we can spawn a new cactus
                    if (distanceFromRightEdge < 950 * scale) {
                        canSpawnNewCactus = false;
                    }
                }
                if (Math.random() < 0.03 && canSpawnNewCactus) {
                    cacti.push(new Cactus());
                }

                requestAnimationFrame(gameLoop);
            } else {
                requestAnimationFrame(gameLoop);
            }
        }
        //#endregion

        //#region Buttons/Keys

        function resetGame() {
            ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            score = 0;
            speedcac = 16;
            cacti = [];
            gameState = 'running';
            backgroundMusic[0].play();

            requestAnimationFrame(gameLoop);
        }

        window.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                dino.jump();
            }
        });


        gameCanvas.addEventListener('click', function (event) {
            if (gameState !== 'ended') {
                dino.jump();
            }
        });
        document.getElementById('replayButton').addEventListener('click', function () {
            resetGame(); 
            this.style.display = 'none'; 
        });

        //#endregion
        requestAnimationFrame(gameLoop);
    }
});
