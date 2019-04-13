$(document).ready(function(){
	//image display
	var currImage = document.getElementById('imgDisplay');

	// //image scroll
	// var currDisplay = document.getElementById('imgSys');
	// var currScrollPos;

	// $(window).scroll(function() {
	// 	currScrollPos = window.scrollY;
	//     if(window.scrollY >= 3550){
	//     	currDisplay.setAttribute('style', 'position: relative');
	//     }
	//     else if(window.scrollY < 3550){
	//     	currDisplay.setAttribute('style', 'position: fixed');
	//     }
	// });



	$("#p19").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/battle.gif")');
	});
	$("#p18").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/player.gif")');
	});
	$("#p17").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/dialogue.gif")');
	});
	$("#p16").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/parallax.png")');
	});
	$("#p15").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/normal.gif")');
	});
	$("#p14").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/akira2.png")');
	});
	$("#p13").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/akira2.png")');
	});
	$("#p12").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/akira2.png")');
	});
	$("#p11").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/akira2.png")');
	});
	$("#p10").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/akira2.png")');
	});
	$("#p9").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/explode.gif")');
	});
	$("#p8").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/cubemap.gif")');
	});
	$("#p7").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/post.gif")');
	});
	$("#p6").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/image.png")');
	});
	$("#p5").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/depth.gif")');
	});
	$("#p4").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/model.png")');
	});
	$("#p3").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/lighting.gif")');
	});
	$("#p2").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/camera.gif")');
	});
	$("#p1").click(function(){
		currImage.setAttribute('style', 'background-image: url("images/window.png")');
	});
});