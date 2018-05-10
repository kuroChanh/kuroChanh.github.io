$(document).ready(function() {
	var intro = document.getElementById('intro');
	var anime = document.getElementById('anime');
	var songs = document.getElementById('songs');
	var games = document.getElementById('games');

	$("#profilebtn").click(function(){
		intro.setAttribute('style', 'display: block');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		// put in the translation units here for each function
	});
	$("#animebtn").click(function(){
		anime.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
	});
	$("#songsbtn").click(function(){
		songs.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
	});
	$("#gamesbtn").click(function(){
		games.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
	});
});