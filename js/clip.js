$(document).ready(function(){
	var hobby = document.getElementById('changeHobby');
	var favHobbies = ['coding', 'drawing', 'watching anime', 'playing games', 'making crafts'];
	var hobbyCount = 0;
	var size = document.getElementById('changeSize');
	var sizeCount = 0;
	var increase = true;
	//call function
	init();
	//functions
	function init(){
		changeHobby();
	}
	function changeHobby(){
		if(hobbyCount > favHobbies.length - 1){
			hobbyCount = 0;
		}
		hobby.textContent = favHobbies[hobbyCount];
		//animate 1 second will make it appear, 1 second will make it disappear
		animText();
		// hobbyCount++;
		setTimeout(changeHobby, 100);
	}
	function animText(){
		//alert(size.clientWidth);
		if(increase){
			size.setAttribute('style', 'width: ' + sizeCount + '%');
			sizeCount = sizeCount + 4;
			if(sizeCount > 52){
				increase = false;
			}
		}
		else{
			size.setAttribute('style', 'width: ' + sizeCount + '%');
			sizeCount = sizeCount - 4;
			if(sizeCount <= 0){
				// sizeCount = 0;
				increase = true;
				hobbyCount++;
			}
		}
	}
});