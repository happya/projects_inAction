var WINDOW_WIDTH, WINDOW_HEIGHT, RADIUS;
var MARGIN_LEFT, MARGIN_TOP;
var timer;

function Init() {
  WINDOW_WIDTH = document.body.clientWidth;;
  WINDOW_HEIGHT = document.body.clientHeight;
  RADIUS =  Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;;
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
}
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#FCEAEE", 
                "#F1927C",
                "#00AC97",
                "#9C5608",
                "#747E4A",
                "#C54F49",
                "#4591A3",
                "#CB5E0A",
                "#9A81CF",
                "#071438"];

window.onresize = function() {
  Init();
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  context.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
  curShowTimeSeconds = getCurShowTimeSeconds();
  if(timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    render(context);
    update(); 
  }, 50);
  
}
window.onload = function () {
  Init();
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurShowTimeSeconds();
  if(timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    render(context);
    update(); 
  }, 50);
  
}
function update() {
  var nextShowTimeSeconds = getCurShowTimeSeconds();
  var nextHours = parseInt(nextShowTimeSeconds / 3600 );
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600 ) / 60 );
  var nextSeconds = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / 3600 );
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600 ) / 60 );
  var curSeconds = curShowTimeSeconds % 60;

  if (nextSeconds != curSeconds) {
    if (parseInt(nextHours/10) != parseInt(curHours/10)) {
      addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
    }

    if (parseInt(nextHours%10) != parseInt(curHours%10)) {
      addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
    }

    if (parseInt(nextMinutes/10) != parseInt(curMinutes/10)) {
      addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
    }

    if (parseInt(nextMinutes%10) != parseInt(curMinutes%10)) {
      addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
    }

    if (parseInt(nextSeconds/10) != parseInt(curSeconds/10)) {
      addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
    }

    if (parseInt(nextSeconds%10) != parseInt(curSeconds%10)) {
      addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }
  updateBalls();
  console.log(balls.length);
}


function getCurShowTimeSeconds() {
  var curTime = new Date();
  var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

  return ret;
}

function render(ctx) {

  // 对矩形区域刷新
  ctx.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
  var hours = parseInt(curShowTimeSeconds / 3600 );
  var minutes = parseInt((curShowTimeSeconds - hours * 3600 ) / 60 );
  var seconds = parseInt(curShowTimeSeconds % 60 );

  renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10), ctx);
  renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10), ctx);
  renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10, ctx);

  renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10), ctx);
  renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10), ctx);
  renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10, ctx);

  renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10), ctx);
  renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10), ctx);

  // 绘制即将产生动画的小球
  for (var i=0;i<balls.length;i++) {
    ctx.fillStyle = balls[i].color;
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

function renderDigit(x, y, num, ctx) {
  
  var arr = digit[num];
  for (var i=0; i<arr.length;i++) {
    for (var j=0;j<arr[i].length;j++) {
      if (arr[i][j] == 1) {
        ctx.beginPath();
        var x_r = x + j*2*(RADIUS + 1) + (RADIUS + 1);
        var y_r = y + i*2*(RADIUS + 1) + (RADIUS + 1);
        ctx.arc(x_r,y_r,RADIUS, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'rgb(0, 102, 153)';
        ctx.fill();
      }
    }
  }
}

function addBalls(x,y,num) {
  var arr = digit[num];
  for (var i=0; i<arr.length;i++) {
    for (var j=0;j<arr[i].length;j++) {
      if (arr[i][j] == 1) {
        var x_r = x + j*2*(RADIUS + 1) + (RADIUS + 1);
        var y_r = y + i*2*(RADIUS + 1) + (RADIUS + 1);
        var aBall = {
          x: x_r,
          y: y_r,
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * parseInt(RADIUS / 2),
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length )]
        }
        balls.push(aBall);
      }
    }
  }
}
function updateBalls() {
  for (var i=0;i<balls.length;i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    // 碰撞检测
    // 下边界
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  var cnt = 0;
  for(var i=0;i<balls.length;i++) {
    if(balls[i].x + RADIUS> 0 && balls[i].x-RADIUS<WINDOW_WIDTH) {
      balls[cnt++] = balls[i];
    }
    }
    while(balls.length > Math.min(cnt,500)) {
      balls.pop();
    }
}