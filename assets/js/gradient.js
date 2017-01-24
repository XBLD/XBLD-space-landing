var DitheredRadialGradient = require('./DitheredRadialGradient');
var canvas = document.getElementById('gradient');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
ctx.canvas.width  = width;
ctx.canvas.height = height;

window.addEventListener('resize', function () {
  width = window.innerWidth;
  height = window.innerHeight;
  ctx.canvas.width  = width;
  ctx.canvas.height = height;
  canvas.style.width = width;
  canvas.style.height = height;
});

function init() {
  var x0, y0, r0, g0, b0, r1, g1, b1;
  x0 = width / 2;
  y0 = height / 2;
  
  r0 = 37;
  g0 = 37;
  b0 = 37;
  
  r1 = 22;
  g1 = 22;
  b1 = 22;
  
  var outerRad = Math.sqrt(width * width + height * height) / 2;
  var dgrad = new DitheredRadialGradient(x0, y0, 0, width / 2, height / 2, outerRad);
  dgrad.addColorStop(0, r0, g0, b0);
  dgrad.addColorStop(.5, r1, g1, b1);   
  dgrad.fillRect(ctx, 0, 0, width, height);
}

module.exports = init();
