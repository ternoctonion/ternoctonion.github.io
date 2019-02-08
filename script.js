console.log("Hello World");
var canvas = document.getElementById("TheCanvas");
var width = canvas.scrollWidth;
var height = canvas.scrollHeight;
var ctx = canvas.getContext("2d")

var x = width/2;
var y = height-30;
var bSpeed = 0.5;
var dx = bSpeed;
var dy = -bSpeed;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (width - paddleWidth)/2;
var pSpeed = 7;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var mouseX;
//var mouseY;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (var j = 0; j < brickRowCount; j++) {
    bricks[i][j] = {x: 0, y: 0};
  }
}

function drawBricks() {
  for(var i = 0; i < brickColumnCount; i++) {
    for(var j = 0; j < brickRowCount; j++) {
      var brickX = (i*(brickWidth+brickPadding)) + brickOffsetLeft;
      var brickY = (j*(brickHeight+brickPadding)) + brickOffsetTop;
      bricks[i][j].x = brickX;
      bricks[i][j].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } else if(e.keyCode == 37) {
    leftPressed = true;
  } else if(e.keyCode == 38) {
    upPressed = true;
  } else if(e.keyCode == 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
    leftPressed = false;
  } else if(e.keyCode == 38) {
    upPressed = false;
  } else if(e.keyCode == 40) {
    downPressed = false;
  }
}

function mouseMoveHandler(e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
}

function updateKPaddle() {
  if(rightPressed && paddleX < width-paddleWidth) {
    paddleX += pSpeed;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= pSpeed;
  }
}

function updateMPaddle() {
  paddleX = mouseX - (paddleWidth/2);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "0095DD"
  ctx.fill();
  ctx.closePath();
}

var boxSize = 75;
var bx = (width-boxSize)/2;
var by = (height-boxSize)/2;
var boxSpeed = 2;

var box2Size = boxSize/2;
var b2x = (width-box2Size)/2;
var b2y = (height-box2Size)/2;
var box2Speed = boxSpeed/2;

var box3Size = boxSize * (3/4);
var b3x = (width-box3Size)/2;
var b3y = (height-box3Size)/2;
var box3Speed = boxSpeed * (3/4);
var box3RSped = 0.01;
var b3CTRx = b3x + (box3Size/2);
var b3CTRy = b3y + (box3Size/2);

var b1ax = bx;
var b1ay = by;
var b1bx = bx + boxSize;
var b1by = by;
var b1cx = bx;
var b1cy = by + boxSize;
var b1dx = bx + boxSize;
var b1dy = by + boxSize;

var b2ax = b2x;
var b2ay = b2y;
var b2bx = b2x + box2Size;
var b2by = b2y;
var b2cx = b2x;
var b2cy = b2y + box2Size;
var b2dx = b2x + box2Size;
var b2dy = b2y + box2Size;

var b3ax = b3x;
var b3ay = b3y;
var b3bx = b3x + box3Size;
var b3by = b3y;
var b3cx = b3x;
var b3cy = b3y + box3Size;
var b3dx = b3x + box3Size;
var b3dy = b3y + box3Size;

function updateLines() {
  b1ax = bx;
  b1ay = by;
  b1bx = bx + boxSize;
  b1by = by;
  b1cx = bx;
  b1cy = by + boxSize;
  b1dx = bx + boxSize;
  b1dy = by + boxSize;

  b2ax = b2x;
  b2ay = b2y;
  b2bx = b2x + box2Size;
  b2by = b2y;
  b2cx = b2x;
  b2cy = b2y + box2Size;
  b2dx = b2x + box2Size;
  b2dy = b2y + box2Size;
  /*
  b3ax = b3x;
  b3ay = b3y;
  b3bx = b3x + box3Size;
  b3by = b3y;
  b3cx = b3x;
  b3cy = b3y + box3Size;
  b3dx = b3x + box3Size;
  b3dy = b3y + box3Size;
  //*/
}


function rotateB3Counter() {
  var arr = rotate([b3ax,b3ay],[b3CTRx,b3CTRy],box3RSped);
  b3ax = arr[0];
  b3ay = arr[1];
  arr = rotate([b3bx,b3by],[b3CTRx,b3CTRy],box3RSped);
  b3bx = arr[0];
  b3by = arr[1];
  arr = rotate([b3cx,b3cy],[b3CTRx,b3CTRy],box3RSped);
  b3cx = arr[0];
  b3cy = arr[1];
  arr = rotate([b3dx,b3dy],[b3CTRx,b3CTRy],box3RSped);
  b3dx = arr[0];
  b3dy = arr[1];
}

function rotateB3Clock() {
  var arr = rotate([b3ax,b3ay],[b3CTRx,b3CTRy],-box3RSped);
  b3ax = arr[0];
  b3ay = arr[1];
  arr = rotate([b3bx,b3by],[b3CTRx,b3CTRy],-box3RSped);
  b3bx = arr[0];
  b3by = arr[1];
  arr = rotate([b3cx,b3cy],[b3CTRx,b3CTRy],-box3RSped);
  b3cx = arr[0];
  b3cy = arr[1];
  arr = rotate([b3dx,b3dy],[b3CTRx,b3CTRy],-box3RSped);
  b3dx = arr[0];
  b3dy = arr[1];
}

function rotate(cn, ax, pp) {
  //ac-bd,ad+cb
  //(ppr*(cn-ax))+ax
  var cos = Math.cos(Math.PI*pp);
  var sin = Math.sin(Math.PI*pp);
  var ort = [cn[0]-ax[0],cn[1]-ax[1]];
  var rotort = [ort[0]*cos - sin*ort[1] + ax[0]
              , ort[0]*sin + cos*ort[1] + ax[1]];
  return rotort;
}

function drawPLines() {
  ctx.beginPath();
  ctx.moveTo(b1ax,b1ay);
  ctx.lineTo(b2ax,b2ay);
  ctx.moveTo(b1bx,b1by);
  ctx.lineTo(b2bx,b2by);
  ctx.moveTo(b1cx,b1cy);
  ctx.lineTo(b2cx,b2cy);
  ctx.moveTo(b1dx,b1dy);
  ctx.lineTo(b2dx,b2dy);
  ctx.stroke();
}

function drawBox() {
  ctx.beginPath();
  ctx.rect(bx,by,boxSize,boxSize);
  ctx.stroke();
  ctx.closePath();
}

function drawBox2() {
  ctx.beginPath();
  ctx.rect(b2x,b2y,box2Size,box2Size);
  ctx.stroke();
  ctx.closePath();
}

function drawBox3() {
  ctx.beginPath();
  ctx.moveTo(b3ax,b3ay);
  ctx.lineTo(b3bx,b3by);
  ctx.lineTo(b3dx,b3dy);
  ctx.lineTo(b3cx,b3cy);
  ctx.lineTo(b3ax,b3ay);
  //ctx.rect(b3x,b3y,box3Size,box3Size);
  ctx.stroke();
  ctx.closePath();
}

function updateBoxes() {
  if(leftPressed) {
    bx -= boxSpeed;
    b2x -= box2Speed;
    //b3x -= box3Speed;
    rotateB3Counter();
  } else if(rightPressed) {
    bx += boxSpeed;
    b2x += box2Speed;
    //b3x += box3Speed;
    rotateB3Clock();
  }
  if(upPressed) {
    by -= boxSpeed;
    b2y -= box2Speed;
    //b3y -= box3Speed;
    rotateB3Counter();
  } else if(downPressed) {
    by += boxSpeed;
    b2y += box2Speed;
    //b3y += box3Speed;
    rotateB3Clock();
  }
  updateLines();
}

function updateBall() {
  cy = y + dy;
  cx = x + dx;

  if(cx < ballRadius || cx > width - ballRadius) {
    dx = -dx;
  }

  if(cy < ballRadius) {
    dy = -dy;
  } else if(cy > height - ballRadius) {
    checkCollisions();
  }

  x += dx;
  y += dy;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath;
}

function checkPaddleCollision() {
  if(x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
    //Put speed change here if you want.
  } else {
    //alert("GAME OVER");
    document.location.reload();
  }
}

function checkBrickCollisions() {
  for(var i = 0; i < brickColumnCount; i++) {
    for(var j = 0; j < brickRowCount; j++) {
      var b = bricks[i][j];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y & y < b.y+brickHeight) {
          dy -= dy;
          b.status = 0;
        }
      }
    }
  }
}

