//Game progression
var enemiesRemaining = 0;
var survivalEnemiesKilled = 0;
var currentStage = 1;
var healthTimer = 0;
var enemyTimer = 0;
var shotgunTimer = 0;

//stages loaded vars
var stageOneLoaded = false;
var stageTwoLoaded = false;
var stageThreeLoaded = false;
var stageFourLoaded = false;
var stageFiveLoaded = false;
var stageSixLoaded = false;
var stageSevenLoaded = false;
var stageEightLoaded = false;
var stageNineLoaded = false;
var stageTenLoaded = false;

//survival nuke ammo vars
var firstNukeAmmoSpawned = false;
var secondNukeAmmoSpawned = false;
var thirdNukeAmmoSpawned = false;
var fourthNukeAmmoSpawned = false;


function gameProgressionStory(){

	if(stageOneLoaded == false){
		setUpStageOne();
	}
	if(enemiesRemaining == 0 && stageTwoLoaded == false){
		setUpStageTwo();
	}
	if(enemiesRemaining == 0 && stageThreeLoaded == false){
		setUpStageThree();
	}
	if(enemiesRemaining == 0 && stageFourLoaded == false){
		setUpStageFour();
	}
	if(enemiesRemaining == 0 && stageFiveLoaded == false){
		setUpStageFive();
	}
	if(enemiesRemaining == 0 && stageSixLoaded == false){
		setUpStageSix();
	}
	if(enemiesRemaining == 0 && stageSevenLoaded == false){
		setUpStageSeven();
	}
	if(enemiesRemaining == 0 && stageEightLoaded == false){
		setUpStageEight();
	}
	if(enemiesRemaining == 0 && stageNineLoaded == false){
		setUpStageNine();
	}
	if(enemiesRemaining == 0 && stageTenLoaded == false){
		setUpStageTen();
	}
}

function gameProgressionSurvival(){
	enemyTimer++;
	healthTimer++;
	shotgunTimer++;
	//spawning health
	if(healthTimer >= 1200){
		healthTimer = 0;
		newHealthItem();
	}
	//spawning shotgun ammo
	if(shotgunTimer >= 600){
		shotgunTimer = 0;
		newShotgunAmmo();
	}
	//spawning nukes
	if(survivalEnemiesKilled == 10 && firstNukeAmmoSpawned == false){
		newNukeAmmo();
		firstNukeAmmoSpawned = true;
	}
	if(survivalEnemiesKilled == 50 && secondNukeAmmoSpawned == false){
		newNukeAmmo();
		secondNukeAmmoSpawned = true;
	}
	if(survivalEnemiesKilled == 80 && thirdNukeAmmoSpawned == false){
		newNukeAmmo();
		thirdNukeAmmoSpawned = true;
	}
	if(survivalEnemiesKilled == 150 && fourthNukeAmmoSpawned == false){
		newNukeAmmo();
		fourthNukeAmmoSpawned = true;
	}
	//spawning enemies
	if(survivalEnemiesKilled < 15){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 15 && survivalEnemiesKilled < 30){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 30 && survivalEnemiesKilled < 50){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 50 && survivalEnemiesKilled < 100){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 100 && survivalEnemiesKilled < 150){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newLargeEnemy(canvas.width/2, canvas.height/2, 3); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 100 && survivalEnemiesKilled < 150){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newLargeEnemy(canvas.width/2, canvas.height/2, -3); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 150 && survivalEnemiesKilled < 300){
		if(enemyTimer >= 300){
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newNormalSurvivalEnemy(); 
			newLargeEnemy(canvas.width/2, canvas.height/2, -3);
			newLargeEnemy(canvas.width/2, canvas.height/2, -5); 
			enemyTimer = 0;
		}
	}
	if(survivalEnemiesKilled >= 300){
		inSurvivalModeWinScreen = true;
		beatenSurvival = true;
	}
}

