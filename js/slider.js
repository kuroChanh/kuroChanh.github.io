$(document).ready(function() {
	var intro = document.getElementById('intro');
	var code = document.getElementById('code');
	var interest = document.getElementById('interest');
	var anime = document.getElementById('anime');
	var songs = document.getElementById('songs');
	var games = document.getElementById('games');
	var oc = document.getElementById('oc');

	$("#profilebtn").click(function(){
		intro.setAttribute('style', 'display: block');
		code.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
		// put in the translation units here for each function
	});
	$("#codebtn").click(function(){
		code.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
	});
	$("#interestbtn").click(function(){
		interest.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		code.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
	});
	$("#animebtn").click(function(){
		anime.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		code.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
	});
	$("#songsbtn").click(function(){
		songs.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		code.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
	});
	$("#gamesbtn").click(function(){
		games.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		code.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		oc.setAttribute('style', 'display: none');
	});
	$("#ocbtn").click(function(){
		oc.setAttribute('style', 'display: block');
		intro.setAttribute('style', 'display: none');
		code.setAttribute('style', 'display: none');
		interest.setAttribute('style', 'display: none');
		anime.setAttribute('style', 'display: none');
		songs.setAttribute('style', 'display: none');
		games.setAttribute('style', 'display: none');
	});
});