$(document).ready(function(){
	//variables
	var imgCount = 0;
	//list of anime I'm currently watching
	var currAnime = document.getElementById('aCurr');
	var currTitle = document.getElementById('aTitle');
	var currStatus = document.getElementById('aStatus');
	var animeGallery = ['akira.png', 'new.png', 'test.png', 'reach.png', 'ccs.png'];

	var next = false;
	var prev = false;
	var dotpress = false;

	var dot0 = document.getElementById('dot0');
	var dot1 = document.getElementById('dot1');
	var dot2 = document.getElementById('dot2');
	var dot3 = document.getElementById('dot3');
	var dot4 = document.getElementById('dot4');

	//variables
	var container = document.getElementById('aSlider');
	var preview = false;

	function nextimg(){
		if(next == true){
			if(imgCount > animeGallery.length-1){
				//goes to the beginning of the array
				imgCount = 0;
			}
			//DIRECTORY FROM HTML
			currAnime.setAttribute('style', 'background-image: url("images/' + animeGallery[imgCount] + '")');
			next = false;
		}
		else if(prev == true){
			if(imgCount < 0){
				imgCount = animeGallery.length-1;
			}
			currAnime.setAttribute('style', 'background-image: url("images/' + animeGallery[imgCount] + '")');
			prev = false;
		}
		else if(dotpress == true){
			currAnime.setAttribute('style', 'background-image: url("images/' + animeGallery[imgCount] + '")');
			dotpress = false;
		}
		if(imgCount == 0){
			dot0.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 1){
			dot1.setAttribute('style', 'background-color: #717171');
			dot0.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
			dot5.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 2){
			dot2.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot0.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 3){
			dot3.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot0.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 4){
			dot4.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot0.setAttribute('style', 'background-color: #bbb');
		}
	};
	$("#aLeft").click(function(){
		prev = true;
		imgCount--;
		nextimg();
	});
	$("#aRight").click(function(){
		next = true;
		imgCount++;
		nextimg();
	});
	nextimg();

	$("#dot0").click(function(){
		dotpress = true;
		imgCount = 0;
		nextimg();
	});
	$("#dot1").click(function(){
		dotpress = true;
		imgCount = 1;
		nextimg();
	});
	$("#dot2").click(function(){
		dotpress = true;
		imgCount = 2;
		nextimg();
	});
	$("#dot3").click(function(){
		dotpress = true;
		imgCount = 3;
		nextimg();
	});
	$("#dot4").click(function(){
		dotpress = true;
		imgCount = 4;
		nextimg();
	});
});