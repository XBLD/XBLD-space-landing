var nav = require('./nav');
var isMobile = require('./browser-detect').isMobile();
var mouseX = isMobile ? 0 : window.innerWidth / 2; 
var mouseY = isMobile ? 0 : window.innerHeight / 2; 
var particleSize = isMobile ? 2 : 1;
var particleSpread = 1000;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
var renderer = new THREE.WebGLRenderer({alpha: true});
var fog = new THREE.Fog(0x333333, -10, 1600);
var particleCount = 1400;
var particlesGemoetry = new THREE.Geometry();
var particlesMaterial = new THREE.PointsMaterial({
  color: 0xFFFFFF,
  size: particleSize,
  sizeAttenuation: true,
  fog: true
});
var particleSystem = new THREE.Points(
  particlesGemoetry,
  particlesMaterial
);

var handleWindowResize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

nav.navActiveTriggered(function (navActive) {
  if (navActive) {
    mouseX = 0;
    mouseY = 0;
  }
});
window.addEventListener('resize', handleWindowResize);

if (!isMobile) {
  window.onmousemove = function(e) {
    if (!nav.navActive()) {
      mouseX = e.clientX - (window.innerWidth / 2);
      mouseY = e.clientY - (window.innerHeight / 2);
    }
  }
}

camera.position.z = 900;
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('space').appendChild(renderer.domElement);

for (var p = 0; p < particleCount; p++) {
  var pX = Math.random() * (particleSpread * 2) - particleSpread,
      pY = Math.random() * (particleSpread * 2) - particleSpread,
      pZ = Math.random() * (particleSpread * 2) - particleSpread,
      particle = new THREE.Vector3(pX, pY, pZ);

  particlesGemoetry.vertices.push(particle);
}

scene.fog = fog;
scene.add(particleSystem);

function animate (time) {
  if (!isMobile) {
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.position.z += (mouseX - camera.position.x) * 0.001;
  }
    
  particleSystem.rotation.x += 0.0005;
  particleSystem.rotation.y += 0.0008;

  renderer.render(scene, camera);
  camera.lookAt(scene.position);
  requestAnimationFrame(animate);
}

renderer.render(scene, camera);
requestAnimationFrame(animate);
