// Lightweight gallery lightbox
(function(){
  function openLightbox(src, alt) {
    var overlay = document.createElement('div');
    overlay.className = 'gl-overlay';
    overlay.tabIndex = -1;

    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    var btn = document.createElement('button');
    btn.className = 'gl-close';
    btn.innerHTML = '✕';
    btn.addEventListener('click', close);

    overlay.appendChild(img);
    overlay.appendChild(btn);

    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
    function close(){ document.body.removeChild(overlay); window.removeEventListener('keydown', onKey); }
    function onKey(e){ if (e.key === 'Escape') close(); }
    window.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    // focus for accessibility
    overlay.focus();
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('.gallery-item');
    if (!a) return;
    e.preventDefault();
    openLightbox(a.href || a.dataset.src, a.querySelector('img')?.alt);
  });
})();
