$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	canvas.addEventListener('keydown', doKeyDown, true);

	var context = canvas.getContext("2d");
	
	//Line style
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.lineWidth = 10;
	context.strokeStyle = "black";
	
	//Keeps logs of mouse movements
	var logOfX = [];
	var logOfY = [];
	
	//Fill in the background
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	
	function getMousePosition(canvas, event) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}
	
	//Drawing with the mouse
	$('#canvas').mousedown(function(event) {
		pos = getMousePosition(canvas, event);
		posX = pos.x;
		posY = pos.y;
		
		context.beginPath();
		logOfX.push(posX);
		logOfY.push(posY);
		$('#canvas').mousemove(function(event) {
			pos = getMousePosition(canvas, event);
			posX = pos.x;
			posY = pos.y;
			/* //Just so I can see the co-ordinates in the console:
			var msg = "Mouse called at ";
			msg += event.pageX + ", " + event.pageY;
			console.log(msg); */
		
			//Draw the lines:
			context.moveTo(logOfX[logOfX.length], logOfY[logOfY.length]);
			context.lineTo(posX, posY);
			context.stroke();
		
		});
	});
	
	$('body').mouseup(function() {
		$('#canvas').unbind('mousemove');
		logOfX = [];
		logOfY = [];
	});	
	
	
	//Change colours with keys
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
	
	//Change colours with buttons
	$('#blackBtn').click(function() {
		context.strokeStyle = "black";
	});
	$('#redBtn').click(function() {
		context.strokeStyle = "red";
	});
	$('#greenBtn').click(function() {
		context.strokeStyle = "green";
	});
	$('#blueBtn').click(function() {
		context.strokeStyle = "blue";
	});
	$('#whiteBtn').click(function() {
		context.strokeStyle = "white";
	});
	
	//Reset canvas
	$('#wipe').click(function() {
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
	});
	
	//Adjusting the brush size with the slider
	$('#brushSize').change(function() {
		context.lineWidth = this.value;
		document.getElementById('brushSizeDisplay').innerHTML = this.value;
	});
});