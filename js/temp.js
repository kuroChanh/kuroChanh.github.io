// BRICKBREAKER IN TYPESCRIPT
// canvas
var canvas;
var ctx;
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext("2d");
// brick game class
var brickgame = /** @class */ (function () {
    // constructor
    function brickgame(canvas) {
        this.dx = 2;
        this.dy = -2;
        this.ballr = 10;
        // paddle
        this.padw = 75;
        this.padh = 10;
        // paddle event handling
        this.rightp = false;
        this.leftp = false;
        // bricks
        this.brickrow = 3;
        this.brickcol = 5;
        this.brickw = 55;
        this.brickh = 10;
        this.brickpad = 2;
        this.brickt = 20;
        this.brickl = 8;
        // UI
        this.score = 0;
        this.lives = 3;
        // init values
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.padx = (canvas.width - this.padw) / 2;
        //init array
        for (var c = 0; c < this.brickcol; c++) {
            // this.bricks[c] = []; I don't think this is needed
            for (var r = 0; r < this.brickrow; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
                console.log(this.bricks[c][r] + " Husband Henry");
            }
        }
    }
    return brickgame;
}());
// creating game object
var game = new brickgame(document.getElementById("gameCanvas"));
// call the draw function
