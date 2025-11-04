// Script: menu toggle + lightbox for the gallery
document.addEventListener('DOMContentLoaded', function(){
	// year in footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// menu toggle
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