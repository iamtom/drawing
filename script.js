$(document).ready(function() {
	//Document elements
	var customColourPane = document.getElementById('customColourPane');
	var brushSizeDisplay = document.getElementById('brushSizeDisplay');
	var canvas = document.getElementById('canvas');

	canvas.addEventListener('keydown', doKeyDown, true);

	var context = canvas.getContext("2d");
	
	
	canvas.width = $(window).width() - 40;
	canvas.height = $(window).height() - 90;

	//Line style
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.lineWidth = 5;
	context.strokeStyle = "black";
	
	//Keeps logs of mouse movements
	var logOfX = [];
	var logOfY = [];
	
	//Custom colour variables
	var red = 255, green = 255, blue = 255, alpha = 1;


	var customColours = [];
	
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

	//For making dots with a single-click
	$('#canvas').click(function(event) {
		pos = getMousePosition(canvas, event);
		posX = pos.x;
		posY = pos.y;

		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY);
		context.stroke();
	});
	
	$('body').mouseup(function() {
		$('#canvas').unbind('mousemove');
		logOfX = [];
		logOfY = [];
	});	
	
	$('#canvas').mouseleave(function() {
		$('#canvas').unbind('mousemove');
		logOfX = [];
		logOfY = [];
	});
		
	//Change colours with keys
	function doKeyDown(e) {	
		switch(e.keyCode) {
			case 49: //1 - black
				context.strokeStyle = "black";
				context.fillStyle = "black";
				break;
			case 50: //2 - red
				context.strokeStyle = "red";
				context.fillStyle = "red";
				break;	
			case 51: //3 - green
				context.strokeStyle = "green";
				context.fillStyle = "green";
				break;	
			case 52: //4 - blue
				context.strokeStyle = "blue";
				context.fillStyle = "blue";
				break;	
			case 53: //5 - white
				context.strokeStyle = "white";
				context.fillStyle = "white";
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
		brushSizeDisplay.innerHTML = this.value;
	});
	
	//Custom colour. Can I make this less repetitive?
	$('#rgbaRed').change(function() {
		red = this.value;
		$('#colourPreview').css('background-color', 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
		context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
	});	
	
	$('#rgbaGreen').change(function() {
		green = this.value;
		$('#colourPreview').css('background-color', 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
		context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
	});	
		
	$('#rgbaBlue').change(function() {
		blue = this.value;
		$('#colourPreview').css('background-color', 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
		context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
	});	
	
	$('#rgbaAlpha').change(function() {
		alpha = this.value;
		$('#colourPreview').css('background-color', 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
		context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
	});	

	//Save custom colours
	$('#saveColour').click(function() {
		var c = Math.round((Math.random() * 1000000));
		customColours.push([c, 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')']);

		//generate a preview div in the right hand pane
		customColourPane.innerHTML += '<div class="customColour" id="' + c + '"></div>';
		document.getElementById(c).style.backgroundColor = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		console.log(customColours);
	});

	//Use custom colour by clicking it
	$('#customColourPane').on('click', '.customColour', function(e) {
		var a = e.target.id;
		console.log(a);
		for (var i = 0; i < customColours.length; i++) {
			if (customColours[i][0] == a) {
				context.strokeStyle = customColours[i][1];
				context.fillStyle = customColours[i][1];
			}
		}
	});

	//Open menu
	$('#menuBar').click(function() {
		if ($('#mainMenu').css('visibility') == 'hidden') {			
			$('#mainMenu').css('visibility', 'visible');
		} else if ($('#mainMenu').css('visibility') !== 'hidden') {
			$('#mainMenu').css('visibility', 'hidden');
		}
	});

});