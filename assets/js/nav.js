var isMobile = require('./browser-detect').isMobile();
var navActive = false;
var navToggle = document.querySelectorAll('.header__nav-toggle')[0];
var nav = document.querySelectorAll('.header__nav')[0];
var logo = document.getElementById('xbld');
var navActiveCallback;

var handleNavToggleHover = function (e) {
  navToggle.classList.toggle('header__nav-toggle--hover');
};

var handleNavToggleClick = function (e) {
  navActive = !navActive;
  logo.classList.toggle('logo--hide');
  nav.classList.toggle('header__nav--open');
  navToggle.classList.toggle('header__nav-toggle--open');

  if (navActiveCallback) {
    navActiveCallback(navActive);
  }
};

navToggle.addEventListener('click', handleNavToggleClick);

if (!isMobile) {
  navToggle.addEventListener('mouseenter', handleNavToggleHover);
  navToggle.addEventListener('mouseleave', handleNavToggleHover);
}

module.exports.navActiveTriggered = function (callback) {
  navActiveCallback = callback;
}

module.exports.navActive = function () {
  return navActive;
};
