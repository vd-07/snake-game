# The Snake Game
This is the famous snake game, implemented in JavaScript. The game rules are simple enough to get acquainted by running it. Users can change rules of the game by changing this line. 
```javascript
                //check collision with self
                if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y) {
                    // add rules here as the snake has bite itself
                    if(this.position.length > 2) {
                        // splice modifies the array
                        this.position.splice(1);
                    }
                    break;
                }
```
> Work under progress for enabling touch features and making it mobile-friendly.