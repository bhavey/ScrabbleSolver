//Setting size of elements:
//http://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
var isWidthTimeoutSet = 0;
var widthTimer = null;

//0 = nothing, 1 = start, 2 = double letter, 3 = tripple letter
//6 = double word, 9 = triple word
//each row is a row on the board
//wish javascript had enums :(
var boardTiles = [
	["#r00",9,0,0,2,0,0,0,9,0,0,0,2,0,0,9],
	["#r01",0,6,0,0,0,3,0,0,0,3,0,0,0,6,0],
	["#r02",0,0,6,0,0,0,2,0,2,0,0,0,6,0,0],
	["#r03",2,0,0,6,0,0,0,2,0,0,0,6,0,0,2],
	["#r04",0,0,0,0,6,0,0,0,0,0,6,0,0,0,0],
	["#r05",0,3,0,0,0,3,0,0,0,3,0,0,0,3,0],
	["#r06",0,0,2,0,0,0,2,0,2,0,0,0,2,0,0],
	["#r07",9,0,0,2,0,0,0,1,0,0,0,2,0,0,9],
	["#r08",0,0,2,0,0,0,2,0,2,0,0,0,2,0,0],
	["#r09",0,3,0,0,0,3,0,0,0,3,0,0,0,3,0],
	["#r10",0,0,0,0,6,0,0,0,0,0,6,0,0,0,0],
	["#r11",2,0,0,6,0,0,0,2,0,0,0,6,0,0,2],
	["#r12",0,0,6,0,0,0,2,0,2,0,0,0,6,0,0],
	["#r13",0,6,0,0,0,3,0,0,0,3,0,0,0,6,0],
	["#r14",9,0,0,2,0,0,0,9,0,0,0,2,0,0,9]
];


function resizeTiles() {
	isWidthTimeoutSet = 0;
	//Don't go past the window height w. width
	$('.board').css({'max-width':$(window).height()-20+'px'});
	var tileWidth = $('.tile').width();
	//Set the height
	$('.tile').css({'height':tileWidth+'px'});
	//Vertical center for special tiles, 3 lines
	$('.tile').css({'line-height':(tileWidth/3)+'px'});
	//Vertical center for filled and start tiles, 1 line
	$('.tile.filled').css({'line-height':tileWidth+'px'});
	$('.tile.start').css({'line-height':tileWidth+'px'});
	//Set the new font size size
	$('.board').css({'font-size':($('.tile').width()/4)+'px'});
}



function checkResizeTimeout() {
	//No need to clear the timer
	if (isWidthTimeoutSet === 0) {
		isWidthTimeoutSet = 1;
		widthTimer = setTimeout(resizeTiles, 400);
	} else {
		clearTimeout(widthTimer);
		widthTimer = setTimeout(resizeTiles, 400);
	}
}

function initializeBoard() {
	for (rows in boardTiles) {
		console.log("r: %s",boardTiles[rows][0]);
		for (i=1; i<16; i++) {
			if (boardTiles[rows][i] === 0) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile\"></div>");
			} else if (boardTiles[rows][i] === 1) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile start\">&#9733;</div>");
			} else if (boardTiles[rows][i] === 2) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile l2\">Double<br>letter<br>score</div>");
			} else if (boardTiles[rows][i] === 3) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile l3\">Triple<br>letter<br>score</div>");
			} else if (boardTiles[rows][i] === 6) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile w2\">Double<br>word<br>score</div>");
			} else if (boardTiles[rows][i] === 9) {
				$(boardTiles[rows][0])
					.append("<div class=\"tile w3\">Triple<br>word<br>score</div>");
			} else {
				$(boardTiles[rows][0])
					.append("<div class=\"tile\"></div>");
			}
		}
	}
	//Resize when generation is complete.
	resizeTiles();
}

initializeBoard();

//Call checkResizeTimeout on a window reset.
$(window).resize(checkResizeTimeout);