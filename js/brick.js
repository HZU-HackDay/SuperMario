var Brick = function() {
	this.create.apply(this, arguments);
};

Brick.uid = 1;
Brick.list = [];

Brick.prototype.create = function(left, bottom){
	var $Brick = document.createElement("div");
	$Brick.className = "brick brick-" + Brick.uid;

	var width = Math.floor(Math.random() * BRICK_MIN_WIDTH) + (BRICK_MAX_WIDTH - BRICK_MIN_WIDTH);
	var bottom = bottom || Math.floor(Math.random() * BRICK_MIN_BOTTOM) + (BRICK_MAX_BOTTOM - BRICK_MIN_BOTTOM);
	var left = left || (Math.floor(Math.random() * BRICK_MIN_LEFT) + (BRICK_MAX_LEFT - BRICK_MIN_LEFT)) * Brick.uid;

	Brick.uid++

	Brick.list.push({
		left: left,
		width: width,
		bottom: bottom
	});

	$Brick.style.width = width + "px";
	$Brick.style.bottom = bottom + "px";
	$Brick.style.left = left + "px";
	$Brick.style.height = BRICK_HEIGHT + "px";

	var $screen = document.getElementById("screen")
	$screen.style.width = left + BRICK_MAX_LEFT;
	$screen.appendChild($Brick);
};