var SuperMario = function(){
	this.speed = 0;          // 奔跑速度
	this.jumpHeight = 0;     // 弹跳高度
	this.stopped = false;    // 是否停止
	this.jumping = false;    // 正在跳动 
	this.vHeight = 0;        // 垂直高度
	this.distance = 0;       // 水平距离
	this.vSpeed = 0;         // 垂直初速度
	this.times = 0;
	this.body = {
		run: "",             // 运动图片
		stop: ""             // 停止图片
	}
	this.init();
};

SuperMario.prototype.init = function() {
	var self = this;
	self.create();
	self.addEvent();
};

SuperMario.prototype.addEvent = function(){
	var self = this;
	document.onkeydown = document.onkeypress = function(evt){
		switch (evt.keyCode) {
            case 37: // left
                self.speed = -SPEED;
                break;
            case 39: // right
            	self.speed = SPEED;	
                break;
            case 32: // space
            case 38: // up
                self.jumping = true;
                self.vSpeed = V_SPEED;
        }
	};

	document.onkeyup = function(evt){
		switch(evt.keyCode) {
			case 37:
			case 39:
				self.speed = 0;		
				break;
		}
	}
};

SuperMario.prototype.create = function() {
	var $mario = this.mario = document.getElementById("mario");
	if(!$mario) {
		$mario = this.mario = document.createElement("div");
		$mario.id = "mario";
		document.getElementById("screen").appendChild($mario);
	}
};

SuperMario.prototype.render = function() {
	this._jumpCheck();
	this._runCheck();
	this._foodCheck();
	// if(this.speed != 0) this.mario.style.background = this.body.run;
	if(this.jumping) {
		this.times++; 
		var deltaTime = INTERVAL / 1000 * this.times * 2;
		this.jumpHeight = this.vSpeed * deltaTime - 0.5 * G * Math.pow(deltaTime, 2);
		(function(self){
			if(!self.brickIndex) return;
			var bB = Brick.list[self.brickIndex].bottom;
			var tT = INTERVAL / 1000 * (self.times + 1) * 2;
			var jH = self.vSpeed * deltaTime - 0.5 * G * Math.pow(deltaTime, 2); 
			if(self.jumpHeight > bB && jH < bB) {
				self.jumpHeight = bB + 1
			}
			if(self.jumpHeight == bB){
				self.jumping = true;
			}
		})(this);
	} else {
		this.times = 0;
	}
	this.distance += this.speed * INTERVAL / 1000;
	this.mario.style.left = this.distance + "px";
	this.mario.style.bottom = this.jumpHeight + "px";

};

SuperMario.prototype._jumpCheck = function() {
	// brick
	if(this.hasJumpBrick()) {
		this.vSpeed = 0;
	}
	var marioHeight = this.mario.offsetHeight;
	if((this.jumpHeight < this.vHeight) && (this.jumpHeight + marioHeight > this.vHeight)) {
		this.jumpHeight = this.vHeight;
		this.jumping = false;
	}
	if((this.jumpHeight > this.vHeight) && (this.jumpHeight + marioHeight < this.vHeight)) {
		this.jumpHeight = 0;
		this.jumping = false;
	}
	if(this.jumpHeight < 0){
		this.jumpHeight = 0;
		this.jumping = false;
	}
};

SuperMario.prototype._runCheck = function() {
	if(this.distance < 0){
		this.distance = 0;
		this.stopRun();
	}
	if(this.hasRunBrick()) {
		this.speed = 0;
	}
	// hole
	return true;
};

SuperMario.prototype._foodCheck = function() {
	// food
	return true;
};

SuperMario.prototype.stopRun = function() {
	this.speed = 0;
	this.mario.style.background = this.body.stop;
};

SuperMario.prototype.hasJumpBrick = function(){
	var marioLeft = parseInt(this.mario.style.left || 0);
	var marioBottom = parseInt(this.mario.style.bottom || 0);
	var marioWidth = this.mario.offsetWidth;
	var marioHeight = this.mario.offsetHeight;
	for(var i = 0, len = Brick.list.length; i < len; i++){
		if((marioLeft + marioWidth >= Brick.list[i].left) && (marioLeft + marioWidth <= Brick.list[i].left + Brick.list[i].width)) {
			this.vHeight = Brick.list[i].bottom + BRICK_HEIGHT;
			break;
		}
	}
	for(var i = 1, len = Brick.list.length; i < len; i++){
		if((marioLeft + marioWidth >= Brick.list[i].left + Brick.list[i].width) && (marioLeft + marioWidth <= Brick.list[i+1].left)) {
			this.vHeight = 0;
		}
	}
};

SuperMario.prototype.hasRunBrick = function(){
	var marioLeft = parseInt(this.mario.style.left || 0);
	var marioBottom = parseInt(this.mario.style.bottom || 0);
	var marioWidth = this.mario.offsetWidth;
	var marioHeight = this.mario.offsetHeight;
	for(var i = 0, len = Brick.list.length; i < len; i++){
		if((marioLeft + marioWidth - Brick.list[i].left > 0) && (marioLeft + marioWidth - Brick.list[i].left <= 20) 
			&& (Brick.list[i].bottom >= marioBottom ) && (Brick.list[i].bottom <= marioBottom + marioHeight )) {
			this.mario.style.left = Brick.list[i].left - marioWidth + "px";
			this.stopRun();
			return;
		}
	}
}



