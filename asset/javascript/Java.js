// Script: featured slider, menu toggle, and lightbox
document.addEventListener('DOMContentLoaded', function(){
  // Featured games slider
  const track = document.querySelector('.featured-track');
  const cards = document.querySelectorAll('.featured-card');
  const prev = document.querySelector('.featured-prev');
  const next = document.querySelector('.featured-next');
  const dotsContainer = document.querySelector('.featured-dots');
  
  let currentSlide = 0;
  
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('featured-dot');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.featured-dot');
  if(dots.length) dots[0].classList.add('active');
  
  function updateSlider() {
    const slideWidth = cards[0].offsetWidth + 32; // width + gap
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function goToSlide(n) {
    currentSlide = n;
    if(currentSlide < 0) currentSlide = cards.length - 1;
    if(currentSlide >= cards.length) currentSlide = 0;
    updateSlider();
  }
  
  if(prev) prev.addEventListener('click', () => goToSlide(currentSlide - 1));
  if(next) next.addEventListener('click', () => goToSlide(currentSlide + 1));
  
  // Auto-slide every 5s
  setInterval(() => goToSlide(currentSlide + 1), 5000);

  // year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();	// menu toggle
	const btn = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.nav');
	if(btn && nav){
		btn.addEventListener('click', ()=>{
			const expanded = btn.getAttribute('aria-expanded') === 'true';
			btn.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('open');
		});
	}

	// lightbox
	const galleryImgs = document.querySelectorAll('.gallery-grid img');
	const lightbox = document.getElementById('lightbox');
	const lbImg = lightbox && lightbox.querySelector('img');
	const caption = lightbox && lightbox.querySelector('.caption');
	const closeBtn = lightbox && lightbox.querySelector('.lightbox-close');

	function openLightbox(src, alt){
		if(!lightbox) return;
		lbImg.src = src; lbImg.alt = alt || '';
		caption.textContent = alt || '';
		lightbox.setAttribute('aria-hidden','false');
	}

	function closeLightbox(){
		if(!lightbox) return;
		lightbox.setAttribute('aria-hidden','true');
		lbImg.src = '';
	}

	galleryImgs.forEach(img=>{
		img.addEventListener('click', ()=>{
			const full = img.dataset.full || img.src;
			openLightbox(full, img.alt);
		});
	});

	if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
	if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
	document.addEventListener('keyup', (e)=>{ if(e.key === 'Escape') closeLightbox(); });
});



