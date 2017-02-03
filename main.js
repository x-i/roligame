var tile = [
	{img: "pic1.png", id: 1},
	{img: "pic2.png", id: 2},
	{img: "pic3.png", id: 3},
	{img: "pic4.png", id: 4},
	{img: "pic5.png", id: 5},
	{img: "pic6.png", id: 6},
	{img: "pic7.png", id: 7},
	{img: "pic8.png", id: 8},
	{img: "pic9.png", id: 9},
	{img: "pic10.png", id: 10},
	{img: "pic11.png", id: 11},
	{img: "pic12.png", id: 12},
	{img: "pic13.png", id: 13},
	{img: "pic14.png", id: 14}
]

var b = document.getElementById("board");
var s = document.getElementById("start");
var t = document.getElementsByClassName("tile");
var compare = [];
var timerVar;


///////////////////////////
//  PLAY! BUTTON | start /////////////////////////
function play(){

// Starting point = Blank page AND resets values
document.getElementById("board").innerHTML = "";

var totalSeconds = 0;

document.getElementById("numclicked").innerHTML = clicks;

document.getElementById("numclicks").innerHTML = matches;


// RANDOMIZER
function shuffle(a) {
	var j, x, i;
	// Looping through the array
	for (var i = 0; i < a.length; i++) {
		// Generating random selection
		j = Math.floor(Math.random()*i);
		// Flipping the locations
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
}

var tileDup = [];

for (var i = 0; i < tile.length; i++) {
	tileDup.push(tile[i]);
	tileDup.push(tile[i]);
}

// Uses RANDOMIZER - Fisher Yates randomizes the images
shuffle(tileDup);

// Creates the grid of tiles
for (var i = 0; i < tileDup.length; i++) {
	var content = "<div id='" + i + "' data-id='" + tileDup[i].id + "' class='tile'>\ <img class='tiles' src='img/" + tileDup[i].img + "'>\<img class='cover' src='img/pic.png'></div>";
	b.insertAdjacentHTML('beforeend', content);
}
	enableClick();

//Start timer
timerVar = setInterval(timerStart, 1000);
function timerStart() {
	totalSeconds++;
	var hour = Math.floor(totalSeconds /3600);
	var minute = Math.floor((totalSeconds - hour*3600)/60);
	var seconds = totalSeconds - (hour*3600 + minute*60);
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	document.getElementById("time").innerHTML = minute + ":" + seconds;
}

}
//  PLAY! BUTTON | end ///////////////////////////
/////////////////////////


// "Starts" the game
s.addEventListener("click", function() {
	clearInterval(timerVar);
	clicks = 0;
	matches = 14;
	play(); 
	enableClick();
});
/////////////////////////



// "Flip"
function enableClick() {
	for(var i = 0; i < t.length; i++){
		t[i].addEventListener('click', tileClick)
	}
}

function disableClick() {
	for(var i = 0; i < t.length; i++){
		t[i].removeEventListener('click', tileClick)
	}
}
function tileClick() {
	clicks++;
	var flipCount = document.getElementById("numclicked");
	flipCount.textContent = clicks;
	this.lastChild.classList.add("hide");
	match(this);
	GameOver();
}
/////////////////////////


function match(t){
	var a = {
		id: t.getAttribute("id"),
		Did: t.getAttribute("data-id")
	}
	compare.push(a);
	
	if(compare.length == 2){
		if(compare[0].Did == compare[1].Did){
			compare.length = 0;
			matches--;
			document.getElementById("numclicks").innerHTML = matches;
	} else {
		document.getElementById("numclicked").innerHTML = clicks;
		disableClick();
		setTimeout(function() {
			var one = document.getElementById(compare[0].id);
			var two = document.getElementById(compare[1].id);
			one.lastChild.classList.remove("hide");
			two.lastChild.classList.remove("hide");
			compare.length = 0;
			enableClick();
		}, 1000)
		}
	}

}


// Starting over
function GameOver() {
	if (matches == 0) {
		clearInterval(timerVar);
		disableClick();
		confirm("Game Over! You finished in " + time.innerHTML + " minutes:seconds with " + clicks + " flips. Click 'Play!' to restart!");
		document.getElementById("scoreF").innerHTML = time.innerHTML;
		document.getElementById("scoreM").innerHTML = clicks;
	}
}