var canv = document.getElementById("canvas"),
	ctx  = canv.getContext('2d'),

	opts = {
		size: 20,
	},
	timer;

canv.width = window.innerWidth-window.innerWidth%opts.size;
canv.height = window.innerHeight-window.innerHeight%opts.size;
ctx.fillStyle = opts.bodyColor;

function apple() {
	ctx.fillStyle = opts.aplColor;
	pos.aplX = Math.floor(Math.random()*canv.width);
	pos.aplX-=pos.aplX%opts.size;
	pos.aplY = Math.floor(Math.random()*canv.height);
	pos.aplY-=pos.aplY%opts.size;
	bodyX.unshift(pos.x);
	bodyY.unshift(pos.y);
	opts.score++;
};

function check(){
	let a = 0;
	bodyX.forEach(function (X) {
		if (pos.x==X && pos.y == bodyY[a]){
			end();
		};
		a++
	});
}

function body(){
	let a = 0;
	bodyX.forEach(function (X) {
		ctx.fillRect(X+1,bodyY[a]+1,opts.bodySize,opts.bodySize);	
		a++;
	});
	bodyX.unshift(pos.x);
	bodyX.pop();
	bodyY.unshift(pos.y);
	bodyY.pop();
	if (pos.x==pos.aplX && pos.y==pos.aplY){
		apple();
	};
};

function keyChange(e){
	switch(e.keyCode){
		case 37:
			if (opts.key !=3){
				opts.key = 1
			};
			break;
		case 38:
			if (opts.key !=2){
				opts.key = 4
			};
			break;
		case 39:
			if (opts.key !=1){
				opts.key = 3
			};
			break;
		case 40:
			if (opts.key !=4){
				opts.key = 2
			};
			break;
		case 82:

			setup();
			break;
		case 65:
			apple();
			break;
	};
};
function setup(){
	if (timer != null){
		clearInterval(timer);
	};
	ctx.clearRect(0, 0, canv.width, canv.height);
	opts = {
		bodyColor: "orange",
		aplColor: "red",
		theme: "black",
		size: 20,
		bodySize: 18,
		key: 3,
		preKey: 3,
		score: -1,
		a: 0
	};
	pos = {
		x: 300,
		y: 200,
		aplX: 0,
		aplY: 0
	};
	timer = setInterval(move, 100);
	bodyX = [pos.x, pos.x-20];
	bodyY = [pos.y, pos.y];
	apple();
	ctx.fillStyle = opts.bodyColor;
	body();
};

setup();



function dead(){
	preDead();
	if (opts.a < 20){
		opts.a++;
		setTimeout(dead, 20);
		console.log(opts.a);
	} else {
	//появление кнопки меню и кнопки рестарта
	opts.a = 0;
	};
};
addEventListener("keydown", keyChange);

function move (){
	ctx.clearRect(0, 0, canv.width, canv.height);
	ctx.fillStyle = opts.aplColor;
	ctx.fillRect(pos.aplX,pos.aplY,opts.size,opts.size);
	ctx.fillStyle = opts.bodyColor;
	switch(opts.key){
		case 1:
			ctx.fillRect(pos.x-=opts.size,pos.y,opts.size,opts.size);
			break;
		case 2:
			ctx.fillRect(pos.x,pos.y+=opts.size,opts.size,opts.size);
			break;
		case 3:
			ctx.fillRect(pos.x+=opts.size,pos.y,opts.size,opts.size);
			break;
		case 4:
			ctx.fillRect(pos.x,pos.y-=opts.size,opts.size,opts.size);
			break;
	};
	check();
	body();
};


function preDead(){
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	ctx.fillStyle = opts.theme;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "italic 100pt Arial";
	ctx.shadowColor = "#f50";
    ctx.shadowOffsetX = 2000;
    ctx.shadowOffsetY = 2000;
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.shadowBlur = opts.a;
	ctx.fillText("Рекорд: "+opts.score, canv.width/2-2000, canv.height/2-2000);
};

function end(){
	clearInterval(timer);
	setTimeout(preDead, 1000);
	setTimeout(dead, 2000);
}