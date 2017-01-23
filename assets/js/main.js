require('./starfield');
require('./gradient');
require('./form');
var contact = require('./contact-animations');
var Navigo = require('navigo');
var root = null;
var useHash = false;
var router = new Navigo(root, useHash);

router
  .on('/', function () {
    contact.hide();
  })
  .on('/contact', function () {
    contact.show();
  })
  .resolve();
