//drawing functions
function drawAll(){
	colorRect("white", 0, 0, canvas.width, canvas.height);//clear screen
	if(inSurvivalMode && inGameOverScreen == false){
		colorText("black", "HP: " + player.health, "35px Arial", "right", canvas.width - 10, 40);
	}
	if(inStoryMode && inGameOverScreen == false){
		colorText("black", "HP: " + player.health, "35px Arial", "right", canvas.width - 10, 80);
	}
	if(inStoryMode){
		colorText("black", "Stage: " + currentStage, "35px Arial", "right", canvas.width - 10, 40);
	}
	if(player.shotgunAmmo > 0){
		colorText("black", "Shotgun Ammo: " + player.shotgunAmmo, "30px Arial", "left", 10, 80);
	}
	if(player.nukeShotAmmo > 0){
		colorText("black", "Nuke Ammo: " + player.nukeShotAmmo, "30px Arial", "left", 10, 120);
	}
	if(inSurvivalMode){
		colorText("black", "Balls Blasted: " + survivalEnemiesKilled, "30px Arial", "center", canvas.width/2, 40);
	}
	colorText("black", "Special: " + player.specialPoints, "30px Arial", "left", 10, 40);
	drawEnemies();
	drawProjectiles();
	drawPlayer();
	drawHealthItems();
	drawShotgunAmmo();
	drawNukeAmmo();
}

function drawEnemies(){
	for(var key in enemiesOnScreen){
		var object = enemiesOnScreen[key];
		object.draw();
	}
}

function drawPlayer(){
	player.draw();
}

function drawProjectiles(){
	for(var key in projectilesOnScreen){
		var object = projectilesOnScreen[key];
		object.draw();
	}
}

function drawHealthItems(){
	for(var key in healthItemsOnScreen){
		var object = healthItemsOnScreen[key];
		object.draw();
	}
}

function drawShotgunAmmo(){
	for(var key in shotgunAmmoOnScreen){
		var object = shotgunAmmoOnScreen[key];
		object.draw();
	}
}

function drawNukeAmmo(){
	for(var key in nukeAmmoOnScreen){
		var object = nukeAmmoOnScreen[key];
		object.draw();
	}
}