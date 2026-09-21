/* Mobile nav toggle + contact form behaviour */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  var form = document.getElementById('inquiry-form');
  if (!form) return;

  // Preselect the topic from links like /contact/?topic=Wedding%20or%20event
  var topic = new URLSearchParams(window.location.search).get('topic');
  var select = form.querySelector('select[name="topic"]');
  if (topic && select) {
    Array.prototype.forEach.call(select.options, function (o) {
      if (o.text === topic) select.value = o.value;
    });
  }

  // With no form service configured, open the visitor's email app with the message filled in.
  if (form.dataset.mailto) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var lines = [
        'Name: ' + f.get('name'),
        'Email: ' + f.get('email'),
        'About: ' + f.get('topic'),
        f.get('date') ? 'Date needed: ' + f.get('date') : '',
        '',
        f.get('message')
      ].filter(function (l, i) { return l !== '' || i === 4; });
      var href = 'mailto:' + form.dataset.email +
        '?subject=' + encodeURIComponent('Mountain Whisk inquiry: ' + f.get('topic')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      var status = form.querySelector('.form-status');
      if (status) status.textContent = 'Opening your email app to send your message…';
      window.location.href = href;
    });
  }
})();
