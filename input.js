//input
var holdingLeft = false;
var holdingRight = false;
var holdingSpecial = false;

function keyPressed(evt){
	//console.log(evt.keyCode);
	//left and right movement
	if(evt.keyCode == 65){
		holdingLeft = true;
	}
	if(evt.keyCode == 68){
		holdingRight = true;
	}
	//shooting
	if(evt.keyCode == 32 && inMainMenu == false){
		player.shoot();
		evt.preventDefault();
	}
	if(evt.keyCode == 70 && inMainMenu == false){
		player.shootShotgun();
	}
	if(evt.keyCode == 82 && inMainMenu == false){
		player.shootNuke();
	}
	//jumping
	if(evt.keyCode == 87){
		player.jump();
	}
	//special ability
	if(evt.keyCode == 75 && player.specialPoints > 0){
		holdingSpecial = true;
	}
	//main menu controls
	if(evt.keyCode == 13 && inMainMenu == true){
		inMainMenu = false;
		inStoryMode = true;
	}
	if(evt.keyCode == 16 && inMainMenu == true){
		inMainMenu = false;
		inSurvivalMode = true;
	}
	//game over screen controls
	if(evt.keyCode == 13 && inGameOverScreen){
		resetGame();
	}
	//game mode win screen controls
	if(evt.keyCode == 13 && inStoryModeWinScreen){
		resetGame();
	}
	if(evt.keyCode == 13 && inSurvivalModeWinScreen){
		resetGame();
	}
}

function keyReleased(evt){
	//left and right movement
	if(evt.keyCode == 65 || evt.keyCode == 37){
		holdingLeft = false;
	}
	if(evt.keyCode == 68 || evt.keyCode == 39){
		holdingRight = false;
	}
	if(evt.keyCode == 75){
		holdingSpecial = false;
	}
}

function addInputListeners(){
	window.addEventListener("keydown", keyPressed);
	window.addEventListener("keyup", keyReleased);
}

function waitToShoot(){
	player.canShoot = true;
	player.waitingToShoot = false;
}