//setting dimensions of canvas
class Game {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasWidth = 700;
        this.canvasHeight = 500;
        this.paddleLeft = new LeftPaddle(10, 0);
        this.paddleRight = new RightPaddle(10, 685);
        this.ball = new Ball(10, this.canvasWidth / 2, this.canvasHeight / 2);
        this.scores = [0,0]

    }

    resetCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight)
        this.ctx.beginPath();
        this.ctx.setLineDash([5, 15]);
        this.ctx.moveTo(this.canvasWidth /2, 0);
        this.ctx.lineTo(this.canvasWidth / 2, this.canvasHeight);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }

    play() {
        this.resetCanvas()
        this.ball.render(this.ctx);
        this.paddleLeft.render(this.ctx)
        this.paddleRight.render(this.ctx)
     
        setInterval(()=> {
            this.resetCanvas();
            this.ball.move();
            this.ball.render(this.ctx)
            this.paddleLeft.render(this.ctx)
            this.paddleRight.render(this.ctx)
            this.checkCollision()
            this.ctx.font = "25px Arial";
            this.ctx.fillText(`Scores: ${this.scores[0]} : ${this.scores[1]}`, this.canvasWidth / 2 - 100, 30)
            , 17} )
    };

    checkCollision() {
        if (this.ball.posX - this.ball.radius <= this.paddleLeft.posX + 15 &&
            this.ball.posY + this.ball.radius >= this.paddleLeft.posY &&
            this.ball.posY - this.ball.radius <= this.paddleLeft.posY + 50) {
                this.ball.vx = this.ball.vx  * -1
            }
        // add if statement to draw paddle bottom line
        // add if statement to draw paddle top line

        if (this.ball.posX + this.ball.radius >= this.paddleRight.posX &&
            this.ball.posY + this.ball.radius >= this.paddleRight.posY &&
            this.ball.posY - this.ball.radius <= this.paddleRight.posY + 50) {
                    this.ball.vx = this.ball.vx  * -1
            }
        // add if statement to draw paddle bottom line
        // add if statement to draw paddle top line
    }

    checkPoint(winner) {
        ( winner === 1 ) ? this.scores[0]++ : this.scores[1]++
        this.ball.posX = this.canvasWidth / 2
        this.ball.posY = this.canvasHeight / 2
    }
    
}

class Ball {
    constructor(radius, initPosY, initPosX) {
        this.radius = radius,
        this.posX = initPosX,
        this.posY = initPosY
        this.d = radius * 2
        this.vx = +1;
        this.vy = +1;
    }

    render(context) { 
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();    
    }

    move() {
          this.posY += this.vy;
          this.posX += this.vx;
          if (this.posY + this.radius >= game.canvasHeight || this.posY - this.radius <= 0) {
            this.vy = this.vy * -1
          }
          if (this.posX + this.radius >= game.canvasWidth || this.posX - this.radius <= 0) {
            this.vx = this.vx * -1
            
            let winner 
            (this.vx > 0) ? winner = 2 : winner = 1
            game.checkPoint(winner) 
          }

        }
    }

class Paddle {
    constructor(initPosY, initPosX) {
        this.player = player
        this.posX = initPosX
        this.posY = initPosY
        this.vx = +1;
        this.vy = +1;
    }

    render(context) { 
        context.fillStyle = 'white';
        context.fillRect(this.posX, this.posY, 15 , 50);  
    }
    
}
    
class LeftPaddle extends Paddle { 
    constructor(initPosY, initPosX) {
        super(initPosY, initPosX)
        this.posX = initPosX
        this.posY = initPosY
        this.vx = +1;
        this.vy = +1;
        document.addEventListener('keydown', (e) => {
                    if (e.key === 's'|| e.key === 'S') {
                        if  (this.posY+50 <= game.canvasHeight) this.posY += 20;
                    }

                    if (e.key === 'w' || e.key === 'W') {
                        if (this.posY >= 10) this.posY -= 20;
                    }   
        })
    }
}

class RightPaddle extends Paddle {
        constructor(initPosY, initPosX) {
            super(initPosY, initPosX)
            this.posX = initPosX
            this.posY = initPosY
            this.vx = +1;
            this.vy = +1;
            document.addEventListener('keydown', (e) => {
                        if (e.key === 'ArrowDown') {
                            if (this.posY+50 <= game.canvasHeight) this.posY += 20;
                        }   
                        if (e.key === 'ArrowUp') {
                            if (this.posY >= 10) this.posY -= 20;
                        }   
            })
        }
  }

//start game
const game = new Game();
game.play()
