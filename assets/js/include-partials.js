                // --- NAVIGATION GATING STATE ---
                // Track visited topics per section (sections 1-5)
                let sectionTopicKeys, visitedTopics;
                let bg_veil = 'rgba(63, 62, 62, 0.79);';
                let font_color = '#fafafd';
                
                // Set CSS variables so mobile CSS can use the same values
                document.documentElement.style.setProperty('--content-bg-veil', bg_veil);
                document.documentElement.style.setProperty('--content-font-color', font_color);
                
                // Helper: mark topic as visited
                function markTopicVisited(sectionIdx, topicKey) {
                  if (sectionIdx >= 0 && sectionIdx < visitedTopics.length) {
                    visitedTopics[sectionIdx].add(topicKey);
                    updateMenuLocks();
                  }
                }

                // Helper: check if all topics in section are visited
                function allTopicsVisited(sectionIdx) {
                  return (
                    sectionIdx >= 0 && sectionIdx < sectionTopicKeys.length &&
                    visitedTopics[sectionIdx].size === sectionTopicKeys[sectionIdx].length
                  );
                }

                // Helper: update menu links (disable next section if not all topics visited)
                function updateMenuLocks() {
                  const navLinks = document.querySelectorAll('.nav-link');
                  for (let i = 1; i <= 5; ++i) {
                    if (i === 1 || allTopicsVisited(i - 2)) {
                      navLinks[i].classList.remove('disabled');
                      navLinks[i].setAttribute('aria-disabled', 'false');
                    } else {
                      navLinks[i].classList.add('disabled');
                      navLinks[i].setAttribute('aria-disabled', 'true');
                    }
                  }
                  // Enable Conclusion if section 5 complete
                  if (allTopicsVisited(4)) {
                    navLinks[6].classList.remove('disabled');
                    navLinks[6].setAttribute('aria-disabled', 'false');
                  } else {
                    navLinks[6].classList.add('disabled');
                    navLinks[6].setAttribute('aria-disabled', 'true');
                  }
                }

                // --- SECTION 5 TOPIC LOGIC ---
                const section5Topics = {
                  'acceso': {
                    title: 'Acceso Restringido',
                    html: `<p>Menor privilegio: solo necesario y temporal.</p>`,
                    image: 'assets/images/acceso.jpg'
                  },
                  'registro': {
                    title: 'Registro de Actividades',
                    html: `<p>Logs de accesos y revisión regular.</p>`,
                    image: 'assets/images/registro.jpg'
                  },
                  'manejo': {
                    title: 'Manejo de Datos de Clientes',
                    html: `<p>Anonimiza. No copies a personales. Aviso de privacidad.</p>`,
                    image: 'assets/images/manejo.jpg'
                  },
                  'salarios': {
                    title: 'Protección de Salarios',
                    html: `<p>Sistemas encriptados. No discutir en común.</p>`,
                    image: 'assets/images/salarios.jpg'
                  },
                  'compliance': {
                    title: 'Capacitación en Compliance',
                    html: `<p><a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" style="color:#007bff;text-decoration:underline;">LFPDPPP</a>, PCI-DSS, CNBV. Certifícate.</p>`,
                    image: 'assets/images/compliance.jpg'
                  },
                  'respuesta': {
                    title: 'Respuesta a Incidentes',
                    html: `<p>Plan específico. Notifica afectados e INAI (72 h).</p>`,
                    image: 'assets/images/respuesta.jpg'
                  },
                  'herramientas': {
                    title: 'Herramientas Avanzadas',
                    html: `<p>DLP para bloquear fugas. Microsoft 365 DLP.</p>`,
                    image: 'assets/images/herramientas.jpg'
                  },
                  'evaluaciones': {
                    title: 'Evaluaciones de Riesgo',
                    html: `<p>Revisiones periódicas. Frameworks NIST.</p>`,
                    image: 'assets/images/evaluaciones.jpg'
                  }
                };

                function setupSection5Topics() {
                  const slide = document.querySelector('.custom-slide[data-slide="5"]');
                  const content = document.getElementById('section5-content');
                  if (!slide || !content) return;
                  slide.querySelectorAll('.topic-link').forEach(btn => {
                    btn.addEventListener('click', function() {
                      btn.classList.add('visited');
                      const topic = btn.dataset.topic;
                      if (topic) markTopicVisited(4, topic);
                      slide.querySelectorAll('.topic-link').forEach(b => b.classList.remove('active'));
                      btn.classList.add('active');
                      if (section5Topics[topic]) {
                        content.innerHTML = `<div style="background:`+ bg_veil +`;padding:1.5rem;border-radius:0.5rem;"><h3 style="color:#000;margin-bottom:1rem;">${section5Topics[topic].title}</h3><div style="color:`+font_color+`;font-size:1.1rem;line-height:1.6;">${section5Topics[topic].html}</div></div>`;
                        if (section5Topics[topic].image) {
                          content.style.backgroundImage = `url('${section5Topics[topic].image}')`;
                          content.style.backgroundSize = 'cover';
                          content.style.backgroundPosition = 'center';
                        }
                      }
                    });
                  });
                }
            // --- SECTION 4 TOPIC LOGIC ---
            const section4Topics = {
              'encripta': {
                title: 'Encripta Datos',
                html: `<p>AES-256 en archivos y correos. Ejemplo: VeraCrypt.</p>`,
                image: 'assets/images/encripta.jpg'
              },
              'intercambio': {
                title: 'Intercambio Controlado',
                html: `<p>SharePoint con permisos. Evita email personal.</p>`,
                image: 'assets/images/intercambio.jpg'
              },
              'monitorea': {
                title: 'Monitorea Actividades',
                html: `<p>Logs y SIEM para anomalías.</p>`,
                image: 'assets/images/monitorea.jpg'
              },
              'redes': {
                title: 'Evita Redes Sociales',
                html: `<p>No publicar info trabajo. Ajusta privacidad.</p>`,
                image: 'assets/images/redes.jpg'
              },
              'perdidos': {
                title: 'Dispositivos Perdidos',
                html: `<p>Reporta inmediatamente. Borrado remoto.</p>`,
                image: 'assets/images/perdidos.jpg'
              },
              'auditorias': {
                title: 'Auditorías Regulares',
                html: `<p>Revisa accesos y permisos. Cumple <a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" style="color:#007bff;text-decoration:underline;">LFPDPPP</a>.</p>`,
                image: 'assets/images/auditorias.jpg'
              }
            };

            function setupSection4Topics() {
              const slide = document.querySelector('.custom-slide[data-slide="4"]');
              const content = document.getElementById('section4-content');
              if (!slide || !content) return;
              slide.querySelectorAll('.topic-link').forEach(btn => {
                btn.addEventListener('click', function() {
                  btn.classList.add('visited');
                  const topic = btn.dataset.topic;
                  if (topic) markTopicVisited(3, topic);
                  slide.querySelectorAll('.topic-link').forEach(b => b.classList.remove('active'));
                  btn.classList.add('active');
                  if (section4Topics[topic]) {
                    content.innerHTML = `<div style="background:`+ bg_veil +`;padding:1.5rem;border-radius:0.5rem;"><h3 style="color:#000;margin-bottom:1rem;">${section4Topics[topic].title}</h3><div style="color:`+font_color+`;font-size:1.1rem;line-height:1.6;">${section4Topics[topic].html}</div></div>`;
                    if (section4Topics[topic].image) {
                      content.style.backgroundImage = `url('${section4Topics[topic].image}')`;
                      content.style.backgroundSize = 'cover';
                      content.style.backgroundPosition = 'center';
                    }
                  }
                });
              });
            }
        // --- SECTION 3 TOPIC LOGIC ---
        const section3Topics = {
          'fisicos': {
            title: 'Documentos Físicos',
            html: `<p>Almacena en gabinetes cerrados. Tritura al desechar.</p>`,
            image: 'assets/images/fisicos.jpg'
          },
          'escritorio': {
            title: 'Escritorio Limpio',
            html: `<p>Siempre al alejarte. Guarda documentos, elimina notas.</p>`,
            image: 'assets/images/escritorio.jpg'
          },
          'bloqueo': {
            title: 'Bloqueo de Pantallas',
            html: `<p>Ctrl+Alt+Del al alejarte. Auto-bloqueo en 5 min.</p>`,
            image: 'assets/images/bloqueo.jpg'
          },
          'dispositivos': {
            title: 'Uso de Dispositivos',
            html: `<p>No USBs sin verificar. Prohibido personales.</p>`,
            image: 'assets/images/dispositivos.jpg'
          },
          'phishing': {
            title: 'Phishing',
            html: `<p>Verifica remitente. No abras adjuntos sospechosos.</p>`,
            image: 'assets/images/phishing.jpg'
          },
          'remoto': {
            title: 'Trabajo Remoto',
            html: `<p>VPN obligatoria. No discutir sensible en público.</p>`,
            image: 'assets/images/remoto.jpg'
          },
          'capacitacion': {
            title: 'Capacitación Continua',
            html: `<p>Talleres anuales sobre <a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" style="color:#007bff;text-decoration:underline;">LFPDPPP</a> y amenazas.</p>`,
            image: 'assets/images/capacitacion.jpg'
          }
        };

        function setupSection3Topics() {
          const slide = document.querySelector('.custom-slide[data-slide="3"]');
          const content = document.getElementById('section3-content');
          if (!slide || !content) return;
          slide.querySelectorAll('.topic-link').forEach(btn => {
            btn.addEventListener('click', function() {
              btn.classList.add('visited');
              const topic = btn.dataset.topic;
              if (topic) markTopicVisited(2, topic);
              slide.querySelectorAll('.topic-link').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              if (section3Topics[topic]) {
                content.innerHTML = `<div style="background:`+ bg_veil +`;padding:1.5rem;border-radius:0.5rem;"><h3 style="color:#000;margin-bottom:1rem;">${section3Topics[topic].title}</h3><div style="color:`+font_color+`;font-size:1.1rem;line-height:1.6;">${section3Topics[topic].html}</div></div>`;
                if (section3Topics[topic].image) {
                  content.style.backgroundImage = `url('${section3Topics[topic].image}')`;
                  content.style.backgroundSize = 'cover';
                  content.style.backgroundPosition = 'center';
                }
              }
            });
          });
        }
    // --- SECTION 2 TOPIC LOGIC ---
    const section2Topics = {
      'complejas': {
        title: 'Contraseñas Complejas',
        html: `<p>12+ caracteres, mix. Ej: "P@ssw0rdSegura2023!". Evita brute force.</p>`,
        image: 'assets/images/complejas.jpg'
      },
      'noreutilizar': {
        title: 'No Reutilizar',
        html: `<p>Una única por cuenta. Monitorea brechas en Have I Been Pwned.</p>`,
        image: 'assets/images/noreutilizar.jpg'
      },
      '2fa': {
        title: '2FA',
        html: `<p>Activa 2FA siempre. Ejemplo: Código SMS o app.</p><p>Segundo factor bloquea accesos robados.</p>`,
        image: 'assets/images/2fa.jpg'
      },
      'gestores': {
        title: 'Gestores de Contraseñas',
        html: `<p>LastPass, Bitwarden. Genera y almacena seguras.</p>`,
        image: 'assets/images/gestores.jpg'
      },
      'cambio': {
        title: 'Cambio Periódico',
        html: `<p>Cambia cada 90 días, inmediatamente tras incidente.</p><p>Automatiza recordatorios.</p>`,
        image: 'assets/images/cambio.jpg'
      },
      'nocompartir': {
        title: 'No Compartir',
        html: `<p>Nunca por email/chat. Usa compartición segura.</p><p>Riesgo: Fugas accidentales.</p>`,
        image: 'assets/images/nocompartir.jpg'
      }
    };

    function setupSection2Topics() {
      const slide = document.querySelector('.custom-slide[data-slide="2"]');
      const content = document.getElementById('section2-content');
      console.log('[Section2] slide:', slide, 'content:', content);
      if (!slide || !content) {
        console.error('[Section2] Missing elements');
        return;
      }
      const buttons = slide.querySelectorAll('.topic-link');
      console.log('[Section2] Found', buttons.length, 'topic buttons');
      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const topic = btn.dataset.topic;
          console.log('[Section2] Button clicked:', topic);
          btn.classList.add('visited');
          if (topic) markTopicVisited(1, topic);
          slide.querySelectorAll('.topic-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (section2Topics[topic]) {
            content.innerHTML = `<div style="background:`+ bg_veil +`;padding:1.5rem;border-radius:0.5rem;"><h3 style="color:#000;margin-bottom:1rem;">${section2Topics[topic].title}</h3><div style="color:`+font_color+`;font-size:1.1rem;line-height:1.6;">${section2Topics[topic].html}</div></div>`;
            if (section2Topics[topic].image) {
              content.style.backgroundImage = `url('${section2Topics[topic].image}')`;
              content.style.backgroundSize = 'cover';
              content.style.backgroundPosition = 'center';
            }
            console.log('[Section2] Content updated for topic:', topic);
          } else {
            console.error('[Section2] Topic not found:', topic);
          }
        });
      });
    }
