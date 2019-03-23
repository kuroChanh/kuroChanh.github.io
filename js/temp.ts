// BRICKBREAKER IN TYPESCRIPT
// canvas
var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
ctx = canvas.getContext("2d");

// brick game class
class brickgame{
	// ball
	x: number;
	y: number;
	dx: number = 2;
	dy: number = -2;
	ballr: number = 10;
	// paddle
	padw: number = 75;
	padh: number = 10;
	padx: number;
	// paddle event handling
	rightp: boolean = false;
	leftp: boolean = false;
	// bricks
	brickrow: number = 3;
	brickcol: number = 5;
	brickw: number = 55;
	brickh: number = 10;
	brickpad: number = 2;
	brickt: number = 20;
	brickl: number = 8;
	// bricks array
	bricks: number[];
	// UI
	score: number = 0;
	lives: number = 3;

	// constructor
	constructor(canvas){
		// init values
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.padx = (canvas.width - this.padw) / 2;
		//init array
		for(var c = 0; c < this.brickcol; c++){
			// this.bricks[c] = []; I don't think this is needed
			for(var r = 0; r < this.brickrow; r++){
				this.bricks[c][r] = {x: 0, y: 0, status: 1};
				console.log(this.bricks[c][r] + " Husband Henry");
			}
		}
	}	
}

// creating game object
var game = new brickgame(<HTMLCanvasElement>document.getElementById("gameCanvas"));
// call the draw function
