// Loads partial HTML files and injects into the current document.
(async function (){
  const loadText = async path => {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
    return r.text();
  };

  try{
    // head (styles + meta)
    const headHtml = await loadText('partials/head.html');
    document.head.insertAdjacentHTML('beforeend', headHtml);

    // nav (menu/back/sidebar)
    const navHtml = await loadText('partials/nav.html');
    document.body.insertAdjacentHTML('afterbegin', navHtml);

    // content (slides)
    const contentHtml = await loadText('partials/content.html');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = contentHtml;
    document.body.appendChild(wrapper);

    // Attach simple nav handlers now (fallback if Reveal not ready)
    const attachNavHandlers = () => {
      document.querySelectorAll('.nav-link').forEach(el => {
        el.removeEventListener('click', el._navClick);
        el._navClick = function (ev) {
          ev.preventDefault();
          const h = parseInt(this.dataset.h || '0', 10) || 0;
          const v = parseInt(this.dataset.v || '0', 10) || 0;
          if (window.Reveal && typeof Reveal.slide === 'function') {
            Reveal.slide(h, v);
          } else {
            window.location.hash = `#/${h}/${v}`;
          }
          // try to close bootstrap offcanvas if present
          try {
            if (window.bootstrap) {
              const oc = document.getElementById('navOffcanvas');
              const instance = bootstrap.Offcanvas.getInstance(oc) || new bootstrap.Offcanvas(oc);
              instance.hide();
            }
          } catch (e) { /* ignore */ }
        };
        el.addEventListener('click', el._navClick);
      });
    };

    attachNavHandlers();

    // load Bootstrap JS (for offcanvas behavior), then Reveal.js
    const b = document.createElement('script');
    b.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    b.onload = () => { /* bootstrap ready */ };
    document.body.appendChild(b);

    // load Reveal.js then initialize and re-attach nav handlers
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.2.1/reveal.min.js';
    s.onload = () => {
      try{
        Reveal.initialize({
          controls: false,
          progress: true,
          slideNumber: 'c/t',
          navigationMode: 'linear',
          overview: false,
          transition: 'slide',
          backgroundTransition: 'fade',
          hash: true
        });

        Reveal.on && Reveal.on('slidechanged', event => {
          const btn = document.querySelector('.back-btn');
          if (btn) btn.style.display = event.indexv > 0 ? 'block' : 'none';
        });

        // re-attach nav handlers now that Reveal is available
        attachNavHandlers();
      } catch (e){ console.error('Reveal init failed', e); }
    };
    document.body.appendChild(s);

  } catch (err){
    console.error('Error loading partials', err);
  }
})();
