$(document).ready(function() {
	//scrolls down to the item clicked
	$('.mainnav').click(function(event){
		var aName = event.target.name;
		//gets the name from the a tags
		$('html, body').animate({
			scrollTop: $("#" + aName).offset().top - 42
		}, 900);
	});
	$('#home').click(function(event){
		$('html, body').animate({
			scrollTop: 0
		}, 900);
	});
});