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

/* Orange bar fills across the top bar as you scroll down the page */
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
