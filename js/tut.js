$(document).ready(function(){
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");

	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dx = 2;
	var dy = -2;
	var ballr = 10;

	var padh = 10;
	var padw = 75;
	var padx = (canvas.width - padw) / 2;

	var rightp = false;
	var leftp = false;

	var brickrow = 3;
	var brickcol = 5;
	var brickw = 55;
	var brickh = 10;
	var brickpad = 2;
	var brickt = 20;
	var brickl = 8;
	var bricks = [];
	// init bricks Array
	for(var c = 0; c < brickcol; c++){
		bricks[c] = [];
		for(var r = 0; r < brickrow; r++){
			bricks[c][r] = {x: 0, y: 0, status: 1};
		}
	}

	var score = 0;

	var lives = 3;





	// gameloop
	function draw(){
		// clear before rendering
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// draw ball
		drawball();
		// draw paddle
		drawpaddle();
		// draw bricks
		drawbricks();
		// draw score
		drawscore();
		// draw lives
		drawlives();
		// collision check
		colCheck();
		brickcolcheck();
		// key handling
		eventCheck();
	}
	// event listeners
	document.addEventListener("keydown", keydownh, false);
	document.addEventListener("keyup", keyuph, false);
	document.addEventListener("mousemove", mousecheck, false);
	// gameloop interval
	// var interval = setInterval(draw, 10);
	draw();
	// causes the draw function to call itself
	// gives control of the framerate back to the browser
	// requestAnimationFrame(draw);

	// draw ball
	function drawball(){
		ctx.beginPath();
		ctx.arc(x, y, ballr, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	// paddle collision check
	function colCheck(){
		if(x + dx > canvas.width - ballr || x + dx < ballr){
			dx = -dx;
		}
		if(y + dy < ballr){
			dy = -dy;
		}
		else if(y + dy > canvas.height - ballr){
			if( x > padx && x < padx + padw){
				// within paddle radius
				dy = -dy;
			}
			else{
				gameover();
			}
		}
		x += dx;
		y += dy;
	}

	// brick collision check
	function brickcolcheck(){
		for(var c = 0; c < brickcol; c++){
			for(var r = 0; r < brickrow; r++){
				var b = bricks[c][r];
				if(b.status == 1){
					if(	x > b.x && x < b.x + brickw && y > b.y && y < b.y + brickh){
						dy = -dy;
						b.status = 0;
						score++;
						if(score == brickrow * brickcol){
							win();
						}
					}
				}
			}
		}
	}

	// draw paddle
	function drawpaddle(){
		ctx.beginPath();
		ctx.rect(padx, canvas.height - padh, padw, padh);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	// draw bricks
	function drawbricks(){
		for(var c = 0; c < brickcol; c++){
			for(var r = 0; r < brickrow; r++){
				if(bricks[c][r].status == 1){
					var brickx = (c * (brickw + brickpad)) + brickl;
					var bricky = (r * (brickh + brickpad)) + brickt;
					bricks[c][r].x = brickx;
					bricks[c][r].y = bricky;
					ctx.beginPath();
					ctx.rect(brickx, bricky, brickw, brickh);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();
				}				
			}
		}
	}

	// draw score
	function drawscore(){
		ctx.font = "12px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score : " + score, 8, 15);
	}

	// draw lives
	function drawlives(){
		ctx.font = "12px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives: " + lives, canvas.width - 50, 15);
	}

	// event handling
	function keydownh(e){
		if(e.key == "ArrowRight"){
			rightp = true;
		}
		else if(e.key == "ArrowLeft"){
			leftp = true;
		}
	}
	function keyuph(e){
		if(e.key == "ArrowRight"){
			rightp = false;
		}
		else if(e.key == "ArrowLeft"){
			leftp = false;
		}
	}
	function mousecheck(e){
		var relx = e.clientX - canvas.offsetLeft;
		if(relx > 0 && relx < canvas.width){
			padx = relx - padw / 2;
		}
	}

	// event check
	function eventCheck(){
		if(rightp && padx < canvas.width - padw){
			padx += 7;
		}
		else if(leftp && padx > 0){
			padx -= 7;
		}
	}

	// win
	function win(){
		alert("WINNER WINNER CHICKEN DINNER");
		document.location.reload();
		clearInterval(interval);
	}

	// game over
	function gameover(){
		lives--;
		if(!lives){
			alert("GAME OVER");
			document.location.reload();
			// needed for chrome to end the game
			clearInterval(interval);
		}
		else{
			x = canvas.width / 2;
			y = canvas.height - 30;
			dx = 2;
			dy = -2;
			padx = (canvas.width - padw) / 2;
		}
	}
});