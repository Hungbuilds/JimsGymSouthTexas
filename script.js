/* Jim's Gym — micro-interactions */

/* Scroll reveal: stat numbers move up into place */
(function () {
  var revealEls = document.querySelectorAll('.stat');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function (el) { io.observe(el); });
})();

/* Red bar fills across the top as you scroll down the page */
(function () {
  var bar = document.getElementById('rotateBar');
  if (!bar) return;

  function update() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* FAQ accordion */
(function () {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      items.forEach(function (other) {
        other.classList.remove('is-open');
        var otherA = other.querySelector('.faq-a');
        if (otherA) otherA.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();

/* Gallery lightbox */
(function () {
  var items = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('galleryLightbox');
  if (!items.length || !lightbox) return;

  var img = document.getElementById('galleryLightboxImg');
  var caption = document.getElementById('galleryLightboxCaption');
  var closeBtn = lightbox.querySelector('.gallery-lightbox-close');

  function open(src, alt, captionText) {
    img.src = src;
    img.alt = alt || '';
    caption.textContent = captionText || '';
    lightbox.classList.add('is-open');
  }

  function close() {
    lightbox.classList.remove('is-open');
    img.src = '';
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var itemImg = item.querySelector('img');
      var captionEl = item.querySelector('.gallery-caption');
      if (itemImg) open(itemImg.src, itemImg.alt, captionEl ? captionEl.textContent : '');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
