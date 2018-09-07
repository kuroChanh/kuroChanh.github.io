//going to individual tabs
	function openGames(gameName) {
	    var i;
	    var x = document.getElementsByClassName("game");
	    for (i = 0; i < x.length; i++) {
	       x[i].style.display = "none";
	    }
	    var temp = document.getElementById(gameName);
	    temp.style.display = "block";
	    if(gameName == "tabps4"){
	    	tab1();
	    }
	    else if(gameName == "tabds"){
	    	tab2();
	    }
	    else if(gameName == "tabmobile"){
	    	tab3();
	    }
	    else if(gameName == "tabpc"){
	    	tab4();
	    }
	}
	function tab1(){
		var temp = document.getElementById('gameButton1');
		temp.setAttribute('style', 'border-bottom: solid; border-width: 2px');
		var temp2 = document.getElementById('gameButton2');
		temp2.setAttribute('style', 'border: none');
		var temp3 = document.getElementById('gameButton3');
		temp3.setAttribute('style', 'border: none');
		var temp4 = document.getElementById('gameButton4');
		temp4.setAttribute('style', 'border: none');
		// temp.setAttribute('style', 'border-right: solid');
		// temp.setAttribute('style', 'border-top: solid');
		// temp.setAttribute('style', 'border-width: 2px');
	}
	function tab2(){
		var temp = document.getElementById('gameButton2');
		temp.setAttribute('style', 'border-bottom: solid; border-width: 2px');
		var temp2 = document.getElementById('gameButton1');
		temp2.setAttribute('style', 'border: none');
		var temp3 = document.getElementById('gameButton3');
		temp3.setAttribute('style', 'border: none');
		var temp4 = document.getElementById('gameButton4');
		temp4.setAttribute('style', 'border: none');
		// temp.setAttribute('style', 'border-right: solid');
		// temp.setAttribute('style', 'border-top: solid');
		// temp.setAttribute('style', 'border-width: 2px');
	}
	function tab3(){
		var temp = document.getElementById('gameButton3');
		temp.setAttribute('style', 'border-bottom: solid; border-width: 2px');
		var temp2 = document.getElementById('gameButton2');
		temp2.setAttribute('style', 'border: none');
		var temp3 = document.getElementById('gameButton1');
		temp3.setAttribute('style', 'border: none');
		var temp4 = document.getElementById('gameButton4');
		temp4.setAttribute('style', 'border: none');
		// temp.setAttribute('style', 'border-right: solid');
		// temp.setAttribute('style', 'border-top: solid');
		// temp.setAttribute('style', 'border-width: 2px');
	}
	function tab4(){
		var temp = document.getElementById('gameButton4');
		temp.setAttribute('style', 'border-bottom: solid; border-width: 2px');
		var temp2 = document.getElementById('gameButton2');
		temp2.setAttribute('style', 'border: none');
		var temp3 = document.getElementById('gameButton3');
		temp3.setAttribute('style', 'border: none');
		var temp4 = document.getElementById('gameButton1');
		temp4.setAttribute('style', 'border: none');
		// temp.setAttribute('style', 'border-right: solid');
		// temp.setAttribute('style', 'border-top: solid');
		// temp.setAttribute('style', 'border-width: 2px');
	}