function resetGame(){
	inGameOverScreen = false;
	inStoryMode = false;
	inSurvivalMode = false;
	inStoryModeWinScreen = false;
	inSurvivalModeWinScreen = false;
	inMainMenu = true;
	stageOneLoaded = false;
	stageTwoLoaded = false;
	stageThreeLoaded = false;
	stageFourLoaded = false;
	stageFiveLoaded = false;
	stageSixLoaded = false;
	stageSevenLoaded = false;
	stageEightLoaded = false;
	stageNineLoaded = false;
	stageTenLoaded = false;
	currentStage = 1;
	healthTimer = 0;
	enemyTimer = 0;
	shotgunTimer = 0;
	survivalEnemiesKilled = 0;
	firstNukeAmmoSpawned = false;
	secondNukeAmmoSpawned = false;
	thirdNukeAmmoSpawned = false;
	fourthNukeAmmoSpawned = false;
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	player = {};
	createPlayer();
}

function setUpStageOne(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageOneLoaded = true;
	enemiesRemaining = 3;
	newNormalEnemy(canvas.width/2, canvas.height/4, 2);
}

function setUpStageTwo(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageTwoLoaded = true;
	currentStage++;
	enemiesRemaining = 6;
	newNormalEnemy(canvas.width/4, canvas.height/4, -2);
	newNormalEnemy(canvas.width - 50, canvas.height/4, 2);
	newHealthItem();
	newHealthItem();
}

function setUpStageThree(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageThreeLoaded = true;
	currentStage++;
	enemiesRemaining = 9;
	newNormalEnemy(canvas.width - 31, canvas.height/2, 3);
	newNormalEnemy(31, canvas.height/2, 3);
	newNormalEnemy(canvas.width/2, canvas.height/4, 3);
	newHealthItem();
}

function setUpStageFour(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageFourLoaded = true;
	currentStage++;
	enemiesRemaining = 7;
	newLargeEnemy(canvas.width/4, canvas.height/4, -1);
	newHealthItem();
	newShotgunAmmo();
}

function setUpStageFive(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageFiveLoaded = true;
	currentStage++;
	enemiesRemaining = 13;
	newLargeEnemy(canvas.width - 50, canvas.height/4, -3);
	newNormalEnemy(canvas.width/2, canvas.height/4, 0.5);
	newNormalEnemy(canvas.width/2, canvas.height/4, -5);
	newHealthItem();
}

function setUpStageSix(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageSixLoaded = true;
	currentStage++;
	enemiesRemaining = 3;
	newNormalFastEnemy(40, canvas.height - 300, 5);
	newHealthItem();
	newShotgunAmmo();
}

function setUpStageSeven(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageSevenLoaded = true;
	currentStage++;
	enemiesRemaining = 6;
	newNormalFastEnemy(40, canvas.height - 300, 5);
	newNormalFastEnemy(canvas.width - 40, canvas.height - 300, -5);
	newHealthItem();
}

function setUpStageEight(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageEightLoaded = true;
	currentStage++;
	enemiesRemaining = 12;
	newNormalFastEnemy(canvas.width - 40, canvas.height - 300, -5);
	newNormalFastEnemy(50, canvas.height/4, 6);
	newNormalEnemy(canvas.width/2, canvas.height/4, 5);
	newNormalEnemy(canvas.width/2, canvas.height/4, -5);
	newHealthItem();
	newHealthItem();
	newShotgunAmmo();
}

function setUpStageNine(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageNineLoaded = true;
	currentStage++;
	enemiesRemaining = 20;
	newNormalFastEnemy(canvas.width - 40, canvas.height - 300, -1);
	newNormalFastEnemy(50, canvas.height/4, 1);
	newLargeEnemy(canvas.width/2, canvas.height/4, 1);
	newLargeEnemy(canvas.width/4, canvas.height/2, -2);
	newHealthItem();
	newHealthItem();
}

function setUpStageTen(){
	projectilesOnScreen = [];
	enemiesOnScreen = [];
	healthItemsOnScreen = [];
	shotgunAmmoOnScreen = [];
	nukeAmmoOnScreen = [];
	stageTenLoaded = true;
	currentStage++;
	enemiesRemaining = 19;
	newNormalEnemy(canvas.width/4 + canvas.width/4, canvas.height/4, 3);
	newNormalEnemy(canvas.width/4, canvas.height/4, -3);
	newNormalFastEnemy(canvas.width/2, canvas.height/2 - 20, 5);
	newNormalFastEnemy(canvas.width/2, canvas.height/2 + 20, -5);
	newLargeEnemy(canvas.width/2, canvas.height/3, 8);
	newHealthItem();
	newHealthItem();
	newShotgunAmmo();
}