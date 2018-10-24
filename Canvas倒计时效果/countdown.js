// let WINDOW_WIDTH, WINDOW_HEIGHT, RADIUS, MARGIN_TOP, MARGIN_LEFT;
let WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768,
    RADIUS = 8,
    MARGIN_TOP = 60,
    MARGIN_LEFT = 30;
let  curShowTimeSeconds = 0;
let balls = [];
const endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

function drawCanvas() {

  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;
  MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
  console.log(WINDOW_WIDTH, WINDOW_HEIGHT)

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTimeSeconds();

  setInterval(function() {

    render(context);
    update();
  }, 50)
}

function getCurrentShowTimeSeconds() {

  let curDate = new Date();
  let ret = endTime.getTime() - curDate.getTime();
  // let ret = curDate.getTime() - endTime.getTime();
  // console.log(ret)
  ret = Math.round( ret/1000 );
  return ret >= 0 ? ret : 0;
}

function update() {

  let nextShowTimeSeconds = getCurrentShowTimeSeconds();

  let nextHour = parseInt(nextShowTimeSeconds / 3600);
  let nextMinutes = parseInt((nextShowTimeSeconds - nextHour*3600) / 60);
  let nextSeconds = nextShowTimeSeconds % 60;

  let curHour = parseInt(curShowTimeSeconds / 3600);
  let curMinutes = parseInt((curShowTimeSeconds - curHour*3600) / 60);
  let curSeconds = curShowTimeSeconds % 60;

  // console.log(curShowTimeSeconds, nextShowTimeSeconds)
  if (nextSeconds !== curSeconds) {

    if (parseInt(curHour / 10) !== parseInt(nextHour / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours/10));
    }
    if( parseInt(curHour % 10) != parseInt(nextHour % 10) ){
        addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHour / 10) );
    }

    if( parseInt(curMinutes/10) != parseInt(nextMinutes / 10) ){
        addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes / 10) );
    }
    if( parseInt(curMinutes%10) != parseInt(nextMinutes % 10) ){
        addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes % 10) );
    }

    if( parseInt(curSeconds/10) != parseInt(nextSeconds / 10) ){
        addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds / 10) );
    }
    if( parseInt(curSeconds%10) != parseInt(nextSeconds % 10) ){
        addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds % 10) );
    }
    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
  // console.log( balls.length)
}

function updateBalls() {

  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy*0.5;
    }
  }

  let cnt = 0;
  for (let i = 0; i < balls.length ; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i]
    }
  }
  while (balls.length > cnt) {
    balls.pop();
  }
}

function addBalls(x, y, num) {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        let aBall = {
          x: x+j*2*(RADIUS+1)+(RADIUS+1),
          y: y+i*2*(RADIUS+1)+(RADIUS+1),
          g: 1.5+Math.random(),
          vx: Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, // 判断方向
          vy: -5,
          color: colors[ Math.floor( Math.random()*colors.length ) ]
        }
        console.log(aBall)
        balls.push(aBall);
      }
    }
  }
}

function render(cxt) {

  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  let hour = parseInt(curShowTimeSeconds / 3600);
  let minutes = parseInt((curShowTimeSeconds - hour*3600) / 60);
  let seconds = parseInt(curShowTimeSeconds % 60);
  // console.log(hour, minutes, seconds)

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), cxt);
  renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hour % 10), cxt);
  renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds % 10), cxt);
  
  for( var i = 0 ; i < balls.length ; i ++ ){
    cxt.fillStyle=balls[i].color;

    cxt.beginPath();
    cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
    cxt.closePath();

    cxt.fill();
  }
};

function renderDigit(x, y, num, cxt) {

  // console.log(digit[num])
  cxt.fillStyle = "rgb(0,102,153)";
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        cxt.beginPath();
        cxt.arc(x + j*2*(RADIUS+1) + (RADIUS+1), y + i*2*(RADIUS+1) + (RADIUS+1), RADIUS, 0, Math.PI*2);
        cxt.closePath();
        cxt.fill();
      }
    }
  }
}

drawCanvas();