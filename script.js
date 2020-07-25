const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

// height of the canvas
cvs.width = 400;
cvs.height = 400;

//counting each frames 
// this will help control the speed
let frames = 0;

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
        ctx.fillStyle = "red";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

const snake = {
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
    update : function() {
        
        // move the snake
        // updating at multiples of 6
        if(frames % 6 == 0) {

            for(let i = this.position.length - 1; i > 0; i--) {

                //check collision with self
                if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y) {
                    // add rules here as the snake has bite itself
                    if(this.position.length > 2) {
                        // splice modifies the array
                        this.position.splice(1);
                    }
                    break;
                }

                // moving the body together
                this.position[i].x = this.position[i - 1].x;
                this.position[i].y = this.position[i - 1].y; 
            }

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

            //collision with food
            if(getDistance(this.position[0].x, this.position[0].y, food.x, food.y) < 2 * this.radius) {
                // console.log("collision");
                // new food
                food.x = Math.random() * cvs.width;
                food.y = Math.random() * cvs.height;

                // increase snake laength from the last
                this.position.push({x : this.position[this.position.length - 1].x, y : this.position[this.position.length - 1].y })
            }

            // giving a wrap up property
            if(this.position[0].x < 0) this.position[0].x = cvs.width - this.radius;
            if(this.position[0].x > cvs.width) this.position[0].x = this.radius;
            if(this.position[0].y < 0) this.position[0].y = cvs.height - this.radius;
            if(this.position[0].y > cvs.height) this.position[0].y = this.radius;

        }        
    }
}

function getDistance(snakeX, snakeY, foodX, foodY) {
    let distanceX = foodX - snakeX;
    let distanceY = foodY - snakeY;
    // Pythagoras theorem
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function main() {
    ctx.clearRect(0, 0, cvs.clientWidth, cvs.height);
    snake.update();
    snake.draw();
    food.draw();
    frames ++;
    requestAnimationFrame(main);    
}
requestAnimationFrame(main);