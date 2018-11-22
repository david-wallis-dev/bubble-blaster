//moving functions
function moveAll(){
	moveEnemies();
	movePlayer();
	moveProjectiles();
}

function moveEnemies(){
	for(var key in enemiesOnScreen){
		var object = enemiesOnScreen[key];
		object.move();
	}
}

function movePlayer(){
	player.move();
}

function moveProjectiles(){
	for(var i = 0; i < projectilesOnScreen.length; i++){
		projectilesOnScreen[i].move();
	}
}