// 创建画布

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d")
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var w = window;
requestAnimationFrame = w.requestAnimationFrame 
|| w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var main = function() {
	var now = Date.now();

	var delta = now - then;

	update(delta/1000);
	render();
	then = now;
	requestAnimationFrame(main);
}

//背景

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";


//英雄

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//怪兽

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//创建对象

var hero = {
	speed: 256,
	x: canvas.width/2,
	y: canvas.height/2
};

var monster = {};
var monstersCaught = 0;

// 处理输入
var keysDown = {}; //保存用户按下的键值keyCode

addEventListener("keydown", function(e){
	keysDown[e.keyCode]=true;
},false);

addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
},false);

//游戏结束后重置

var reset = function() {
	//hero.x = canvas.width/2;
	//hero.y = canvas.height/2;

	monster.x = 32 + (Math.random() * (canvas.width-64));
	monster.y = 32 + (Math.random() * (canvas.height-64));
};

// 更新对象

var update = function(modifier){
	// left,keyCode = 37
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
	}
	// up, keyCode = 38
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier;
	}
	// right, keyCode = 39
	if (39 in keysDown) {
		hero.x += hero.speed * modifier;
	}
	// down, keyCode = 40
	if (40 in keysDown) {
		hero.y += hero.speed * modifier;
	}

	// hero catches monster?
	if(
		hero.x<=(monster.x+31)
		&& monster.x<=(hero.x+31)
		&& hero.y<=(monster.y+32)
		&& monster.y<=(hero.y+32)
		){
		++monstersCaught;
		reset();
	}
}


//渲染物体
var render = function() {
	if(bgReady) {
		ctx.drawImage(bgImage,0,0);
	}
	if(heroReady){
		ctx.drawImage(heroImage,hero.x,hero.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}

	//score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins Caught "+ monstersCaught, 32,32);
}

var then = Date.now();
reset();
main();