// Enemies our player must avoid
var Enemy = function (x, y, dv) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.dv = dv;
    this.col = 101;
    this.border = this.col * 5;
    this.reset = -this.col;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.border) {
        this.x += this.dv * dt;
    } else {
        this.x = this.reset;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.panel_stepCount = document.querySelector('.panel_stepCount');
        this.panel_timer = document.querySelector('.panel_timer');
        this.col = 101;
        this.row = 86;
        this.initialX = this.col * 2;
        this.initialY = (this.row * 4) + 55;
        this.x = this.initialX;
        this.y = this.initialY;
        this.victory = false;
        this.stepCount = 0;
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Move player model xy position based on input
     * 
     * @param {string} input user provided direction keys presses
     */
    handleInput(input) {
        // Timer and step count trackers
        this.startTimer();
        this.stepCount++;
        //Switch to move player model based on key inputs
        console.log(this.y);
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.col;
                }
                break;
            case 'down':
                if (this.y < this.row * 4) {
                    this.y += this.row;
                }
                break;
            case 'right':
                if (this.x < this.col * 4) {
                    this.x += this.col;
                }
                break;
            case 'up':
                if (this.y > this.row) {
                    this.y -= this.row;
                }
                break;
        }
    }

    /**
     * Collision detection
     * Enemy for loop triggers reset when player and enemy position overlap
     * Game ends when player model reaches 'river'
     */
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && ((enemy.x + enemy.col / 1.3) > this.x &&
                    enemy.x < (this.x + this.col / 1.3))) {
                this.reset();
            }
        }

        if (this.y === 55) {
            this.victory = true;
        }
    }

    /**
     * Reset positions, step count, and time to initial
     */
    reset() {
        this.y = this.initialY;
        this.x = this.initialX;
        this.stepCount = 0;
        this.startTime = 0;
    }

    /**
     * Timer stars on first move
     */
    startTimer() {
        if (this.stepCount === 0) {
            this.startTime = Date.now();
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();
const stepCount = this.stepCount;
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 86, 300);
const enemy3 = new Enemy(-101, 172, 250);
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});