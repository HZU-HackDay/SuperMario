var Game = function() {
	this.score = 0;          // 得分情况
	this.time = 0;           // 消耗时间
	this.start();
};

Game.prototype.start = function(){
	var self = this;
	self.createScreen();
	var mario = self.mario = new SuperMario();
	this.timer = setInterval(function(){
		self.render();
	}, INTERVAL);
};

Game.prototype.createScreen = function(){
	var $screen = this.$screen = document.getElementById("screen");
	var bricks = [[500, 100], [700, 50], [600, 70], [970, 90], [1100, 140], [1500, 80], [1550, 120], [1800, 30], [2000, 70]];
	for(var i = 0; i < bricks.length; i++){
		new Brick(bricks[i][0], bricks[i][1]);
	}
};

Game.prototype.over = function(){
	this.mario.vSpeed = 0;
	this.mario.speed = 0;
	this.mario.stopRun();
	clearInterval(this.timer);
};

Game.prototype.restart = function(){
	var self = this;
	this.mario.vSpeed = V_SPEED;
	this.mario.speed = SPEED;
	this.mario.died = false;
	this.timer = setTimeout(function(){
		self.mario.render();
	}, INTERVAL);
};

Game.prototype.render = function(){
	if(this.mario.died){
		this.over();
		return;
	}
	this.mario.render();
	if(this.mario.distance <= document.documentElement.clientWidth / 2) return;
	this.$screen.style.left = "-" + (this.mario.distance - document.documentElement.clientWidth / 2) + "px";
};
