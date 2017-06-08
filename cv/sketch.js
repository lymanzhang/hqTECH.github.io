var data = [];
var rowDataSize = 100;

var m = 0;
var b = 0;
var ymean = 0;
var rSquareValue = 0;
var MSE = 0;
var RMSE = 0;

var Ftest = 0;
var studentT = 0;
var peason = 0;
var error = 0;

var learning_rate = 0.05;


//Gradient Descent Curve settings
var errorData = [];
var marginLeft = 100;
var marginBottom = 50;

var errorDataIndex = 0;

var scaleIndex = 1;
//Gradient Descent Curve settings

function setup() {
	createCanvas(800, 800);
	background(51);
	initiateSys();
}

function initiateSys(){
	data = [];
	errorData = [];
	generateRowData();
}

function gradientDescent(){	
	for(var i = 0; i < data.length; i ++){
		var predictionY = m * data[i].x + b;
		error = data[i].y - predictionY;
		errorData.push(error);
		m = m + error * data[i].x * learning_rate;
		b = b + error * learning_rate;
	}
}

function linearRegression(){
	var xsum = 0;
	var ysum = 0;

	for(var i = 0; i < data.length; i ++){
		xsum += data[i].x;
		ysum += data[i].y;
	}

	var xmean = xsum / data.length;
	ymean = ysum / data.length;
    //calculate m and b values
    /*
	var fractalUpper = 0;
	var fractalLower = 0;

	for(var i = 0; i < data.length; i ++){
		fractalUpper += (data[i].x - xmean)*(data[i].y - ymean);
		fractalLower += (data[i].x - xmean)*(data[i].x - xmean);
	}
	m = fractalUpper / fractalLower;
	b = ymean - m*xmean;
    //calculate m and b values
    */
}

function rSquare(){
	rSquareValue = 0;
	var yPredictValueSquareSum = 0;
	var ymeanSquareSum = 0;
	for(var i = 0; i < data.length; i ++){
		var yPredictValue = m * data[i].x + b;
		yPredictValueSquareSum += (data[i].y - yPredictValue)*(data[i].y - yPredictValue);
		ymeanSquareSum += (data[i].y - ymean)*(data[i].y - ymean);
	}
	rSquareValue = 1 - (yPredictValueSquareSum / ymeanSquareSum);
	MSE = yPredictValueSquareSum / data.length;
	RMSE = sqrt(MSE);
}

function drawLine(){
	var x1 = 0;
	var y1 = m * x1 + b;
	var x2 = 1;
	var y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);

	stroke(255, 0, 255);
	line(x1, y1, x2, y2);
}

/*
function mousePressed() {
	var x = map(mouseX, 0, width, 0, 1);
	var y = map(mouseY, 0, height, 1, 0);

	var point = createVector(x, y);
	data.push(point);
	errorData = []; //.clear();
}
*/

function generateRowData(){
	for(var i = 0; i < rowDataSize; i ++){
		var x = map(random(width), 0, width, 0, 1);
		var xy = x + random(0.1,0.3);
		var y = map(xy, 0, 1, 1, 0);

		var point = createVector(x, y);
		data.push(point);
	}
}

function draw(){
  	background(51);

  	for(var i = 0; i < data.length; i ++){
  		var x = map(data[i].x, 0, 1, 0, width);
  		var y = map(data[i].y, 0, 1, height, 0);
  		fill(255);
  		stroke(255);
  		ellipse(x, y, 8, 8);
  	}

  	rSquare();
  	linearRegression();
  	gradientDescent();
  	drawLine();
  	fill(175);
  	noStroke();
  	text("Sample Size: "+data.length, width-300, 30);
  	text("Goodness of Fit - R2: "+nfc(rSquareValue,3), width-300, 50);
  	text("MSE-Mean Squared Error: "+nfc(MSE,3), width-300, 70);
  	text("RMSE-Root Mean Squared Error: "+nfc(RMSE,3), width-300, 90);
  	text("Learning Error: "+nfc(error,3), width-300, 120);
  	text("scaleIndex: " + scaleIndex, width-300, height - 50);
  	text("Regression Line: y = " + nfc(m,3) +'x'+" + "+nfc(b,3),50,50);

  	//pushMatrix();
  	//translate(marginLeft, height - marginBottom*2);
  	drawGDCurve();
  	//popMatrix();
}

function drawGDCurve(){
	strokeWeight(1);
	stroke(200);
	line(marginLeft, height - marginBottom*2, width - marginLeft, height - marginBottom*2);

	stroke(0,100, 255);
	noFill();
	beginShape();
	for(var i = 0; i < errorData.length; i ++){
		curveVertex(marginLeft + i*scaleIndex, height - marginBottom*2 + errorData[i]*300);
	}
	endShape();
}

function keyTyped(){
	if(key == 'r'){
		initiateSys();
	}
	if(key =='a'){
		scaleIndex += 0.1;
	}
	if(key =='z'){
		scaleIndex -= 0.1;
	}
}