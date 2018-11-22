//object constructors
function createPlayer(){
	player.x = canvas.width/2 - 25;
	player.y = canvas.height - 100;
	player.xSpeed = 5;
	player.ySpeed = 0;
	player.width = 50;
	player.height = 100;
	player.color = "green";
	player.specialColor = "blue";
	player.health = 10;
	player.canShoot = true;
	player.waitingToShoot = false;
	player.shootDelay = 1000;
	player.onGround = true;
	player.shotgunAmmo = 0;
	player.nukeShotAmmo = 0;
	player.specialPoints = 120;
	player.usingSpecial = false;
	player.draw = function(){
		if(holdingSpecial && player.specialPoints > 0){
			player.specialPoints--;
			player.usingSpecial = true;
			colorRect(player.specialColor, player.x, player.y, player.width, player.height);
		}
		else{
			colorRect(player.color, player.x, player.y, player.width, player.height);
			player.usingSpecial = false;
		}
		if(holdingSpecial == false && player.specialPoints < 120){
			player.specialPoints += 1;
		}

	}
	player.move = function(){
		if(player.y > canvas.height - player.height + 5){
			player.y = canvas.height - player.height;
			player.onGround = true;
		}
		if(player.onGround == false){
			player.ySpeed += 0.6;
		}
		if(player.onGround){
			player.ySpeed = 0;
		}
		player.y += player.ySpeed;
		if(holdingLeft == true){
			player.x -= player.xSpeed;
		} else if(holdingRight == true){
			player.x += player.xSpeed;
		}
		if(player.x + player.width >= canvas.width){
			player.x = canvas.width - player.width;
		}
		if(player.x <= 0){
			player.x = 0;
		}
	}
	player.shoot = function(){
		if(player.canShoot){
			newBasicShot(player.x + player.width/2, player.y);
			totalShots++;
		}
		player.canShoot = false;
		if(player.waitingToShoot == false){
			setTimeout(waitToShoot, player.shootDelay);
			player.waitingToShoot = true;
		}
	}
	player.shootShotgun = function(){
		if(player.shotgunAmmo > 0){
			player.shotgunAmmo--;
			newShotgunShot();
			totalShots += 5;
		}
	}
	player.shootNuke = function(){
		if(player.nukeShotAmmo > 0){
			player.nukeShotAmmo--;
			newNukeShot();
			totalShots += 30;
		}
	}
	player.jump = function(){
		if(player.onGround){
			player.onGround = false;
			player.ySpeed -= 15;
			totaljumps++;
		}
	}
}

function newNormalSurvivalEnemy(){
	var enemy = {
		x: Math.random() * (canvas.width - 35) + 35,
		y: canvas.height/4 + 50,
		xSpeed:Math.random() * 5 + 1,
		ySpeed:-2,
		radius: 30,
		color: "red",
		isDead: false,
		draw(){
			if(enemy.isDead == false){
				colorCircle(enemy.color, enemy.radius, enemy.x, enemy.y);
			}
		},
		move(){
			enemy.x += enemy.xSpeed;
			enemy.y += enemy.ySpeed;
			enemy.ySpeed += 0.1;
			if(enemy.x + enemy.radius >= canvas.width) {enemy.x = canvas.width - enemy.radius; enemy.xSpeed *= -1;}
			if(enemy.x - enemy.radius <= 0)            {enemy.x = 0 + enemy.radius; enemy.xSpeed *= -1;}
			if(enemy.y + enemy.radius >= canvas.height){enemy.ySpeed *= -1;}
			if(enemy.y - enemy.radius <= 0)            {enemy.ySpeed *= -1;}
			if(enemy.y <= canvas.height/4){y = canvas.height/4;}
		},
		collide(){
			if(enemy.isDead == false){
				if(enemy.y + enemy.radius > player.y && enemy.y - enemy.radius < player.y + player.height && enemy.x + enemy.radius > player.x && enemy.x - enemy.radius < player.x + player.width && player.usingSpecial == false){
				player.health -= 1;
				}
				for(var i = 0; i < projectilesOnScreen.length; i++){
					var dx = enemy.x - projectilesOnScreen[i].x;
					var dy = enemy.y - projectilesOnScreen[i].y;
					var dist = Math.sqrt(dx*dx + dy*dy);
					if(dist < enemy.radius){
						survivalEnemiesKilled++;
						totalKills++;
						enemy.isDead = true;
						if(enemy.xSpeed < 0){
							newSmallEnemy(enemy.x - 50, enemy.y - 50, enemy.xSpeed);
							newSmallEnemy(enemy.x + 50, enemy.y - 50, -enemy.xSpeed);
						}else if(enemy.xSpeed > 0){
							newSmallEnemy(enemy.x - 50, enemy.y - 50, -enemy.xSpeed);
							newSmallEnemy(enemy.x + 50, enemy.y - 50, enemy.xSpeed);
						}
						break;
					}
				}
			}
		}
	};
	enemiesOnScreen.push(enemy);
}

