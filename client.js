var pieces = [];
var sSelected = false;
var xSelected;
var ySelected;
var turn = 0;
var redScore = 0;
var cyanScore = 0;

function setup(){
  createCanvas(400,400);
  background(200);
	createPieces();
}

function draw(){
  var rows = 0
  var firstColor = 'black'
  var secondColor = 'white'
  while(rows < 8) {
    if ( rows % 2 == 0 ) {
      firstColor = 'white'
      secondColor = 'black'
    } else {
      firstColor = 'black'
      secondColor = 'white'      
    }
    var cols = 0
    while(cols < 8){
      if (cols % 2 == 0) {
        fill(firstColor)
      } else {
        fill(secondColor)
      }
      rect(cols * 50, rows * 50, 50, 50)
      cols = cols + 1      
    }    
    rows = rows + 1
  }
	
	pieces.forEach(row => {
		row.forEach(piece => {
			if (piece == null) return;
			if (piece.selected) {
				fill(piece.color);
				rect(piece.x, piece.y, 50, 50);
			}
			fill(piece.color);
			circle(piece.x + 25, piece.y + 25, 50);
		});
	});
}

function createPieces() {
	for (let i = 0; i < 8; i++) {
		pieces[i] = [];
		for (let j = 0; j < 8; j++) {
			pieces[i][j] = null;
			if ((i + j) % 2 == 1) {
				if (j < 3) {
					pieces[i][j] = {
						"x": i * 50,
						"y": j * 50,
						"color": "red",
						"isKing": false,
						"selected": false
					};
				}
				if (j > 4) {
					pieces[i][j] = {
						"x": i * 50,
						"y": j * 50,
						"color": "cyan",
						"isKing": false,
						"selected": false
					};
				}
			}
		}
		console.log(pieces[i]);
	}
}

function legalMove(oldX, oldY, newX, newY) {
	if ((oldX - newX == 1 || oldX - newX == -1) && (oldY - newY == 1 || oldY - newY == -1)) {
		refreshText();
		return true;
	}
	else if ((oldX - newX == 2 || oldX - newX == -2) && (oldY - newY == 2 || oldY - newY == -2)) {
		if ((pieces[(oldX + newX) / 2][(oldY + newY) / 2].color == "red" && turn % 2 == 0) || (pieces[(oldX + newX) / 2][(oldY + newY) / 2].color == "cyan" && turn % 2 == 1)) {
			pieces[(oldX + newX) / 2][(oldY + newY) / 2] = null;
			if (turn % 2 == 0) cyanScore++;
			else {
				redScore++;
			}
			refreshText();
			return true;
		}
		else return false;
	}
}

function refreshText() {
	console.log("text");
	if (turn % 2 == 0) $("#playersTurn").text("It is the red player's turn");
	else $("#playersTurn").text("It is the cyan player's turn");
  $("#redScore").text("Red's Score: " + redScore);
  $("#cyanScore").text("Cyan's Score: " + cyanScore);
}

function mousePressed(event) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if ((mouseX > i * 50 && mouseX < (i + 1) * 50) && (mouseY > j * 50 && mouseY < (j + 1) * 50)) {
				if (sSelected) {
					if (pieces[i][j] == null && (i + j) % 2 == 1) {
						if (legalMove(xSelected, ySelected, i, j)) {
							pieces[i][j] = {
								"x": i * 50,
								"y": j * 50,
								"color": pieces[xSelected][ySelected].color,
								"isKing": pieces[xSelected][ySelected].isKing,
								"selected": pieces[xSelected][ySelected].selected
							};
							pieces[xSelected][ySelected] = null;
							pieces[i][j].selected = false;
							sSelected = false;
						}
					}
					else {
						if (i == xSelected && j == ySelected) {
							pieces[i][j].selected = false;
							sSelected = false;
							turn++;
						}
					}
				}
				else {
					if (pieces[i][j] != null) {
						if ((pieces[i][j].color == "red" && turn % 2 == 0) || (pieces[i][j].color == "cyan" && turn % 2 == 1)) {
							pieces[i][j].selected = true;
							sSelected = true;
							xSelected = i;
							ySelected = j;
							turn++;
						}
					}
				}
				console.log("Clicked: " + pieces[i][j]);
				console.log(pieces[i][j]);
			}
		}
	}
}
