document.addEventListener('DOMContentLoaded', function() {
  try {
    var el = document.querySelector('.default-scroll');
    if (!el) return;
    // allow layout to settle briefly, then scroll the card stack into view
    setTimeout(function() {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } catch (e) {
    console.error('scroll-init error', e);
  }
});
