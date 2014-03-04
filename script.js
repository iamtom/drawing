//On mousemove update mouse co-ordinates in relation to canvas
//On mousedown initiate mousemove to get co-ordinates. Remove mouse move on mouse up. Bind the mouse up to <body> in case user lets the mouse up outside of canvas.
//On mouseup draw brush at mouse co-ordinates but adjust so center of brush appears where mouse is. Can do that by taking half width from mouseX and half height from mouseY


$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	canvas.addEventListener('keydown', doKeyDown, true);

	var context = canvas.getContext("2d");
	
	//Line style
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.lineWidth = 5;
	context.strokeStyle = "black";
	
	//Keeps logs of mouse movements
	var logOfX = [];
	var logOfY = [];
	
	//Fill in the background
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//Drawing with the mouse
	$('#canvas').mousedown(function(event) {
		context.beginPath();
		logOfX.push(event.pageX);
		logOfY.push(event.pageY);
		$('#canvas').mousemove(function(event) {
	
			/* //Just so I can see the co-ordinates in the console:
			var msg = "Mouse called at ";
			msg += event.pageX + ", " + event.pageY;
			console.log(msg); */
		
			//Draw the lines:
			context.moveTo(logOfX[logOfX.length] -10, logOfY[logOfY.length] - 83);
			context.lineTo(event.pageX - 10, event.pageY - 83);
			context.stroke();
		
		});
	});
	
	$('body').mouseup(function() {
		$('#canvas').unbind('mousemove');
		logOfX = [];
		logOfY = [];
	});	
	
	
	//Changing colours
	function doKeyDown(e) {	
		switch(e.keyCode) {
			case 49: //1 - black
				context.strokeStyle = "black";
				break;
			case 50: //2 - red
				context.strokeStyle = "red";
				break;	
			case 51: //3 - green
				context.strokeStyle = "green";
				break;	
			case 52: //4 - blue
				context.strokeStyle = "blue";
				break;	
			case 53: //5 - white
				context.strokeStyle = "white";
				break;	
		}
	}
	
	//Adjusting the brush size with the slider
	$('#brushSize').change(function() {
		context.lineWidth = this.value;
	});
});