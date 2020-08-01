# The Snake Game
This is the famous snake game, implemented in JavaScript. The game rules are simple enough to get acquainted by running it. Users can change rules of the game by changing this at line number 90. 
```javascript
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
```
## Work under progress :
1. ~A scoring system~
2. ~Adding alert features~
3. ~Adding some style~
4. ~Speed increase after a certain interval~
5. ~Added navigation pane~
6. Multiple food available
7. User name input
8. Enabling touch features and making it mobile-friendly.