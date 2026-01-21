/* Main initialization and render logic.
   - Usa los datos de `js/data.js`.
   - Mantén todo editable desde `PORTFOLIO_DATA`.
*/
(function(){
  function $(sel, ctx=document){return ctx.querySelector(sel)}
  function $all(sel, ctx=document){return Array.from(ctx.querySelectorAll(sel))}

  function renderHero(data){
    $('#hero-name').textContent = data.author || 'Felicitas Favre';
    $('#hero-claim').textContent = data.claim || '';
  }

  function renderAbout(data){
    $('#about-text').textContent = data.about.text;
    const img = $('#about-media img');
    img.src = data.about.image;
    img.alt = data.author;
  }

  function renderVideos(data){
    const grid = $('#videos-grid'); grid.innerHTML='';
    const carousel = document.createElement('div'); carousel.className = 'carousel';
    // build items: try autoplay muted for local videos or youtube embeds (muted)
    const items = data.videos.map(v=>{
      const isYouTube = /youtu/.test(v.src);
      const type = isYouTube ? 'youtube' : (v.src && /\.mp4|\.webm|\.ogg/i.test(v.src) ? 'file' : 'poster');
      let mediaHtml = '';
      if(type === 'file'){
        mediaHtml = `<video class="thumb-video" playsinline autoplay muted loop preload="metadata" poster="${v.poster}"><source src="${v.src}"></video>`;
      } else if(type === 'youtube'){
        // extract id and use embed autoplay muted
        const id = (v.src.split('/').pop() || '').split('?')[0];
        const embed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0`;
        mediaHtml = `<iframe class="thumb-iframe" loading="lazy" src="${embed}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        mediaHtml = `<img loading="lazy" src="${v.poster}" alt="${v.title}">`;
      }
      return `
        <article class="card reveal" data-src="${v.src || ''}" data-type="${type}">
          <div class="media-vertical">
            ${mediaHtml}
          </div>
          <div style="padding:10px"><strong>${v.title}</strong></div>
        </article>
      `;
    }).join('');

    carousel.innerHTML = `
      <button class="carousel-btn prev" aria-label="Anterior">‹</button>
      <div class="carousel-viewport">
        <div class="carousel-track">
          ${items}
        </div>
      </div>
      <button class="carousel-btn next" aria-label="Siguiente">›</button>
    `;
    grid.appendChild(carousel);
  }

  function renderPhotos(data){
    const grid = $('#photos-grid'); grid.innerHTML='';
    const carousel = document.createElement('div'); carousel.className = 'carousel';
    carousel.innerHTML = `
      <button class="carousel-btn prev" aria-label="Anterior">‹</button>
      <div class="carousel-viewport">
        <div class="carousel-track">
          ${data.photos.map(p=>`
            <figure class="card reveal">
              <div class="media-vertical"><img loading="lazy" src="${p.src}" alt="${p.title}"></div>
            </figure>
          `).join('')}
        </div>
      </div>
      <button class="carousel-btn next" aria-label="Siguiente">›</button>
    `;
    grid.appendChild(carousel);
  }

  function renderServices(data){
    const grid = $('#services-grid'); grid.innerHTML='';
    data.services.forEach(s=>{
      const el = document.createElement('div'); el.className='services-card reveal';
      el.innerHTML = `<h3>${s.title}</h3><p>${s.desc}</p>`;
      grid.appendChild(el);
    })
  }

  function renderContact(data){
    const ig = $('#instagram-link'); ig.href = data.contact.instagram; ig.target='_blank';
    const em = $('#email-link'); em.href = data.contact.email;
  }

  // Initialize carousel controls (prev/next + keyboard focus)
  function initCarousels(){
    const carousels = $all('.carousel');
    carousels.forEach(c => {
      c.setAttribute('tabindex', '0');
      const vp = c.querySelector('.carousel-viewport');
      const btnPrev = c.querySelector('.carousel-btn.prev');
      const btnNext = c.querySelector('.carousel-btn.next');
      if(!vp) return;
      btnPrev && btnPrev.addEventListener('click', ()=>{
        vp.scrollBy({left: -Math.round(vp.clientWidth * 0.9), behavior: 'smooth'});
      });
      btnNext && btnNext.addEventListener('click', ()=>{
        vp.scrollBy({left: Math.round(vp.clientWidth * 0.9), behavior: 'smooth'});
      });
      // keyboard navigation when carousel has focus
      c.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft') btnPrev && btnPrev.click();
        if(e.key === 'ArrowRight') btnNext && btnNext.click();
      });

      // click on a card opens modal with sound
      c.querySelectorAll('.card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (ev)=>{
          ev.preventDefault();
          const src = card.getAttribute('data-src');
          const type = card.getAttribute('data-type');
          if(!src) return;
          openVideoModal(src, type);
        });
      });
    });
  }

  // Create and show modal player
  function openVideoModal(src, type){
    const modal = document.createElement('div'); modal.className = 'video-modal';
    const inner = document.createElement('div'); inner.className = 'modal-inner';
    const close = document.createElement('button'); close.className = 'modal-close'; close.setAttribute('aria-label','Cerrar'); close.innerHTML='✕';
    // build player
    if(type === 'youtube' || /youtu/.test(src)){
      const id = (src.split('/').pop() || '').split('?')[0];
      const iframe = document.createElement('iframe');
      iframe.setAttribute('allow','autoplay; encrypted-media; fullscreen');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0`;
      iframe.frameBorder = '0';
      inner.appendChild(iframe);
    } else {
      const video = document.createElement('video');
      video.controls = true; video.autoplay = true; video.playsInline = true; video.src = src; video.style.background = '#000';
      inner.appendChild(video);
    }
    modal.appendChild(inner);
    modal.appendChild(close);
    document.body.appendChild(modal);
    // focus
    close.focus();
    function cleanup(){
      document.body.removeChild(modal);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e){ if(e.key === 'Escape') cleanup(); }
    close.addEventListener('click', cleanup);
    modal.addEventListener('click', (e)=>{ if(e.target === modal) cleanup(); });
    document.addEventListener('keydown', onKey);
  }

  function applySectionsOrder(data){
    const main = document.getElementById('main');
    data.sections.forEach(s=>{
      const el = document.querySelector(`[data-section="${s.id}"]`);
      if(!el) return;
      if(!s.enabled) el.remove();
      else main.appendChild(el);
    })
  }

  function init(){
    const data = window.PORTFOLIO_DATA || {};
    renderHero(data);
    renderAbout(data);
    renderVideos(data);
    renderPhotos(data);
    renderServices(data);
    renderContact(data);
    applySectionsOrder(data);

    // footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // init animations
    if(window.PortfolioAnimations && typeof window.PortfolioAnimations.initReveal === 'function'){
      window.PortfolioAnimations.initReveal();
    }
    // init carousels after render
    initCarousels();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.PortfolioMain = {init};
})();
