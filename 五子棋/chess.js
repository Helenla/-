let chess = document.getElementById('chess');
let ctx = chess.getContext('2d');
let me = true;
let chessBroad = [];
let win = [], myWin = [], computerWin = [];
let count = 0;
let over = false;
ctx.strokeStyle = '#ddd';

for (let i = 0; i < 15; i++) {
  chessBroad[i] = [];
  for (let j = 0; j < 15; j++) {
    chessBroad[i][j] = 0;
  }
}

for (let i = 0; i < 15; i++) {
  win[i] = [];
  for (let j = 0; j < 15; j++) {
    win[i][j] = [];
  }
}

for (let i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
}

// 横向
for (var i = 0; i < 11; i++) {
  for (var j = 0; j < 15; j++) {
    for (var k = 0; k < 5; k++) {
      win[i+k][j][count]=true;
    }
    count++;
  }
}
// 纵向
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      win[i][j+k][count]=true;
    }
    count++;
  }
}

// 斜线
for (var i = 14; i > 3; i--) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      win[i-k][j+k][count]=true;
    }
    count++;
  }
}
// 反斜线
for (var i = 0; i < 11; i++) {
  for (var j = 0; j <11; j++) {
    for (var k = 0; k < 5; k++) {
      win[i+k][j+k][count]=true;
    }
    count++;
  }
}
console.log(count)

let bgImage = new Image();
bgImage.src = 'bg.jpg';
bgImage.onload = function() {
  ctx.drawImage(bgImage, 0, 0, 450, 450);
  drawChessBorad();
}

chess.onclick = function(e) {
  if(over) {
    return
  }
  let x = e.offsetX;
  let y = e.offsetY;
  let i = Math.floor(x / 30);
  let j = Math.floor(y / 30);
  if (chessBroad[i][j] === 0) {
    drawChess(i, j, me);
    if (me) {
      chessBroad[i][j] = 1;
    } else {
      chessBroad[i][j] = 2;
    }
    me = !me;
    for ( let k = 0; k < count; k++) {
      if (win[i][j][k]) {
        myWin[k]++;
        computerWin[k] = 6;
        if (myWin[k] === 5) {
          alert('你赢了！')
          over = true
        }
      }
    }
  }
}

function drawChessBorad() {
  for (let i = 0; i < 15; i++) {
    ctx.moveTo(15 + i*30, 15);
    ctx.lineTo(15 + i*30, 435);
    ctx.stroke();
    ctx.moveTo(15, 15 + i*30);
    ctx.lineTo(435, 15 + i*30);
    ctx.stroke();
  }
}

function drawChess(i, j, me) {
  ctx.beginPath();
  ctx.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
  ctx.closePath();
  let gradent = ctx.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);
  if (me) {
    gradent.addColorStop(0, '#0a0a0a');
    gradent.addColorStop(1, '#636766');
  } else {
    gradent.addColorStop(0, '#d1d1d1');
    gradent.addColorStop(1, '#f9f9f9');
  }
  ctx.shadowColor = 'gray';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 8;
  ctx.fillStyle = gradent;
  ctx.fill();
}