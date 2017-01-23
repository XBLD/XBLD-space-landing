var lines = document.querySelectorAll('.dong');
var contact = document.querySelectorAll('.contact')[0];
var contactButton = document.querySelectorAll('.social__item--contact')[0];
var gradientBackground = document.querySelectorAll('.contact__background')[0];
var isOpen = false;
// contactButton.addEventListener('click', function () {
//   contact.classList.add('is-open');
//   // lines.forEach(function (line) {
//   //   line.classList.add('slide-in');
//   // });  
// });


module.exports.show = function () {
  isOpen = true;
  document.body.classList.add('contact-open');
};

module.exports.hide = function () {
  if (isOpen) {
    document.body.classList.remove('contact-open');
    document.body.classList.add('contact-closed');
    setTimeout(function () {
      document.body.classList.remove('contact-closed');
    }, 1500);  
  }
};
