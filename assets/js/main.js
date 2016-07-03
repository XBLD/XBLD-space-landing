  var isMobile = require('ismobilejs').any;
  var navToggle = document.querySelectorAll('.header__nav-toggle')[0];
  var nav = document.querySelectorAll('.header__nav')[0];
  var logo = document.getElementById('xbld');

  var navActive = false;
  var rotateAmount = .3;
  var listItemIndex = 0;
  var oldListItemIndex = 0;
  var mouseX = isMobile ? 0 : window.innerWidth/2; 
  var mouseY = isMobile ? 0 : window.innerHeight/2; 
  var particleSize = isMobile ? 2 : 0.5;
  var wireframeLinewidth = isMobile ? 2 : 1;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  var renderer = new THREE.WebGLRenderer({alpha: true});
  var light = new THREE.AmbientLight(0x404040);
  var fog = new THREE.Fog(0x333333, -10, 1200);
  var particleCount = 700;
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
  var shapeGeometry = new THREE.IcosahedronGeometry(900, 1);
  var shapeMaterial = new THREE.MeshBasicMaterial({
    color: 0x222222,
    wireframe: true,
    wireframeLinewidth: wireframeLinewidth,
    fog: false
  });
  var shape = new THREE.Mesh(shapeGeometry, shapeMaterial);

  var handleNavToggleHover = function (e) {
    navToggle.classList.toggle('header__nav-toggle--hover');
  }

  var handleNavToggleClick = function (e) {
    navActive = !navActive;
    logo.classList.toggle('logo--hide');
    nav.classList.toggle('header__nav--open');
    navToggle.classList.toggle('header__nav-toggle--open');

    if (navActive) {
      mouseX = 0;
      mouseY = 0;
    }
  }

  navToggle.addEventListener('click', handleNavToggleClick);

  if (!isMobile) {
    navToggle.addEventListener('mouseenter', handleNavToggleHover);
    navToggle.addEventListener('mouseleave', handleNavToggleHover);

    document.querySelectorAll('.social__item').forEach(function (item, i) {
      item.addEventListener('mouseenter', function () {
        rotateAmount = 0;
        oldListItemIndex = listItemIndex;
        listItemIndex = i;
      });
    });

    window.onmousemove = function(e) {
      if (!navActive) {
        mouseX = e.clientX - (window.innerWidth/2);
        mouseY = e.clientY - (window.innerHeight/2);
      }
    }
  }

  camera.position.z = 1000;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('background').appendChild(renderer.domElement);

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
  scene.add(particleSystem);
  scene.add(light);
  scene.add(shape);

  function animate (time) {
    if (!isMobile) {
      camera.position.x += ( mouseX - camera.position.x ) * 0.004;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.004;
    }
    
    particleSystem.rotation.x += 0.0007;
    particleSystem.rotation.y += 0.00017;

    if (navActive) {
      if (rotateAmount < .3) {
        var rotate = 0.015;
        if (oldListItemIndex > listItemIndex) {
          rotate = rotate * -1;
        }
        rotateAmount += 0.015;
        shape.rotation.x += rotate + 0.0001;
        shape.rotation.y += 0.0002;
      } else {
        shape.rotation.x += 0.0004;
        shape.rotation.y += 0.0005;
      }
    } else {
      if (isMobile) {
        shape.rotation.x += 0.0004;
        shape.rotation.y += 0.0005;
      } else {
        shape.rotation.x += (mouseX / 70000) + 0.0001;
        shape.rotation.y += (mouseY / 70000) + 0.0002;
      }
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
