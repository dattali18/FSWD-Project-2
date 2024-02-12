document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const gameCanvas = document.getElementById('gameCanvas');

    const relpath = '../static/images/';

    const highScoreDisplay = document.getElementById('highScoreDisplay');
    let currentUser = JSON.parse(localStorage.getItem('current-user'));
    let users = JSON.parse(localStorage.getItem('users'));
    let highScore = currentUser.score; 
    highScoreDisplay.textContent = `High Score: ${highScore}`;

    //60 FPS
    let previousTimestamp = 0;
    const frameInterval = 1000 / 60;

    let backgroundMusic = [new Audio('../static/audio/DinoGame.mp3'), new Audio('../static/audio/Jump.mp3'), new Audio('../static/audio/Crash.mp3')];
    backgroundMusic[0].loop = true;
    //let flagStart=false;
    //startGame();

    playButton.addEventListener('click', function () {
        playButton.style.display = 'none';
        //gameCanvas.style.display = 'block'; 
        backgroundMusic[0].play();
        //flagStart = true;
        startGame();
    });

    function startGame() {
        const ctx = gameCanvas.getContext('2d');
        const SCREEN_WIDTH = 1200;
        const SCREEN_HEIGHT = 500;
        const speedBackground = 3;
        let score = 0;
        let speedcac = 15;
        let gameState = 'running';


        // #region Dino
        class Dinosaur {
            constructor(callback) {
                this.imagePaths = [relpath + 'run3.png', relpath + 'run2.png', relpath + 'run1.png', relpath + 'jump.png'];
                this.currentImageIndex = 0;
                this.images = this.imagePaths.map(path => {
                    let img = new Image();
                    img.onload = () => {
                        if (this.images.every(image => image.complete)) {
                            this.radius = this.images[0].width / 4;
                            if (callback) callback();
                        }
                    };
                    img.src = path;
                    return img;
                });
                this.x = 10;
                this.y = SCREEN_HEIGHT - 200;
                this.dy = 0;
                this.gravity = 1.5;
                this.isJumping = false;
                this.animationFrame = 0;

            }

            draw() {
                const currentImage = this.images[this.currentImageIndex];
                ctx.drawImage(currentImage, this.x, this.y, currentImage.width / 2, currentImage.height / 2);
            }

            update() {
                this.dy += this.gravity;
                this.y += this.dy;

                if (this.y > SCREEN_HEIGHT - 200) {
                    this.y = SCREEN_HEIGHT - 200;
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
                    this.dy = -28;
                    backgroundMusic[1].play();
                }
            }

            checkCollision_square(cacti) {
                for (let cactus of cacti) {
                    console.log(cactus.x + cactus.image.width / 5)
                    if (this.x < cactus.x + cactus.image.width / 5 && this.x + this.images[0].width / 2 > cactus.x) {
                        if (this.y < cactus.y + cactus.image.height / 4 && this.y + this.images[0].height / 2 > cactus.y) {
                            return true;
                        }
                    }
                }
                return false;
            }
            checkCollision_round(cacti) {
                for (let cactus of cacti) {
                    let cx = (this.x + this.images[0].width / 4) - (cactus.x + cactus.image.width / 10);
                    let cy = (this.y + this.images[0].height / 4) - (cactus.y + cactus.image.height / 8);
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
                    this.radius = this.image.width / 10;
                    if (callback) callback();
                };
                this.image.src = relpath + 'drunk.png';
                this.x = SCREEN_WIDTH;
                this.y = SCREEN_HEIGHT - 200;
                this.dx = -speedcac;

            }

            draw() {
                ctx.drawImage(this.image, this.x, this.y, this.image.width / 5, this.image.height / 4);
            }

            update() {
                this.x += this.dx;
            }

            isOffScreen() {
                return this.x + 150 < 0;
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
                    drawReplayButton();
                    return;
                }

                ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                background.update();
                background.draw();
                dino.update();
                dino.draw();

                if (dino.checkCollision_round(cacti)) { //_square
                    console.log('Collision detected!');
                    gameState = 'ended';
                    drawReplayButton();
                }

                score++;
                ctx.font = '30px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(`Score: ${score}`, 10, 50);

                cacti.forEach((cactus, index) => {
                    cactus.update();
                    cactus.draw();
                    if (cactus.isOffScreen()) {
                        cactus.markedForRemoval = true;
                    }
                });

                cacti = cacti.filter(cactus => !cactus.markedForRemoval);
                if (speedcac < 32) {
                    speedcac = 15 + score / 200;
                }

                let canSpawnNewCactus = true;
                if (cacti.length > 0) {
                    const rightmostCactus = cacti[cacti.length - 1];
                    const distanceFromRightEdge = SCREEN_WIDTH - (rightmostCactus.x);
                    if (distanceFromRightEdge < 950) {
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

        function drawReplayButton() {
            ctx.fillStyle = "#f04f24";
            ctx.fillRect(SCREEN_WIDTH / 2 - 50, SCREEN_HEIGHT / 2 - 25, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = '20px Arial';
            ctx.fillText('Replay', SCREEN_WIDTH / 2 - 30, SCREEN_HEIGHT / 2 + 10);
        }

        function resetGame() {
            ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            score = 0;
            speedcac = 15;
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
                return;
            }
            const rect = gameCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;


            if (x >= SCREEN_WIDTH / 2 - 50 && x <= SCREEN_WIDTH / 2 + 50 &&
                y >= SCREEN_HEIGHT / 2 - 25 && y <= SCREEN_HEIGHT / 2 + 25) {
                resetGame();
            }
        });
        //#endregion
        requestAnimationFrame(gameLoop());
    }
});
