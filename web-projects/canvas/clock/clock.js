var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');//获取上下文

var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width / 200;

function drawBackground() {
  ctx.save();
  //设置原点坐标
  ctx.translate(r,r);
  //起始一条路径
  ctx.beginPath();
  //定义画圆路径，false=顺时针
  ctx.lineWidth = 10*rem;
  ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
  ctx.stroke();

  var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
  ctx.font = 18*rem+'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  hourNumbers.forEach(function(number,i) {
    var rad = 2*Math.PI /12 * i;
    var x = Math.cos(rad)*(r - 30*rem);
    var y = Math.sin(rad)*(r-30*rem);
    ctx.fillText(number,x,y);
  });

  for (var i=0;i<60;i++){
    var rad = 2*Math.PI/60*i;
    var x = Math.cos(rad) * (r-18*rem);
    var y = Math.sin(rad) * (r-18*rem);
    ctx.beginPath();
    if (i%5===0){
      ctx.fillStyle = '#000';
      ctx.arc(x,y,2*rem,0,2*Math.PI);
    }else {
      ctx.fillStyle = '#ccc'
      ctx.arc(x,y,2*rem,0,2*Math.PI);
    }
    ctx.fill();
    
    
  }
}
function drawHour(hour,minite) {
  ctx.save();
  ctx.beginPath();
  var rad = 2*Math.PI/12*hour;
  var mrad = 2*Math.PI/12/60*minite;

  ctx.rotate(rad+mrad);

  // 画线
  ctx.lineWidth = 6*rem;
  ctx.lineCap = 'round';
  ctx.moveTo(0,10*rem);//起始点
  ctx.lineTo(0,-r/2);//终点
  ctx.stroke();
  ctx.restore();
}

function drawMinute(minute) {
  ctx.save();
  ctx.beginPath();
  var rad = 2*Math.PI/60*minute;
  ctx.rotate(rad);

  // 画线
  ctx.lineWidth = 3*rem;
  ctx.lineCap = 'round';
  ctx.moveTo(0,10*rem);//起始点
  ctx.lineTo(0,-r+30*rem);//终点
  ctx.stroke();
  ctx.restore();
  
}

function drawSecond(second) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = '#c14543';
  var rad = 2*Math.PI/60*second;
  ctx.rotate(rad);

  // 画线
  ctx.moveTo(-2*rem,20*rem);//起始点
  ctx.lineTo(2*rem,20*rem);//终点
  ctx.lineTo(1*rem,-r+18*rem);
  ctx.lineTo(-1*rem,-r+18*rem);
  ctx.fill();
  ctx.restore();
  
}
function drawDot() {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(0,0,3,0,2*Math.PI);
  ctx.fill();
}


function draw(){
  ctx.clearRect(0,0,width,height);
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  drawBackground();
  drawHour(hour,minute);
  drawMinute(minute);
  drawSecond(second);
  drawDot();
  ctx.restore();
}
draw();
setInterval(draw,1000);