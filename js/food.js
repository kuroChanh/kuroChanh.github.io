$(document).ready(function(){
	var currFood = document.getElementById('currFood');
	var currTitle = document.getElementById('foodTitle');

	$("#food1").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/caphe.jpg")');
		currTitle.textContent = "Cà Phê"
	});
	$("#food2").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/crazy.jpg")');
		currTitle.textContent = "Fast Eddie's Crazy Fries"
	});
	$("#food3").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/tako.jpg")');
		currTitle.textContent = "Takoyaki"
	});
	$("#food4").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/katsu.jpg")');
		currTitle.textContent = "Katsudon"
	});
	$("#food5").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/nyf.png")');
		currTitle.textContent = "New York Fries Bacon Double Cheese"
	});
	$("#food6").click(function(){
		currFood.setAttribute('style', 'background-image: url("images/Food/prof.jpg")');
		currTitle.textContent = "Profiteroles"
	});
});