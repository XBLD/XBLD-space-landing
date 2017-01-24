require('./starfield');
require('./gradient');
require('./form');
var contact = require('./contact-animations');
var Navigo = require('navigo');
var router = new Navigo(null, true);

router
  .on('/', function () {
    contact.hide();
  })
  .on('contact', function () {
    contact.show();
  })
  .resolve();
