
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-faq]').forEach(function (button) {
    button.addEventListener('click', function () {
      var answer = button.parentElement.querySelector('.faq-answer');
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.querySelector('.faq-icon').textContent = expanded ? '+' : '−';
      if (answer) answer.hidden = expanded;
    });
  });

  var params = new URLSearchParams(window.location.search);
  var styleRef = params.get('style');
  var category = params.get('category');
  var formMessage = document.getElementById('message');
  var styleInput = document.getElementById('style-ref');
  var categorySelect = document.getElementById('category');
  if (styleRef && styleInput) {
    styleInput.value = styleRef;
  }
  if (category && categorySelect) {
    Array.from(categorySelect.options).forEach(function (option) {
      if (option.value === category || option.text === category) {
        categorySelect.value = option.value || option.text;
      }
    });
  }
  if ((styleRef || category) && formMessage) {
    var prefix = [];
    if (styleRef) prefix.push('Style reference: ' + styleRef);
    if (category) prefix.push('Category: ' + category);
    var text = prefix.join('\n');
    if (formMessage.value.trim() === '') {
      formMessage.value = text + '\n';
    } else if (formMessage.value.indexOf(text) !== 0) {
      formMessage.value = text + '\n' + formMessage.value;
    }
  }

});