function newNormalFastEnemy(x, y, xSpeed){
	var enemy = {
		x:x,
		y:y,
		xSpeed:xSpeed,
		ySpeed:0,
		radius: 30,
		color: "red",
		isDead: false,
		draw(){
			if(enemy.isDead == false){
				colorCircle(enemy.color, enemy.radius, x, y);
			}
		},
		move(){
			x += xSpeed;
			y += enemy.ySpeed;
			enemy.ySpeed += 0.1;
			if(x + enemy.radius >= canvas.width) {x = canvas.width - enemy.radius; xSpeed *= -1;}
			if(x - enemy.radius <= 0)            {x = 0 + enemy.radius; xSpeed *= -1;}
			if(y + enemy.radius >= canvas.height){enemy.ySpeed *= -1;}
			if(y - enemy.radius <= 0)            {enemy.ySpeed *= -1;}
			if(y <= canvas.height/4){y = canvas.height/4;}
		},
		collide(){
			if(enemy.isDead == false){
				if(y + enemy.radius > player.y && y - enemy.radius < player.y + player.height && x + enemy.radius > player.x && x - enemy.radius < player.x + player.width && player.usingSpecial == false){
				player.health -= 1;
				}
				for(var i = 0; i < projectilesOnScreen.length; i++){
					var dx = x - projectilesOnScreen[i].x;
					var dy = y - projectilesOnScreen[i].y;
					var dist = Math.sqrt(dx*dx + dy*dy);
					if(dist < enemy.radius){
						enemiesRemaining--;
						totalKills++;
						enemy.isDead = true;
						if(enemy.xSpeed < 0){
							newSmallEnemy(x - 50, y - 50, enemy.xSpeed*1.5);
							newSmallEnemy(x + 50, y - 50, -enemy.xSpeed*1.5);
						}else if(enemy.xSpeed > 0){
							newSmallEnemy(x - 50, y - 50, -enemy.xSpeed*1.5);
							newSmallEnemy(x + 50, y - 50, enemy.xSpeed*1.5);
						}
						break;
					}
				}
			}
		}
	};
	enemiesOnScreen.push(enemy);
}

