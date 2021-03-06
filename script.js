const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

// // height of the canvas
// cvs.width = 600;
// cvs.height = 400;

//counting each frames 
// this will help control the speed
let frames = 0;
let score = 0;
let distance = 0;
let speed = 10;

const direction = {
    currrent: 0,
    idle: 0,
    right: 1,
    down: 2,
    left: 3,
    up: 4
}

document.addEventListener("keydown", function(evt) {
    switch(evt.keyCode) {
        case 37: //left
            if(direction.current != direction.right) {
                // avoiding when moving hort
                direction.current = direction.left;
            }
            break;
        case 38: //down
            if(direction.current != direction.up) {
                // avoiding when moving vert
                direction.current = direction.down;
            }
            break;
        case 39: //right
            if(direction.current != direction.left) {
                // avoiding when moving hort
                direction.current = direction.right;
            }
            break;
        case 40: //up
            if(direction.current != direction.down) {
                // avoiding when moving hort
                direction.current = direction.up;
            }
            break;

    }
});

const food = {
    x : cvs.width / 4,
    y : cvs.height / 4,
    radius : 10,

    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

const snake = {
    hasSnakeBit : false,
    radius : 10,
    position : [{x : cvs.width / 2, y : cvs.height / 2}],
    velocity: 20,
    draw : function() {
        ctx.fillStyle = "black";
        for(let i in this.position) {
            let pos = this.position[i];
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    },

    checkCollision: function(snakeX, snakeY) {
        // checking if snake's body touches the food
        return (getDistance(snakeX, snakeY, food.x, food.y) < 2 * this.radius);
    },

    allocateNewFood: function(snakeX, snakeY) {
        food.x = Math.random() * cvs.width;
        food.y = Math.random() * cvs.height;

        // if the newly allocated food position touches the snake body
        if(this.position.some(item => this.checkCollision(item.x, item.y)))
            this.allocateNewFood(snakeX, snakeY);
    },

    updateDistance: function() {
        if(direction.current !== undefined) {
            distance ++;
            document.getElementById('distance').innerHTML = "Distance : " + String(distance);    
        }
    },

    movePiecesTogether: function() {
        for(let i = this.position.length - 1; i > 0; i--) {
            //check collision with self
            if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y) {
                // add rules here as the snake has bite itself
                if(this.position.length > 2) {
                    // splice modifies the array
                    // this.position.splice(1);
                    window.alert("Game Over! Your score is " + String(score));
                    this.hasSnakeBit = true;
                }
                break;
            }

            // moving the body together
            this.position[i].x = this.position[i - 1].x;
            this.position[i].y = this.position[i - 1].y; 
        }
    },

    updateDirection: function() {
        //updating as per the current direction of the snake
        if(direction.current == direction.right) {
            this.position[0].x += this.velocity;
        }
        if(direction.current == direction.left) {
            this.position[0].x -= this.velocity;
        } 
        if(direction.current == direction.up) {
            this.position[0].y += this.velocity;
        }
        if(direction.current == direction.down) {
            this.position[0].y -= this.velocity;
        }
    },

    didAteFood: function() {
        //collision with food
        if(this.checkCollision(this.position[0].x, this.position[0].y)) {
            // console.log("collision");
            // new food

            //update and reflect score
            score += 10 + Math.ceil(Math.sqrt(distance));
            document.getElementById('score').innerHTML = score;

            //allocating new food
            this.allocateNewFood(this.position[0].x, this.position[0].y);
            

            // increase snake length from the last
            this.position.push({x : this.position[this.position.length - 1].x, y : this.position[this.position.length - 1].y })
        }
    },

    wrapUp: function() {
        // giving a wrap up property
        if(this.position[0].x < 0) this.position[0].x = cvs.width - this.radius;
        if(this.position[0].x > cvs.width) this.position[0].x = this.radius;
        if(this.position[0].y < 0) this.position[0].y = cvs.height - this.radius;
        if(this.position[0].y > cvs.height) this.position[0].y = this.radius;
    },

    speedUp: function() {
        if(speed > 1 && distance > 0 && distance % 150 == 0)
            speed--;
    },

    update : function() {
        
        // move the snake
        // updating at multiples of 6
        if(frames % speed == 0) {
            this.speedUp();
            this.updateDistance();
            this.movePiecesTogether();
            this.updateDirection();
            this.didAteFood();
            this.wrapUp();
        }        
    }
}

function getDistance(snakeX, snakeY, foodX, foodY) {
    let distanceX = foodX - snakeX;
    let distanceY = foodY - snakeY;
    // Pythagoras theorem : distance = sqrt((x1 - x2) ^ 2 + (y1 - y2) ^ 2)
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function main() {
    if(snake.hasSnakeBit == false) {
        ctx.clearRect(0, 0, cvs.clientWidth, cvs.height);
        snake.update();
        snake.draw();
        food.draw();
        frames ++;
        requestAnimationFrame(main);        
    }
    else {
        document.getElementById('gameover').innerHTML = "Please refresh page to restart!";
    }
}
requestAnimationFrame(main);