function checkCollisions() {
  checkPaddleCollision();
  checkBrickCollisions();
}

function drawLines() {
  ctx.beginPath();
  ctx.moveTo(width/2,height/2);
  ctx.lineTo(x,y);
  ctx.moveTo(width/2,height/2);
  ctx.lineTo(paddleX + (paddleWidth/2),height - (paddleHeight/2));
  ctx.stroke();
  ctx.closePath();
}

function update() {
  updateBall();
  updateMPaddle();
}

var accel = 0.09;
var fric = 0.001;

var wx = width/2;
var wy = height/2;
var wVy = 0;
var wVx = 0;
var jumpflag = false;
var wJumpSpeed = 3;
var wMoveSpeed = 0.1;

function vvat(vi) {
  return vi + accel;
}

function updateWBall() {
  if(wVx > 10*fric) {
    wVx -= fric
  } else if(wVx < -10*fric) {
    wVx += fric
  } else {
    wVx = 0
  }

  if((wy + ballRadius) >= height) {
    wVy = 0;
  } else {
    wVy += accel;
  }

  if(upPressed && !jumpflag) {
    wVy = -wJumpSpeed;
    jumpflag = true;
  } else if(!upPressed) {
    jumpflag = false;
  }
  /*
  if((wx + ballRadius) >= width || (wx - ballRadius) <= 0) {
    wVx = 0;
  }
  //*/
  if(leftPressed && rightPressed) {
    wVx = 0;
  } else if(leftPressed) {
    wVx -= wMoveSpeed;
    if((wx - ballRadius) <= 0) {
      wVx = 0;
    } else if((wx + ballRadius) >= width) {
      wVx -= wMoveSpeed * 1.1;
    }
  } else if(rightPressed) {
    wVx += wMoveSpeed;
    if((wx + ballRadius) >= width) {
      wVx = 0;
    } else if((wx - ballRadius) <= 0) {
      wVx += wMoveSpeed * 1.1;
    }
  } else if((wx + ballRadius) >= width || (wx - ballRadius) <= 0) {
    wVx = -wVx;
  }
  /*
  if(wy + (ballRadius/2) > height) {
    wVx = 0;
  } if(wy + ballRadius > height) {
    fric = 0.05;
  } else {
    fric = 0.001;
  }
  //*/
  wx += wVx;
  wy += wVy;
}

