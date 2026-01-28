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

    // load Reveal.js then initialize
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
          backgroundTransition: 'fade'
        });

        Reveal.on && Reveal.on('slidechanged', event => {
          const btn = document.querySelector('.back-btn');
          if (btn) btn.style.display = event.indexv > 0 ? 'block' : 'none';
        });
      } catch (e){ console.error('Reveal init failed', e); }
    };
    document.body.appendChild(s);

  } catch (err){
    console.error('Error loading partials', err);
  }
})();
