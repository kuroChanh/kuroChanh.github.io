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




	// gameloop
	function draw(){
		// clear before rendering
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// draw ball
		drawball();
		// draw paddle
		drawpaddle();
		// update pos
		colCheck();
		// key handling
		eventCheck();
	}
	// event listeners
	document.addEventListener("keydown", keydownh, false);
	document.addEventListener("keyup", keyuph, false);
	// gameloop interval
	var interval = setInterval(draw, 10);

	// draw ball
	function drawball(){
		ctx.beginPath();
		ctx.arc(x, y, ballr, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	// collision check
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
				alert("GAME OVER");
				document.location.reload();
				// needed for chrome to end the game
				clearInterval(interval);
			}
		}
		x += dx;
		y += dy;
	}

	// draw paddle
	function drawpaddle(){
		ctx.beginPath();
		ctx.rect(padx, canvas.height - padh, padw, padh);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
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

	// event check
	function eventCheck(){
		if(rightp && padx < canvas.width - padw){
			padx += 7;
		}
		else if(leftp && padx > 0){
			padx -= 7;
		}
	}

	// game over
	function gameover(){

	}
});