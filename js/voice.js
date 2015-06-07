var Voice = function(src, id) {
	this.src = src;
	this.id = id;
	Voice.getBox();
	this.render();
};

Voice.getBox = function(){
	var $box = document.getElementById("voiceBox");
	if(!$box.length) {
		var $box = document.createElement("div");
		$box.id = "voiceBox";
		document.body.appendChild($box);
	}
	Voice.$box = $box;
};

Voice.prototype.render = function(){
	var ele = this.ele = document.create("audio");
	ele.id = this.id;
	ele.src = this.src;
	Voice.$box.appendChild(ele);
};

Voice.prototype.start = function() {
	this.ele.play();
};

Voice.prototype.stop = function(){
	this.ele.pause();
};