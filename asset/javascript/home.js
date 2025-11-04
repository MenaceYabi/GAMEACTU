// home.js — ~40 lignes
document.addEventListener('DOMContentLoaded', function(){
  // année
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // menu toggle
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // lightbox minimal
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('img');
  const caption = lightbox && lightbox.querySelector('.caption');
  const closeBtn = lightbox && lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      if(!lightbox) return;
      lbImg.src = img.dataset.full || img.src;
      lbImg.alt = img.alt || '';
      caption.textContent = img.alt || '';
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  function closeLB(){ if(!lightbox) return; lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; }
  if(closeBtn) closeBtn.addEventListener('click', closeLB);
  if(lightbox) lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLB(); });
  document.addEventListener('keyup', e=>{ if(e.key==='Escape') closeLB(); });
});
