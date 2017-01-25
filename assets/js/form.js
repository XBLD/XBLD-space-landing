var styleSelect = require('styleselect');
var contactSubmitButton = document.getElementById('contact-submit');
var contact = document.querySelectorAll('.contact__content')[0];
var selects = document.querySelectorAll('.select');
var inputs = {
  name: {
    isRequired: true
  },
  email: {
    isRequired: true,
    validate: function (value) {
      return validateEmail(value);
    }
  },
  phone: {
    isRequired: false
  },
  company: {
    isRequired: false
  },
  services: {
    isRequired: true,
    validate: function (value) {
      return value.toLowerCase() !== 'services';
    }
  },
  summary: {
    isRequired: true
  }
};

var toggleFocus = function (field) {
  field.parentNode.classList.toggle('is-focused');
};

var hasError = function (field) {
  return field.parentNode.classList.contains('has-error');
};

var setError = function (field, hasError) {
  if (hasError) {
    field.parentNode.classList.add('has-error');
  } else {
    field.parentNode.classList.remove('has-error');
  }
};

var validateEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var validateField = function (input, field) {
  if (inputs[input].isRequired && field.value.length < 1) {
    return false;
  } else if (inputs[input].validate && !inputs[input].validate(field.value)) {
    return false;
  }
  return true; 
};

var validateAllFields = function () {
  var hasError;
  Object.keys(inputs).forEach(function (input) {
    if (!validateField(input, inputs[input].field)) {
      setError(inputs[input].field, true);
      hasError = true;
    }
  });
  return hasError;
};

var handleContactSubmit = function (e) {
  var hasError = false;

  if (!validateAllFields()) {
    var xhr = new XMLHttpRequest();
    contactSubmitButton.classList.add('is-loading');
    xhr.open('POST', 'https://formspree.io/info@xbld.io');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name: inputs.name.field.value,
      email: inputs.email.field.value,
      company: inputs.company.field.value,
      phone: inputs.phone.field.value,
      services: inputs.services.field.value,
      summary: inputs.summary.field.value
    }));
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        contact.classList.add('is-completed');
      } else if (xhr.readyState === 4) {
        contactSubmitButton.classList.remove('is-loading');
        contact.classList.add('has-error');
      }
    };
  }
};

Object.keys(inputs).forEach(function (input) {
  var field = document.getElementById(input);
  
  inputs[input].field = field;

  field.addEventListener('focus', function (e) {
    toggleFocus(e.target);
  });

  field.addEventListener('blur', function (e) {
    toggleFocus(e.target);

    if (!validateField(input, field)) {
      setError(field, true);
    } else {
      setError(field, false);
    }
  });

  if (input === 'services') {
    field.addEventListener('change', function (e) {
      if (hasError(field)) {
        if (validateField(input, field)) {
          setError(field, false);
        }
      }
      field.parentNode.classList.add('has-value');
      field.parentNode.dataset.value = field.value;
    });
  } else {
    field.addEventListener('keydown', function (e) {
      if (hasError(field)) {
        if (validateField(input, field)) {
          setError(field, false);
        }
      }
    });
  }
});

selects.forEach(function (select) {
  styleSelect(select);
});

contactSubmitButton.addEventListener('click', handleContactSubmit);

module.exports = '';
