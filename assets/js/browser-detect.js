var UAParser = require('ua-parser-js');
var parser = new UAParser();
var device = parser.getDevice().type;
var isMobile = device === 'mobile' || device === 'tablet';
var browser = parser.getBrowser().name;

if (isMobile) {
  document.body.classList.add('is-mobile');
}

if (browser) {
  document.body.classList.add('is-' + browser.replace(' ','-').toLowerCase());
}

module.exports.isMobile = function () {
  return isMobile;
};
