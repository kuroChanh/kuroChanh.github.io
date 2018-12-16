$(document).ready(function(){
	//game section gallery
	//top screen gallery
	//get image to manipulate
	var currAnime = document.getElementById('favAnimeShots');
	var currDesc = document.getElementById('animeTitle');
	var currDesc2 = document.getElementById('animeGenre');
	//image array for top screen
	var animeGallery = ['isekai.gif', 'run5.gif', 'jojo.gif', 'skele.gif', 'sumo.gif', 'tsuru.gif'];
	var animeDesc1 = ['Isekai Izakaya: Koto Aitheria no Izakaya Nobu', 'Kaze ga Tsuyoku Fuiteiru', 'JJBA: Golden Wind', 'Gaikotsu Shotenin Honda-san', 
						'Hinomaruzumou', 'Tsurune: Kazemai Koukou Kyoudoubo'];
	var animeDesc2 = ['Fantasy', 'Drama, Sports', 'Action, Adventure, Shounen', 'Comedy, Slice of Life, Supernatural', 'Martial Arts, Shounen, Sports', 
						'Drama, School, Sports'];
	//counter
	var topcount = 0;
	//call the function
	topPlay();
	//function
	function topPlay(){
		//display image
		if(topcount > animeGallery.length-1){
			topcount = 0;
		}
		currAnime.setAttribute('style', 'background-image: url("images/CurrentAnime/' + animeGallery[topcount] + '")');
		currDesc.textContent = 'Title: ' + animeDesc1[topcount];
		currDesc2.textContent = 'Genre: ' + animeDesc2[topcount];
		//increase counter
		topcount++;
		//timer
		setTimeout(topPlay, 2000);
	};
});