//On mousemove update mouse co-ordinates in relation to canvas
//On mousedown initiate mousemove to get co-ordinates. Remove mouse move on mouse up. Bind the mouse up to <body> in case user lets the mouse up outside of canvas.
//On mouseup draw brush at mouse co-ordinates but adjust so center of brush appears where mouse is. Can do that by taking half width from mouseX and half height from mouseY


$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	canvas.addEventListener("keydown", doKeyDown, true);

	var context = canvas.getContext("2d");
	
	var canvasW = canvas.width;
	var canvasH = canvas.height;
	
	var brushW = 10;
	var brushH = 10;
	
/* 	//Drawing with the mouse================
	$('#canvas').mousedown(function() {
		$('#canvas').mousemove(function(event) {
			
			//Just so I can see the co-ordinates in the console:
			var msg = "Mouse called at ";
			msg += event.pageX + ", " + event.pageY;
			console.log(msg);
			
			//Actual stuff:
			context.fillRect(event.pageX - 10, event.pageY - 83, brushW, brushH);
		});
	});
	
	$('body').mouseup(function() {
		$('#canvas').unbind('mousemove');
	});
	//================================= */
	
	//Drawing with the mouse version 2================
	$('#canvas').mousedown(function() {
		$('#canvas').mousemove(function(event) {
			
			//Just so I can see the co-ordinates in the console:
			var msg = "Mouse called at ";
			msg += event.pageX + ", " + event.pageY;
			console.log(msg);
			
			//Actual stuff:
			context.fillRect(event.pageX - 10, event.pageY - 83, brushW, brushH);
		});
	});
	
	$('body').mouseup(function() {
		$('#canvas').unbind('mousemove');
	});
	//=================================	
	
	
	//Changing colours============
	function doKeyDown(e) {	
		switch(e.keyCode) {
			case 49: //1 - black
				context.fillStyle = "black";
				break;
			case 50: //2 - red
				context.fillStyle = "red";
				break;	
			case 51: //3 - green
				context.fillStyle = "green";
				break;	
			case 52: //4 - blue
				context.fillStyle = "blue";
				break;	
			case 53: //5 - white
				context.fillStyle = "white";
				break;			
		}
	}
	//==============================
	
	//Adjusting the brush size with the slider
	$('#brushSize').change(function() {
		brushW = this.value;
		brushH = this.value;
		console.log(brushW, brushH);
	});

	function clearCanvas() {
		context.fillRect(x, y, box.w, box.h);
	}
	
});