// Loads partial HTML files and injects into the current document.
(async function (){
  const loadText = async path => {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
    return r.text();
  };

  try{
    // head (styles + meta) — inject into <head>
    const headHtml = await loadText('partials/head.html');
    document.head.insertAdjacentHTML('beforeend', headHtml);
    console.log('[Loader] Head partial loaded');

    // nav (menu/back/sidebar) — inject as very first element in body
    const navHtml = await loadText('partials/nav.html');
    if (document.body.firstChild) {
      document.body.insertAdjacentHTML('afterbegin', navHtml);
    } else {
      document.body.innerHTML = navHtml + document.body.innerHTML;
    }
    console.log('[Loader] Nav partial loaded at very top');

    // content (slides with .reveal wrapper) — inject into body
    const contentHtml = await loadText('partials/content.html');
    document.body.insertAdjacentHTML('beforeend', contentHtml);
    console.log('[Loader] Content partial loaded');

    // Initialize custom slide navigation
    (function() {
        let currentSlide = 0;
        let slides, prevBtn, nextBtn;

        function showSlide(n) {
            if (!slides || slides.length === 0) return;
            
            // Check if user can navigate to the requested slide (gating logic)
            if (n > currentSlide) {
                // Trying to go forward - check if current section is complete
                // Slides 1-5 are sections 1-5 (index 0-4 in visitedTopics array)
                if (currentSlide >= 1 && currentSlide <= 5) {
                    const sectionIdx = currentSlide - 1;
                    if (!allTopicsVisited(sectionIdx)) {
                        alert(`Por favor, visita todos los temas de esta sección antes de continuar.`);
                        return; // Block navigation
                    }
                }
            }
            
            slides.forEach(s => s.style.display = 'none');
            currentSlide = n;
            if (currentSlide >= slides.length) currentSlide = slides.length - 1;
            if (currentSlide < 0) currentSlide = 0;
            slides[currentSlide].style.display = 'flex';
            
            if (prevBtn) prevBtn.style.display = currentSlide === 0 ? 'none' : 'block';
            if (nextBtn) nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
            
            window.location.hash = `#/${currentSlide}`;
        }

        window.initCustomSlides = function() {
            slides = document.querySelectorAll('.custom-slide');
            prevBtn = document.getElementById('prevBtn');
            nextBtn = document.getElementById('nextBtn');

            if (!slides || slides.length === 0) {
                console.error('[CustomSlides] No slides found');
                return;
            }

            if (prevBtn) prevBtn.onclick = () => showSlide(currentSlide - 1);
            if (nextBtn) nextBtn.onclick = () => showSlide(currentSlide + 1);

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'PageUp') showSlide(currentSlide - 1);
                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                    e.preventDefault();
                    showSlide(currentSlide + 1);
                }
            });

            // Hash navigation for menu links
            window.addEventListener('hashchange', () => {
                const hashSlide = parseInt(window.location.hash.split('/')[1]);
                if (!isNaN(hashSlide)) showSlide(hashSlide);
            });

            // Initialize from hash or start at slide 0
            if (window.location.hash) {
                const hashSlide = parseInt(window.location.hash.split('/')[1]);
                if (!isNaN(hashSlide)) currentSlide = hashSlide;
            }
            showSlide(currentSlide);
            console.log('[CustomSlides] Initialized with', slides.length, 'slides, starting at slide', currentSlide);
        };
    })();

    console.log('[Loader] Custom slide navigation defined');

    // --- SECTION 1 TOPIC LOGIC ---
    const section1Topics = {
      'confidencialidad': {
        title: 'Confidencialidad',
        html: `<p>Protege datos de accesos no autorizados. Ejemplo: Encriptar emails sensibles.</p><p>En México, alineado con <a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" style="color:#007bff;text-decoration:underline;">LFPDPPP</a>.</p>`,
        image: 'assets/images/confidencialidad.jpg'
      },
      'integridad': {
        title: 'Integridad',
        html: `<p>Asegura datos no alterados. Usa checksums o firmas digitales.</p><p>Previene fraudes en registros financieros.</p>`,
        image: 'assets/images/integridad.jpg'
      },
      'disponibilidad': {
        title: 'Disponibilidad',
        html: `<p>Garantiza acceso cuando sea necesario. Backups y recuperación.</p><p>En PYMEs, evita pérdidas por downtime.</p>`,
        image: 'assets/images/disponibilidad.jpg'
      },
      'clasifica': {
        title: 'Clasifica la Información',
        html: `<p>Públicos, internos, confidenciales, restringidos. Etiqueta documentos.</p><p>Datos personales protegidos por <a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" style="color:#007bff;text-decoration:underline;">LFPDPPP</a>.</p>`,
        image: 'assets/images/clasifica.jpg'
      },
      'necesidad': {
        title: 'Necesidad de Saber',
        html: `<p>Accede solo a lo esencial para tu rol. Implementa RBAC.</p>`,
        image: 'assets/images/necesidad.jpg'
      },
      'reporta': {
        title: 'Reporta Incidentes',
        html: `<p>Notifica a TI inmediatamente. INAI en 72 h si datos personales.</p>`,
        image: 'assets/images/reporta.jpg'
      },
      'actualiza': {
        title: 'Actualiza Dispositivos',
        html: `<p>Parches mensuales. Automatiza con WSUS o MDM.</p>`,
        image: 'assets/images/actualiza.jpg'
      }
    };

    function setupSection1Topics() {
      const slide = document.querySelector('.custom-slide[data-slide="1"]');
      const content = document.getElementById('section1-content');
      console.log('[Section1] slide:', slide, 'content:', content);
      if (!slide || !content) {
        console.error('[Section1] Missing elements - slide:', !!slide, 'content:', !!content);
        return;
      }
      const buttons = slide.querySelectorAll('.topic-link');
      console.log('[Section1] Found', buttons.length, 'topic buttons');
      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          console.log('[Section1] Button clicked:', btn.dataset.topic);
          // Mark as visited
          btn.classList.add('visited');
          // Track visit for navigation gating
          const topic = btn.dataset.topic;
          if (topic) markTopicVisited(0, topic);
          // Highlight active
          slide.querySelectorAll('.topic-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          // Show content
          if (section1Topics[topic]) {
            content.innerHTML = `<div style="background:`+ bg_veil +`;padding:1.5rem;border-radius:0.5rem;"><h3 style="color:#000;margin-bottom:1rem;">${section1Topics[topic].title}</h3><div style="color:`+font_color+`;font-size:1.1rem;line-height:1.6;">${section1Topics[topic].html}</div></div>`;
            if (section1Topics[topic].image) {
              content.style.backgroundImage = `url('${section1Topics[topic].image}')`;
              content.style.backgroundSize = 'cover';
              content.style.backgroundPosition = 'center';
            }
            console.log('[Section1] Content updated for topic:', topic);
          } else {
            console.error('[Section1] Topic not found:', topic);
          }
        });
      });
    }

    // --- PATCH NAV HANDLERS ---
    function attachNavHandlers() {
      document.querySelectorAll('.nav-link').forEach(el => {
        el.removeEventListener('click', el._navClick);
          el._navClick = function (ev) {
            if (el.classList.contains('disabled') || el.getAttribute('aria-disabled') === 'true') {
              ev.preventDefault();
              return;
            }
            // Let the href work naturally for hash navigation
            // Just close the offcanvas menu
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
    }

    // --- PATCH REVEAL NAVIGATION ---
    function patchRevealNav() {
      if (!window.Reveal) return;
      const origNext = Reveal.next;
      Reveal.next = function (...args) {
        const idx = Reveal.getIndices();
        const h = idx.h, v = idx.v;
        // If at last subsection, block next if not all visited
        const totalV = getTotalSubsections(h);
        if (v + 1 >= totalV && !allSubsectionsVisited(h, totalV)) {
          return; // block
        }
        return origNext.apply(this, args);
      };
    }

    // --- TRACK VISITS ON SLIDE CHANGE ---
    function onSlideChanged(event) {
      // No-op: handled by topic buttons now
    }

    // --- INIT PATCHES AFTER REVEAL ---
    function afterRevealInit() {
      patchRevealNav();
      Reveal.on('slidechanged', onSlideChanged);
      updateMenuLocks();
    }


    attachNavHandlers();
        
        // Initialize navigation gating state after all section topics are defined
        sectionTopicKeys = [
          Object.keys(section1Topics),
          Object.keys(section2Topics),
          Object.keys(section3Topics),
          Object.keys(section4Topics),
          Object.keys(section5Topics)
        ];
        visitedTopics = [
          new Set(), new Set(), new Set(), new Set(), new Set()
        ];

        // Block navigation to next section if not all topics visited
        function blockNextSectionNav(ev, h, v) {
          // h: horizontal index (section)
          // Only block for sections 2-6 (h=2..6)
          if (h >= 2 && h <= 6) {
            // Must have completed all topics in previous section
            if (!allTopicsVisited(h - 2)) {
              ev.preventDefault();
              // Optionally show a message
              alert('Debes leer todos los temas de la sección anterior antes de continuar.');
              return true;
            }
          }
          return false;
        }

        // --- PATCH TOPIC BUTTONS TO TRACK VISITS ---
        function patchTopicButtons() {
          // For each section 1-5
          for (let s = 0; s < 5; ++s) {
            const grid = document.querySelectorAll('.topic-grid')[s];
            if (!grid) continue;
            grid.querySelectorAll('.topic-link').forEach(btn => {
              btn.addEventListener('click', function() {
                const topic = btn.dataset.topic;
                markTopicVisited(s, topic);
              });
            });
          }
        }

        patchTopicButtons();
        updateMenuLocks();

        // --- PATCH REVEAL KEYBOARD NAVIGATION ---
        function patchRevealNavGating() {
          if (!window.Reveal) return;
          // Patch .next and .right to block next section if not all topics visited
          const origNext = Reveal.next;
          Reveal.next = function (...args) {
            const idx = Reveal.getIndices();
            // Only block horizontal navigation (sections 1-6)
            if (idx.h >= 1 && idx.h < 6 && !allTopicsVisited(idx.h - 1)) {
              alert('Debes leer todos los temas de la sección actual antes de continuar.');
              return;
            }
            return origNext.apply(this, args);
          };
          // Patch .right (keyboard right arrow)
          const origRight = Reveal.right;
          Reveal.right = function (...args) {
            const idx = Reveal.getIndices();
            if (idx.h >= 1 && idx.h < 6 && !allTopicsVisited(idx.h - 1)) {
              alert('Debes leer todos los temas de la sección actual antes de continuar.');
              return;
            }
            return origRight.apply(this, args);
          };
        }
        // Patch after Reveal is loaded
        setTimeout(patchRevealNavGating, 500);
    console.log('[Loader] Nav handlers and Section 1/2/3/4/5 topic logic attached');

    // Attach Volver button handler: always go to main section (h=1, v=0) for Section 1
    setTimeout(() => {
      const volverBtn = document.getElementById('volverBtn');
      if (volverBtn && window.Reveal) {
        volverBtn.onclick = function() {
          if (window.Reveal && typeof Reveal.slide === 'function') {
            Reveal.slide(1, 0);
          } else {
            window.location.hash = `#/1/0`;
          }
        };
      }
    }, 200);

    // load Bootstrap JS (for offcanvas behavior)
    const loadScript = (src) => new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = rej;
      document.body.appendChild(s);
    });

    await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js');
    console.log('[Loader] Bootstrap loaded');

    // load local Reveal.js and initialize
    // Reveal.js is no longer used - custom slide navigation is in content.html
    console.log('[Loader] Using custom slide navigation');
    
    // Re-attach nav handlers for menu
    attachNavHandlers();
    console.log('[Loader] Nav handlers attached');
    
    // Initialize custom slide navigation after a brief delay to ensure DOM is ready
    setTimeout(() => {
      if (window.initCustomSlides) {
        window.initCustomSlides();
        // Setup topic click handlers after slides are initialized
        setupSection1Topics();
        setupSection2Topics();
        setupSection3Topics();
        setupSection4Topics();
        setupSection5Topics();
        console.log('[Loader] Topic handlers attached for all sections');
      } else {
        console.error('[Loader] initCustomSlides not found');
      }
    }, 50);
    
    if (false) {
      console.error('[Loader] Reveal not found after loading script');
    }

  } catch (err){
    console.error('[Loader] Error loading partials', err);
  }
})();

