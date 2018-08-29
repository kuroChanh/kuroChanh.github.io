$(document).ready(function(){
	var hobby = document.getElementById('changeHobby');
	var favHobbies = ['loves to code', 'loves drawing', 'loves learning new code', 'watches anime', 'plays games', 'loves making crafts', 'loves shibas and alpacas',
						'plays soccer and badminton', 'has a collection of plushies', 'is a fan of Block B', 'loves cute stationary', 'uses a planner', 
						'watches korean dramas'];
	var hobbyCount = 0;
	var size = document.getElementById('changeSize');
	var sizeCount = 0;
	var increase = true;
	var animTime = 100;
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
		//animate
		animText();
		//timer
		setTimeout(changeHobby, animTime);
	}
	function animText(){
		//alert(size.clientWidth);
		if(increase){
			animTime = 100;
			// size.setAttribute('style', 'width: ' + sizeCount + '%');
			// sizeCount = sizeCount + 4;
			// if(sizeCount > 40){
			// 	increase = false;
			// }
			hobby.textContent += favHobbies[hobbyCount].charAt(sizeCount);
			if(sizeCount >= favHobbies[hobbyCount].length - 1){
				increase = false;
				animTime = 700;
			}
			else{
				sizeCount++;
			}
		}
		else{
			// size.setAttribute('style', 'width: ' + sizeCount + '%');
			// sizeCount = sizeCount - 4;
			// if(sizeCount <= 0){
			// 	increase = true;
			// 	//increment word
			// 	hobbyCount++;
			// }
			animTime = 40;
			var temp = hobby.textContent.slice(0, -1);
			hobby.textContent = temp;
			sizeCount--;
			if(sizeCount < 0){
				increase = true;
				hobbyCount++;
			}
		}
	}
});