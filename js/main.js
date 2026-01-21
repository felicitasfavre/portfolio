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
    data.videos.forEach(v=>{
      const el = document.createElement('article'); el.className='card reveal';
      el.innerHTML = `
        <div class="media-vertical">
          <img loading="lazy" src="${v.poster}" alt="${v.title}">
        </div>
        <div style="padding:10px"><strong>${v.title}</strong></div>
      `;
      grid.appendChild(el);
    })
  }

  function renderPhotos(data){
    const grid = $('#photos-grid'); grid.innerHTML='';
    data.photos.forEach(p=>{
      const el = document.createElement('figure'); el.className='card reveal';
      el.innerHTML = `<div class="media-vertical"><img loading="lazy" src="${p.src}" alt="${p.title}"></div>`;
      grid.appendChild(el);
    })
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
  }

  document.addEventListener('DOMContentLoaded', init);

  window.PortfolioMain = {init};
})();
