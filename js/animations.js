/* Simple scroll reveal and small animations using IntersectionObserver.
   Designed to be subtle and performant. */
(function(){
  function initReveal(){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      })
    },{threshold:0.1});

    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }

  window.PortfolioAnimations = {initReveal};
})();
