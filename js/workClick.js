$(document).ready(function(){
	var currPressed = false;
	var finPressed = false;
	var ocPressed = false;
	var commPressed = false;
	var currD = document.getElementById('currDetails');
	var finD = document.getElementById('finDetails');
	var charD = document.getElementById('ocDetails');
	var commD = document.getElementById('comDetails');
	var currW = document.getElementById('currWork');
	var finW = document.getElementById('finWork');
	var ocW = document.getElementById('ocWork');
	var commW = document.getElementById('comWork');

    $("#currWork").click(function(){
        // alert("The paragraph was clicked.");
        if(!currPressed){
        	//make current work information appear
        	// currD.setAttribute('style', 'display: initial');
        	currPressed = true;
        	//make other sections disappear
        	// finW.setAttribute('style', 'display: none');
        	// ocW.setAttribute('style', 'display: none');
        	// commW.setAttribute('style', 'display: none');
        	$("#finWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#ocWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#comWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	setTimeout(currAppear, 1000);
        }
        else{
        	//make current work disappear
        	currD.setAttribute('style', 'display: none');
        	currPressed = false;
        	//make other sections reappear
        	finW.setAttribute('style', 'display: initial');
        	ocW.setAttribute('style', 'display: initial');
        	commW.setAttribute('style', 'display: initial');
        }
    });
    function currAppear(){
    	currD.setAttribute('style', 'display: initial');
    }

    $("#finWork").click(function(){
        // alert("The paragraph was clicked.");
        if(!finPressed){
        	//make current work information appear
        	// finD.setAttribute('style', 'display: initial');
        	finPressed = true;
        	//make other sections disappear
        	// currW.setAttribute('style', 'display: none');
        	// ocW.setAttribute('style', 'display: none');
        	// commW.setAttribute('style', 'display: none');
        	$("#currWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#ocWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#comWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	setTimeout(finAppear, 1000);
        }
        else{
        	//make current work disappear
        	finD.setAttribute('style', 'display: none');
        	finPressed = false;
        	//make other sections reappear
        	currW.setAttribute('style', 'display: initial');
        	ocW.setAttribute('style', 'display: initial');
        	commW.setAttribute('style', 'display: initial');
        }
    });
    function finAppear(){
    	finD.setAttribute('style', 'display: initial');
    }

    $("#ocWork").click(function(){
        // alert("The paragraph was clicked.");
        if(!ocPressed){
        	//make current work information appear
        	// charD.setAttribute('style', 'display: initial');
        	ocPressed = true;
        	//make other sections disappear
        	// finW.setAttribute('style', 'display: none');
        	// currW.setAttribute('style', 'display: none');
        	// commW.setAttribute('style', 'display: none');
        	$("#finWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#currWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#comWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	setTimeout(charAppear, 1000);
        }
        else{
        	//make current work disappear
        	charD.setAttribute('style', 'display: none');
        	ocPressed = false;
        	//make other sections reappear
        	finW.setAttribute('style', 'display: initial');
        	currW.setAttribute('style', 'display: initial');
        	commW.setAttribute('style', 'display: initial');
        }
    });
    function charAppear(){
    	charD.setAttribute('style', 'display: initial');
    }

    $("#comWork").click(function(){
        // alert("The paragraph was clicked.");
        if(!commPressed){
        	//make current work information appear
        	// commD.setAttribute('style', 'display: initial');
        	commPressed = true;
        	//make other sections disappear
        	// finW.setAttribute('style', 'display: none');
        	// ocW.setAttribute('style', 'display: none');
        	// currW.setAttribute('style', 'display: none');
        	$("#finWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#ocWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	$("#currWork").animate({
        		opacity: '0',
        		width: '0'
        	});
        	setTimeout(commAppear, 1000);
        }
        else{
        	//make current work disappear
        	commD.setAttribute('style', 'display: none');
        	commPressed = false;
        	//make other sections reappear
        	finW.setAttribute('style', 'display: initial');
        	ocW.setAttribute('style', 'display: initial');
        	currW.setAttribute('style', 'display: initial');
        }
    });
    function commAppear(){
    	commD.setAttribute('style', 'display: initial');
    }
});