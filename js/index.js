// JavaScript Document
function playSound(){
	document.getElementById("audio").play();
}
var times = [];
var deltaTime = 0;
var canvas, ctx;
var particles = [];
var stopAnimation = true;
window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	resize();
}
function visit(){
	createParticles();
	document.getElementById("audio-2").src = "oof.mp3";
	document.getElementById("audio-2").play();
	setTimeout(function(){
		document.getElementById("audio-2").src = "damage.mp3";
		document.getElementById("audio-2").play();
	}, 300);
	requestAnimationFrame(draw);
	setTimeout(function(){
		stopAnimation = true;
	}, 6000);
}
function Particle(x, y, velX, velY, color, sizeAddon){
	color = color || "black";
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = 6 + sizeAddon;
	this.update = function(){
		if(this.size < 0) return;
		this.x += this.velX * deltaTime;
		this.y += this.velY * deltaTime;
		this.size -= deltaTime * 1.5;
	}
	this.draw = function(){
		if(this.size < 0) return;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.rect(this.x-this.size / 2,this.y-this.size / 2,this.size,this.size);
		//ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
		ctx.fill();
	}
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(times.length > 0)
		deltaTime = (new Date() - times[times.length - 1]) / 1000;
	times.push(new Date());
	while(new Date() - times[0] >= 1000){
		times.shift();
	}
	for(var x = 0; x < particles.length; x++){
		particles[x].update();
		particles[x].draw();
	}
	if(!stopAnimation) requestAnimationFrame(draw);
}
function createParticles(){
	document.getElementById("visit-button").style.display = "none";
	stopAnimation = false;
	var center = window.innerWidth * 0.2;
	var centerY = window.innerHeight * 0.1;
	for(var x = 0; x < 250; x++){
		var velX = Math.random() * 150;
		var velY = Math.random() * 150;
		var color = "black";
		if(Math.random() * 10 < 2) color = "red";
		if(Math.random() * 2 < 1) velX *= -1;
		if(Math.random() * 2 < 1) velY *= -1;
		particles.push(new Particle(center, centerY, velX, velY, color, Math.random() * 3));
	}
}
function resize(){
	canvas.width = window.innerWidth * 0.4;
	canvas.height = window.innerHeight * 0.2;
}