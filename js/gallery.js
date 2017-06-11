$(document).ready(function(){
	//game section gallery
	//top screen gallery
	//get image to manipulate
	var topscreen = document.getElementById('topgallery');
	var bottomscreen = document.getElementById('bottomgallery');
	//image array for top screen
	var topgallery = ['chrom.gif', 'hoshido.gif', 'nohr.gif', 'revelation.gif', 'conquest.gif', 'heartgold.gif', 'omega.gif'];
	var bottomgallery = ['title1.png', 'title2.png', 'title3.png', 'title4.png', 'title5.png', 'title6.png', 'title7.png'];
	//counter
	var topcount = 0;
	//call the function
	topPlay();
	//function
	function topPlay(){
		//display image
		if(topcount > topgallery.length-1){
			topcount = 0;
		}
		topscreen.setAttribute('style', 'background-image: url("images/Games/' + topgallery[topcount] + '")');
		bottomscreen.setAttribute('style', 'background-image: url("images/Games/' + bottomgallery[topcount] + '")');
		//increase counter
		topcount++;
		//timer
		setTimeout(topPlay, 3000);
	};

	
	// var img = document.getElementById('img');
	// //img array
	// var pic = ["meme2.jpg", "meme4.jpg", "meme5.jpg", "meme6.jpg", "meme1.jpg"];
	// var imgCount = 0;
	// var next = false;
	// var prev = false;
	// //document.getElementById("p2").style.color = "blue
	// function nextimg(){
	// 	if(next == true){
	// 		if(imgCount > pic.length-1){
	// 			//goes to the beginning of the array
	// 			imgCount = 0;
	// 		}
	// 		//DIRECTORY FROM HTML
	// 		img.setAttribute('style', 'background-image: url("images/' + pic[imgCount] + '")');
	// 		next = false;
	// 	}
	// 	else if(prev == true){
	// 		if(imgCount < 0){
	// 			imgCount = pic.length-1;
	// 		}
	// 		img.setAttribute('style', 'background-image: url("images/' + pic[imgCount] + '")');
	// 		prev = false;
	// 	}
	// };
	// $("#previous").click(function(){
	// 	prev = true;
	// 	imgCount--;
	// 	nextimg();
	// });
	// $("#next").click(function(){
	// 	next = true;
	// 	imgCount++;
	// 	nextimg();
	// });
	// nextimg();
});