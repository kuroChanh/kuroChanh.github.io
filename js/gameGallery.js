$(document).ready(function(){
	//the gallery for the four game columns
	var ps4Col = document.getElementById('ps4Gallery');
	var dsCol = document.getElementById('dsGallery');
	var mobCol = document.getElementById('mobileGallery');
	var pcCol = document.getElementById('laptopGallery');
	//game
	var disc = document.getElementById('ps4Disc');
	var cartridge = document.getElementById('dsPack');
	//titles
	var ps4Title = document.getElementById('ps4Title');
	var dsTitle = document.getElementById('dsTitle');
	var mobTitle = document.getElementById('mobTitle');
	var pcTitle = document.getElementById('pcTitle');
	//image arrays
	var ps4Gallery = ['nier.jpg', 'type0.jpg'];
	var ps4Titles = ['Nier: Automata', 'Final Fantasy: Type-0'];
	var dsGallery = ['bravely.jpg', 'fates.jpg'];
	var dsTitles = ['Bravely Default: Second', 'Fire Emblem: Fates'];	
	var mobGallery = ['gameCover.png', 'granblue.jpg'];
	var mobTitles = ['Fire Emblem: Heroes', 'Granblue Fantasy'];
	var pcGallery = ['payday.jpg', 'papers.jpg'];
	var pcTitles = ['Payday 2', 'Papers, Please'];
	//image counters
	var ps4Count = 0;
	var dsCount = 0;
	var mobCount = 0;
	var pcCount = 0;
	//call the auto gallery functions
	ps4();
	ds();
	mobile();
	pc();
	//ps4 gallery function
	function ps4(){
		if(ps4Count > ps4Gallery.length-1){
			ps4Count = 0;
		}
		ps4Col.setAttribute('style', 'background-image: url("images/Games/' + ps4Gallery[ps4Count] + '")');
		//title
		ps4Title.innerHTML = ps4Titles[ps4Count];
		ps4Count++;
		//timer
		setTimeout(ps4, 3000);
	}
	//3ds gallery function
	function ds(){
		if(dsCount > dsGallery.length - 1){
			dsCount = 0;
		}
		dsCol.setAttribute('style', 'background-image: url("images/Games/' + dsGallery[dsCount] + '")');
		//title
		dsTitle.innerHTML = dsTitles[dsCount];
		dsCount++;
		//timer
		setTimeout(ds, 3000);
	}
	//mobile gallery function
	function mobile(){
		if(mobCount > mobGallery.length - 1){
			mobCount = 0;
		}
		mobCol.setAttribute('style', 'background-image: url("images/Games/' + mobGallery[mobCount] + '")');
		//title
		mobTitle.innerHTML = mobTitles[mobCount];
		mobCount++;
		//timer
		setTimeout(mobile, 3000);
	}
	//pc gallery function
	function pc(){
		if(pcCount > pcGallery.length - 1){
			pcCount = 0;
		}
		pcCol.setAttribute('style', 'background-image: url("images/Games/' + pcGallery[pcCount] + '")');
		//title
		pcTitle.innerHTML = pcTitles[pcCount];
		pcCount++;
		//timer
		setTimeout(pc, 3000);
	}
});