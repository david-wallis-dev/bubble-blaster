//Utility functions
var canvas;
var canvasContext;
var framesPerSecond = 60;

function colorRect(color, x, y, width, height){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function colorCircle(color, radius, x, y){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0,Math.PI*2);
	canvasContext.fill();
	canvasContext.stroke();
}

function colorText(color, text, font, alignment, x, y){
	canvasContext.fillStyle = color;
	canvasContext.font = font;
	canvasContext.textAlign = alignment;
	canvasContext.fillText(text, x, y);
}

function getCanvas(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
}

function onScreen(){
	console.log(enemiesOnScreen);
}