function drawWireBall() {
  ctx.beginPath();
  ctx.arc(wx,wy,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  //ctx.fill();
  ctx.stroke();
  ctx.closePath;
}

function drawNegBall() {
  ctx.beginPath();
  ctx.arc(width-wx,height-wy,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  //ctx.fill();
  ctx.stroke();
  ctx.closePath;
}

function drawNegXBall() {
  ctx.beginPath();
  ctx.arc(width-wx,wy,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  //ctx.fill();
  ctx.stroke();
  ctx.closePath;
}

function drawNegYBall() {
  ctx.beginPath();
  ctx.arc(wx,height-wy,ballRadius,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  //ctx.fill();
  ctx.stroke();
  ctx.closePath;
}

function draw() {
  ctx.clearRect(0,0, width, height);
  //drawLines();
  //drawBricks();
  //drawBall();
  //drawPaddle();
  //update();
  drawWireBall();
  drawNegBall();
  drawNegXBall();
  drawNegYBall();
  updateWBall();
  drawBox();
  drawBox2();
  drawBox3();
  drawPLines();
  updateBoxes();
  document.getElementById("wbxSpeed").innerHTML = wVx.toFixed(3);
  document.getElementById("wbySpeed").innerHTML = (-wVy).toFixed(3);
}

setInterval(draw, 10);
