require('./starfield');
require('./gradient');
require('./form');
var contact = require('./contact-animations');
var Navigo = require('navigo');
var router = new Navigo('/', true);


router
  .on('contact', function () {
    contact.show();
  })
  .on('*', function () {
    contact.hide();
  })
  .resolve();
