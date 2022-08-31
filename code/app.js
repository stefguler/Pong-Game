


//setting dimensions of canvas
class Game {
    constructor() {
        this.canvas = document.querySelector('canvas'),
        this.ctx = this.canvas.getContext('2d'),
        this.canvasWith = 700,
        this.canvasHeight = 500;
        this.paddleLeft = new Paddle(10, 10, 1);
        this.paddleRight = new Paddle(10, 675, 2);
        this.ball = new Ball(10, [10,10]);

    }

    resetCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvasWith,this.canvasHeight)
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
            this.paddleRight.render(this.ctx), 17} )
    };

}

class Ball {
    constructor(radius, initPos) {
        this.radius = radius,
        this.initPos = initPos, //initPos as Array: [y, x axis of canvas]
        this.vx = +2;
        this.vy = +2;
    }

    render(context) { 
        context.beginPath();
        context.arc(this.initPos[0], this.initPos[1], this.radius, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();    
    }

    move() {
          this.initPos[0] += this.vx;
          this.initPos[1] += this.vy;
          if (this.initPos[0] - this.radius >= game.canvasWith || this.initPos[0] - this.radius <= 0) {
            this.vx = this.vx * -1
          }
          if (this.initPos[1] - this.radius >= game.canvasHeight || this.initPos[1] - this.radius <= 0) {
            this.vy = this.vy * -1
          }
        }
    }

class Paddle {
    constructor(initPosY, initposX, player) {
        this.player = player
        this.posY = initPosY, //initPos as Array: [y, x axis of canvas]
        this.posX = initposX,
        this.vx = +2;
        this.vy = +2;
        document.addEventListener('keydown', (e) => {
            switch (player) {
                case 1:
                    if (e.key === 's') {
                        if  (this.posY <= game.canvasHeight - 55) this.posY += 5;
                    }

                    if (e.key === 'w') {
                        if (this.posY >= 10) this.posY -= 5;
                    } 
                break;
                case 2:
                    if (e.key === 'ArrowUp') {
                        if (this.posY >= 10)  this.posY -= 5;
                    }
                    if (e.key === 'ArrowDown') {
                        if (this.posY <= game.canvasHeight - 55) this.posY += 5;
                    } 
                break;
                default:
                    return 'only 2 players possible'
                }                
        })
    }

    render(context) { 
        context.fillStyle = 'white';
        context.fillRect(this.posX, this.posY, 15 , 50);  
    }

}

//start game
const game = new Game();
game.play()
