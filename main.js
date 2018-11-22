//You just added the player special ability to the input
//you now need to add it too everything else

var enemiesOnScreen = [];
var projectilesOnScreen = [];
var healthItemsOnScreen = [];
var shotgunAmmoOnScreen = [];
var nukeAmmoOnScreen = [];
var player = {};

//global stat vars
var totalShots = 0;
var totalKills = 0;
var totaljumps = 0;
var timesDied = 0;
var beatenStory = false;
var beatenSurvival = false;

//program state bools
var inMainMenu = true;
var inStoryMode = false;
var inSurvivalMode = false;
var inGameOverScreen = false;
var inStoryModeWinScreen = false;
var inSurvivalModeWinScreen = false;

//program start
window.onload = function(){
	getCanvas();
	createPlayer();
	addInputListeners();
	setInterval(update, 1000/framesPerSecond);
}

//main functions
function update(){
	if(inMainMenu){
		displayMainMenu();
	}
	if(inStoryMode && inGameOverScreen == false){
		gameProgressionStory();
		moveAll();
		drawAll();
		collisionCheck();
		statusCheck();
	}
	if(inSurvivalMode && inGameOverScreen == false){
		gameProgressionSurvival();
		moveAll();
		drawAll();
		collisionCheck();
		statusCheck();
	}
	if(inStoryMode && inGameOverScreen || inSurvivalMode && inGameOverScreen){
		displayGameOver();
	}
	if(inStoryMode && inGameOverScreen == false && inStoryModeWinScreen){
		displayStoryModeWinScreen();
	}
	if(inSurvivalMode && inGameOverScreen == false && inSurvivalModeWinScreen){
		displaySurvivalModeWinScreen();
	}
}

function collisionCheck(){
	for(var key in enemiesOnScreen){
		var enemy = enemiesOnScreen[key];
		enemy.collide();
	}
	for(var key in healthItemsOnScreen){
		var health = healthItemsOnScreen[key];
		health.collide();
	}
	for(var key in shotgunAmmoOnScreen){
		var ammo = shotgunAmmoOnScreen[key];
		ammo.collide();
	}
	for(var key in nukeAmmoOnScreen){
		var ammo = nukeAmmoOnScreen[key];
		ammo.collide();
	}
}

function statusCheck(){
	if(player.health <= 0){inGameOverScreen = true; timesDied++}
	if(enemiesRemaining == 0 && stageTenLoaded == true){
		inStoryModeWinScreen = true;
		beatenStory = true;
	}
}

function displayMainMenu(){
	colorRect("black", 0, 0, canvas.width, canvas.height);
	colorText("white", "Welcome to Ball Blaster!", "60px Arial", "center", canvas.width/2, canvas.height/4);
	colorText("white", "To play story mode press 'Enter'", "40px Arial", "center", canvas.width/2, canvas.height/2 + 30);
	colorText("white", "To play survival mode press 'Shift'", "40px Arial", "center", canvas.width/2, canvas.height/2 + 90);
	//stats
	colorText("white", "Statistics since last refresh...", "20px Arial", "left", 20, canvas.height - 140);
	colorText("white", "Total projectiles shot: " + totalShots, "15px Arial", "left", 20, canvas.height - 120);
	colorText("white", "Total balls blasted: " + totalKills, "15px Arial", "left", 20, canvas.height - 100);
	colorText("white", "Total times jumped: " + totaljumps, "15px Arial", "left", 20, canvas.height - 80);
	colorText("white", "Total deaths: " + timesDied, "15px Arial", "left", 20, canvas.height - 60);
	colorText("white", "Beaten Story Mode: " + beatenStory, "15px Arial", "left", 20, canvas.height - 40);
	colorText("white", "Beaten Survival Mode: " + beatenSurvival, "15px Arial", "left", 20, canvas.height - 20);
}

function displayGameOver(){
	colorRect("black", 0, 0, canvas.width, canvas.height);//clear screen
	colorText("white", "GAME OVER", "60px Arial", "center", canvas.width/2, canvas.height/2);
	colorText("white", "please press 'enter' to return to the main menu", "25px Arial", "center", canvas.width/2, canvas.height/2 + 50);
}

function displayStoryModeWinScreen(){
	colorRect("black", 0, 0, canvas.width, canvas.height);//clear screen
	colorText("white", "You beat Story Mode!", "50px Arial", "center", canvas.width/2, canvas.height/2);
	colorText("white", "please press 'enter' to return to the main menu", "25px Arial", "center", canvas.width/2, canvas.height/2 + 50);
}

function displaySurvivalModeWinScreen(){
	colorRect("black", 0, 0, canvas.width, canvas.height);//clear screen
	colorText("white", "You beat Survival Mode!", "50px Arial", "center", canvas.width/2, canvas.height/2);
	colorText("white", "please press 'enter' to return to the main menu", "25px Arial", "center", canvas.width/2, canvas.height/2 + 50);
}