function newLargeEnemy(x, y, xSpeed){
	var enemy = {
		x:x,
		y:y,
		xSpeed:xSpeed,
		ySpeed:0,
		radius: 100,
		color: "red",
		isDead: false,
		draw(){
			if(enemy.isDead == false){
				colorCircle(enemy.color, enemy.radius, x, y);
			}
		},
		move(){
			x += xSpeed;
			y += enemy.ySpeed;
			enemy.ySpeed += 0.1;
			if(x + enemy.radius >= canvas.width) {x = canvas.width - enemy.radius; xSpeed *= -1;}
			if(x - enemy.radius <= 0)            {x = 0 + enemy.radius; xSpeed *= -1;}
			if(y + enemy.radius >= canvas.height){enemy.ySpeed *= -1;}
			if(y - enemy.radius <= 0)            {enemy.ySpeed *= -1;}
			if(y <= canvas.height/4){y = canvas.height/4;}
		},
		collide(){
			if(enemy.isDead == false){
				if(y + enemy.radius/2 + 20 > player.y && y - enemy.radius/2 - 20 < player.y + player.height && x + enemy.radius/2 + 20 > player.x && x - enemy.radius/2 - 20 < player.x + player.width && player.usingSpecial == false){
				player.health -= 1;
				}
				for(var i = 0; i < projectilesOnScreen.length; i++){
					var dx = x - projectilesOnScreen[i].x;
					var dy = y - projectilesOnScreen[i].y;
					var dist = Math.sqrt(dx*dx + dy*dy);
					if(dist < enemy.radius){
						enemiesRemaining--;
						totalKills++;
						enemy.isDead = true;
						if(enemy.xSpeed < 0){
							newNormalEnemy(x - 50, y - 50, enemy.xSpeed);
							newNormalEnemy(x + 50, y - 50, -enemy.xSpeed);
						}else if(enemy.xSpeed > 0){
							newNormalEnemy(x - 50, y - 50, -enemy.xSpeed);
							newNormalEnemy(x + 50, y - 50, enemy.xSpeed);
						}
						break;
					}
				}
			}
		}
	};
	enemiesOnScreen.push(enemy);
}

function newNormalEnemy(x, y, xSpeed){
	var enemy = {
		x:x,
		y:y,
		xSpeed:xSpeed,
		ySpeed:0,
		radius: 30,
		color: "red",
		isDead: false,
		draw(){
			if(enemy.isDead == false){
				colorCircle(enemy.color, enemy.radius, x, y);
			}
		},
		move(){
			x += xSpeed;
			y += enemy.ySpeed;
			enemy.ySpeed += 0.1;
			if(x + enemy.radius >= canvas.width) {x = canvas.width - enemy.radius; xSpeed *= -1;}
			if(x - enemy.radius <= 0)            {x = 0 + enemy.radius; xSpeed *= -1;}
			if(y + enemy.radius >= canvas.height){enemy.ySpeed *= -1;}
			if(y - enemy.radius <= 0)            {enemy.ySpeed *= -1;}
			if(y <= canvas.height/4){y = canvas.height/4;}
		},
		collide(){
			if(enemy.isDead == false){
				if(y + enemy.radius > player.y && y - enemy.radius < player.y + player.height && x + enemy.radius > player.x && x - enemy.radius < player.x + player.width && player.usingSpecial == false){
				player.health -= 1;
				}
				for(var i = 0; i < projectilesOnScreen.length; i++){
					var dx = x - projectilesOnScreen[i].x;
					var dy = y - projectilesOnScreen[i].y;
					var dist = Math.sqrt(dx*dx + dy*dy);
					if(dist < enemy.radius){
						enemiesRemaining--;
						totalKills++;
						enemy.isDead = true;
						if(enemy.xSpeed < 0){
							newSmallEnemy(x - 50, y - 50, enemy.xSpeed);
							newSmallEnemy(x + 50, y - 50, -enemy.xSpeed);
						}else if(enemy.xSpeed > 0){
							newSmallEnemy(x - 50, y - 50, -enemy.xSpeed);
							newSmallEnemy(x + 50, y - 50, enemy.xSpeed);
						}
						break;
					}
				}
			}
		}
	};
	enemiesOnScreen.push(enemy);
}

