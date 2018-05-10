$(document).ready(function() {
	var music = document.getElementById('audio');
	//gets the audio
	var duration;
	var pButton = document.getElementById('pButton');
	var playhead = document.getElementById('playhead');
	var timeline = document.getElementById('timeline');
	//WIDTH IN PIXELS IS SET AT BEGINNING OF PAGE
	var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
	var onplayhead = false;
	//playhead moved when mouse is released

	var songs = ["Boys and Girls.mp3", "ANTI.mp3", "Inspiring.mp3", "Loves me Loves me not.mp3", "My Zone.mp3", "Walkin in the Rain.mp3", "Yesterday.mp3", "Inferiority Complex.mp3", "It Was Love.mp3", "Shall We Dance.mp3"];
	var current = -1;

	music.addEventListener("timeupdate", timeUpdate, false);
	timeline.addEventListener("click", function(event){
		//makes timeline clickable
		moveplayhead(event);
		music.currentTime = duration * clickPercent(event);
	}, false);

	//makes playhead draggable
	playhead.addEventListener('mousedown', mouseDown, false);
	window.addEventListener('mouseup', mouseUp, false);

	function clickPercent(e) {
		//returns click as decimal of the total timelinewidth
		return (e.pageX - timeline.offsetLeft) / timelineWidth;
	};

	function mouseDown() {
		onplayhead = true;
		window.addEventListener('mousemove', moveplayhead, true);
		music.removeEventListener('timeupdate', timeUpdate, false);
	};

	function mouseUp(e) {
		//gets all mouse click inputs
		if (onplayhead == true) {
			moveplayhead(e);
			window.removeEventListener('mousemove', moveplayhead, true);
			//changes the song time
			music.currentTime = duration * clickPercent(e);
			music.addEventListener('timeupdate', timeUpdate, false);
		};
		onplayhead = false;
	}

	function moveplayhead(e) {
		//moves playhead while user drags it
		//FIX THIS UP
		var newMargLeft = e.pageX - timeline.offsetLeft;
		if (newMargLeft >= 0 && newMargLeft <= timelineWidth){
			playhead.style.marginLeft = newMargLeft + "px";
		}
		if (newMargLeft < 0){
			playhead.style.marginLeft = "0px";
		}
		if (newMargLeft > timelineWidth){
			playhead.style.marginLeft = timelineWidth + "px";
		}
	};
	function timeUpdate() {
		//updates time of song with position of playhead
		var playPercent = timelineWidth * (music.currentTime / duration);
		playhead.style.marginLeft = playPercent + "px";
		if (music.currentTime == duration) {
			pButton.className = "";
			pButton.className = "fa fa-play";
		}
	};
	pButton.onclick=function() {
		//play and pause
		//starts the music
		if (music.paused) {
			music.play();
			//removes the play and makes it pause
			pButton.className = "";
			pButton.className = "fa fa-pause";
		}
		else {
			music.pause();
			//removes pause and makes it play
			pButton.className = "";
			pButton.className = "fa fa-play";
		}
	}
	prevBtn.onclick=function(){
		console.log("prev song");
		current--;
		//removes the play and makes it pause
		pButton.className = "";
		pButton.className = "fa fa-pause";
		if(current < 0){
			current = songs.length - 1;
		}
		music.setAttribute('src', 'audio/' + songs[current]);
   		music.load();
   		music.play();
	}
	nextBtn.onclick=function(){
		console.log("next song");
		current++;
		//removes the play and makes it pause
		pButton.className = "";
		pButton.className = "fa fa-pause";
		if(current >= songs.length){
			current = 0;
		}
		music.setAttribute('src', 'audio/' + songs[current]);
   		music.load();
   		music.play();
	   	console.log(current);
	}

	music.addEventListener("canplaythrough", function() {
		//gets the length of the audio
		duration = music.duration;
	}, false);

	music.addEventListener('ended', function(e){
		current++;
   		music.setAttribute('src', 'audio/' + songs[current]);
   		music.load();
   		music.play();
   		pButton.className = "";
		pButton.className = "fa fa-pause";
   		console.log(current);
       		if (current >= songs.length) {
        		current = 0;
        	}
    });
});