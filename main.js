var starfield = {
  navActive: false
};
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
var renderer = new THREE.WebGLRenderer({alpha: true});
var mouseX = window.innerWidth/2;
var mouseY = window.innerHeight/2;

window.onmousemove = function(e) {
  if (!starfield.navActive){
    mouseX = e.clientX - (window.innerWidth/2);
    mouseY = e.clientY - (window.innerHeight/2);
  }
}

camera.position.z = 1000;
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

var light = new THREE.AmbientLight(0x404040);
var fog = new THREE.Fog(0x333333, -10, 1200);
// create the particle variables
var particleCount = 700;
var particlesGemoetry = new THREE.Geometry();
var particlesMaterial = new THREE.PointsMaterial({
  color: 0xFFFFFF,
  size: 1.5,
  sizeAttenuation: false,
  fog: true
});
var particleSystem = new THREE.Points(
  particlesGemoetry,
  particlesMaterial
);
var shapeGeometry = new THREE.IcosahedronGeometry(900, 1);
var shapeMaterial = new THREE.MeshBasicMaterial({
  color: 0x222222,
  wireframe: true,
  wireframeLinewidth: .5,
  fog: false
});
var shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
shape.position.z = -800;
// now create the individual particlesGemoetry
for (var p = 0; p < particleCount; p++) {
  var pX = Math.random() * 2000 - 1000,
      pY = Math.random() * 2000 - 1000,
      pZ = Math.random() * 2000 - 1000,
      particle = new THREE.Vector3(pX, pY, pZ);

  particlesGemoetry.vertices.push(particle);
}

scene.fog = fog;
// add it to the scene
scene.add(particleSystem);
scene.add(light);
    scene.add(shape);
// scene.add(shape)
function animate (time) {
  if (window) {
    camera.position.x += ( mouseX - camera.position.x ) * 0.01;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.002;
    if (starfield.navActive) {
      shape.rotation.x += 0.001;
      shape.rotation.y += 0.0005;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}

renderer.render(scene, camera);
requestAnimationFrame(animate);

starfield.toggleShape = function () {
  if (starfield.navActive) {
    mouseX = 0;
    mouseY = 0;
    scene.add(shape);
  } else {
    // scene.remove(shape);
  }
}

starfield.setMousePosition = function (x, y) {
  mouseX = x;
  mouseY = y;
}
