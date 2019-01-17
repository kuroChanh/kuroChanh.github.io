$(document).ready(function(){
	//variables
	var imgCount = 0;
	//list of anime I'm currently watching
	var currAnime = document.getElementById('aCurr');
	var currTitle = document.getElementById('aTitle');
	var currStatus = document.getElementById('aStatus');
	var animeGallery = ['circus.jpg', 'jojo.jpg', 'kaze.jpg', 'mob.jpg', 'neverland.jpg', 'tsurune.jfif'];

	var titleGallery = ['Karakuri Circus', 'JJBA Part 5: Golden Wind', 'Kaze ga Tsuyoku Fuiteiru', 'Mob Psycho 100 II',
						'Yakusoku no Neverland', 'Tsurune: Kazemai Koukou Kyuudoubo'];

	var statusGallery = ['13/36 eps', '14/39 eps', '12/23 eps', '2/? eps', '1/? eps', '12/13 eps'];

	var next = false;
	var prev = false;
	var dotpress = false;

	var dot0 = document.getElementById('dot0');
	var dot1 = document.getElementById('dot1');
	var dot2 = document.getElementById('dot2');
	var dot3 = document.getElementById('dot3');
	var dot4 = document.getElementById('dot4');
	var dot5 = document.getElementById('dot5');


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
			currAnime.setAttribute('style', 'background-image: url("images/CurrentAnime/' + animeGallery[imgCount] + '")');
			currTitle.textContent =  titleGallery[imgCount];
			currStatus.textContent =  "My Progress: " + statusGallery[imgCount];
			next = false;
		}
		else if(prev == true){
			if(imgCount < 0){
				imgCount = animeGallery.length-1;
			}
			currAnime.setAttribute('style', 'background-image: url("images/CurrentAnime/' + animeGallery[imgCount] + '")');
			currTitle.textContent =  titleGallery[imgCount];
			currStatus.textContent =  "My Progress: " + statusGallery[imgCount];
			prev = false;
		}
		else if(dotpress == true){
			currAnime.setAttribute('style', 'background-image: url("images/CurrentAnime/' + animeGallery[imgCount] + '")');
			currTitle.textContent =  titleGallery[imgCount];
			currStatus.textContent =  "My Progress: " + statusGallery[imgCount];
			dotpress = false;
		}
		if(imgCount == 0){
			dot0.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
			dot5.setAttribute('style', 'background-color: #bbb');
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
			dot5.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 3){
			dot3.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot0.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
			dot5.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 4){
			dot4.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot0.setAttribute('style', 'background-color: #bbb');
			dot5.setAttribute('style', 'background-color: #bbb');
		}
		else if(imgCount == 5){
			dot5.setAttribute('style', 'background-color: #717171');
			dot1.setAttribute('style', 'background-color: #bbb');
			dot2.setAttribute('style', 'background-color: #bbb');
			dot3.setAttribute('style', 'background-color: #bbb');
			dot4.setAttribute('style', 'background-color: #bbb');
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
	$("#dot5").click(function(){
		dotpress = true;
		imgCount = 5;
		nextimg();
	});

	$("#aPreview").click(function(){
		if(preview == false){
			preview = true;
			container.setAttribute('style', 'left: 30%');
		}
		else if(preview == true){
			preview = false;
			container.setAttribute('style', 'left: 50%');
		}
	});
























	// //game section gallery
	// //top screen gallery
	// //get image to manipulate
	// var currAnime = document.getElementById('favAnimeShots');
	// var currDesc = document.getElementById('animeTitle');
	// var currDesc2 = document.getElementById('animeGenre');
	// //image array for top screen
	// var animeGallery = ['isekai.gif', 'run5.gif', 'jojo.gif', 'skele.gif', 'sumo.gif', 'tsuru.gif'];
	// var animeDesc1 = ['Isekai Izakaya: Koto Aitheria no Izakaya Nobu', 'Kaze ga Tsuyoku Fuiteiru', 'JJBA: Golden Wind', 'Gaikotsu Shotenin Honda-san', 
	// 					'Hinomaruzumou', 'Tsurune: Kazemai Koukou Kyoudoubo'];
	// var animeDesc2 = ['Fantasy', 'Drama, Sports', 'Action, Adventure, Shounen', 'Comedy, Slice of Life, Supernatural', 'Martial Arts, Shounen, Sports', 
	// 					'Drama, School, Sports'];
	// //counter
	// var topcount = 0;
	// //call the function
	// topPlay();
	// //function
	// function topPlay(){
	// 	//display image
	// 	if(topcount > animeGallery.length-1){
	// 		topcount = 0;
	// 	}
	// 	currAnime.setAttribute('style', 'background-image: url("images/CurrentAnime/' + animeGallery[topcount] + '")');
	// 	currDesc.textContent = 'Title: ' + animeDesc1[topcount];
	// 	currDesc2.textContent = 'Genre: ' + animeDesc2[topcount];
	// 	//increase counter
	// 	topcount++;
	// 	//timer
	// 	setTimeout(topPlay, 2000);
	// };
});