function newSmallEnemy(x, y, xSpeed){
	var enemy = {
		x:x,
		y:y,
		xSpeed:xSpeed,
		ySpeed:0,
		radius: 15,
		color: "red",
		isDead: false,
		draw(){
			if(enemy.isDead == false){
				colorCircle(enemy.color, enemy.radius, x, y);
			}
		},
		move(){
			x += enemy.xSpeed;
			y += enemy.ySpeed;
			enemy.ySpeed += 0.1;
			if(x + enemy.radius >= canvas.width) {x = canvas.width - enemy.radius; enemy.xSpeed *= -1;}
			if(x - enemy.radius <= 0)            {x = 0 + enemy.radius; enemy.xSpeed *= -1;}
			if(y + enemy.radius >= canvas.height){enemy.ySpeed *= -1;}
			if(y - enemy.radius <= 0)            {enemy.ySpeed *= -1;}
			if(y <= canvas.height/4){y = canvas.height/4;}
		},
		collide(){
			if(enemy.isDead == false){
				if(y + enemy.radius > player.y && y - enemy.radius < player.y + player.height && x + enemy.radius > player.x && x - enemy.radius < player.x + player.width && player.usingSpecial == false){
				player.health -= 1;
				}
				for(var i = 0; i < projectilesOnScreen.length; i++){
					var dx = x - projectilesOnScreen[i].x;
					var dy = y - projectilesOnScreen[i].y;
					var dist = Math.sqrt(dx*dx + dy*dy);
					if(dist < enemy.radius){
						if(inSurvivalMode){
							survivalEnemiesKilled++;
						}
						if(inStoryMode){
							enemiesRemaining--;
						}
						enemy.isDead = true;
						totalKills++;
						break;
					}
				}
			}
		}
	};

	enemiesOnScreen.push(enemy);
}

function newBasicShot(x, y){
	var shot = {
		x:x,
		y:y,
		xSpeed: 0,
		ySpeed: 10,
		width: 5,
		height: 20,
		color: "blue",
		draw(){
			colorRect(shot.color, shot.x, shot.y, shot.width, shot.height);
		},
		move(){
			shot.y -= shot.ySpeed;
		}
	};
	projectilesOnScreen.push(shot);
}

function newShotgunShot(){
	newBasicShot(player.x + player.width/2 - 60, player.y);
	newBasicShot(player.x + player.width/2 - 30, player.y);
	newBasicShot(player.x + player.width/2, player.y);
	newBasicShot(player.x + player.width/2 + 30, player.y);
	newBasicShot(player.x + player.width/2 + 60, player.y);
}

function newNukeShot(){
	for(var i = 20; i < canvas.width; i+=20){
		newBasicShot(i, canvas.height);
	}
}

function newHealthItem(){
	var health = {
		x: Math.random() * (canvas.width - 10) + 10,
		y: canvas.height - 60,
		width: 10,
		height: 10,
		color: "green",
		isPickedUp: false,
		draw(){
			if(health.isPickedUp == false){
				colorRect(health.color, health.x, health.y, health.width, health.height);
			}
		},
		collide(){
			if(health.isPickedUp == false){
				if(player.x < health.x + health.width && player.x + player.width > health.x){
					health.isPickedUp = true;
					player.health += 10;
				}
			}
		}
	};
	healthItemsOnScreen.push(health);
}

function newShotgunAmmo(){
	var ammo = {
		x: Math.random() * (canvas.width - 10) + 10,
		y: canvas.height - 60,
		width: 10,
		height: 20,
		color: "blue",
		isPickedUp: false,
		draw(){
			if(ammo.isPickedUp == false){
				colorRect(ammo.color, ammo.x, ammo.y, ammo.width, ammo.height);
			}
		},
		collide(){
			if(ammo.isPickedUp == false){
				if(player.x < ammo.x + ammo.width && player.x + player.width > ammo.x){
					ammo.isPickedUp = true;
					player.shotgunAmmo += 2;
				}
			}
		}
	};
	shotgunAmmoOnScreen.push(ammo);
}

function newNukeAmmo(){
	var ammo = {
		x: Math.random() * (canvas.width - 10) + 10,
		y: canvas.height - 60,
		width: 20,
		height: 30,
		color: "red",
		isPickedUp: false,
		draw(){
			if(ammo.isPickedUp == false){
				colorRect(ammo.color, ammo.x, ammo.y, ammo.width, ammo.height);
			}
		},
		collide(){
			if(ammo.isPickedUp == false){
				if(player.x < ammo.x + ammo.width && player.x + player.width > ammo.x){
					ammo.isPickedUp = true;
					player.nukeShotAmmo += 1;
				}
			}
		}
	};
	nukeAmmoOnScreen.push(ammo);
}