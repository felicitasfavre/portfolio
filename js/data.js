/*
  Editable data for the portfolio.
  - Cambiá textos, links, habilitá/deshabilitá secciones aquí.
  - No se requieren conocimientos técnicos: editá las URLs y los textos.
*/

window.PORTFOLIO_DATA = {
  author: 'Felicitas Favre',
  claim: 'Artista digital — Dirección de arte & Contenido audiovisual',
  about: {
    text: 'Artista digital y creadora de contenido con sensibilidad editorial. Especializada en video vertical, fotografía, iluminación y dirección creativa. Trabajo con marcas, productoras y equipos creativos para producir piezas con criterio estético y técnica.',
    image: 'assets/img/about-vertical.jpg'
  },
  contact: {
    instagram: 'https://instagram.com/felicitasfavre',
    email: 'felicitasfavre@gmail.com'
  },
  sections: [
    {id: 'hero', enabled: true},
    {id: 'about', enabled: true},
    {id: 'videos', enabled: true},
    {id: 'photos', enabled: true},
    {id: 'services', enabled: true},
    {id: 'contact', enabled: true}
  ],
  videos: [
    /* Añadir objetos con {title, poster, src} - src opcional para integrar videos locales */
    {title: 'Reel 1', poster: 'assets/img/video-thumb-1.jpg', src: 'https://drive.google.com/uc?export=download&id=1mB9wzHQfF1zrHNbsGN0RlgCiym9LhqjB'},
    {title: 'Reel 2', poster: 'assets/img/video-thumb-2.jpg', src: 'https://drive.google.com/uc?export=download&id=1I5Y0oLbxeJNgWGhvFQ024a8nUxj77Sim'},
    {title: 'Reel 3', poster: 'assets/img/video-thumb-3.jpg', src: 'https://drive.google.com/uc?export=download&id=1dSvTkHl2ai6XLNT59T6bXZacwLQMJN4R'}
  ],
  photos: [
    {title: 'Editorial 1', src: 'assets/img/photo-1.jpg'},
    {title: 'Editorial 2', src: 'assets/img/photo-2.jpg'},
    {title: 'Editorial 3', src: 'assets/img/photo-3.jpg'}
  ],
  services: [
    {title: 'Creación de Contenido Audiovisual', desc: 'Producción y dirección para campañas y reels.'},
    {title: 'Community & Marketing', desc: 'Estrategia de contenido y community management.'},
    {title: 'Dirección de Arte', desc: 'Estética editorial y sceneries para piezas visuales.'}
  ]
}
