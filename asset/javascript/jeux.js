// jeux.js - Script pour la page des jeux phares
document.addEventListener('DOMContentLoaded', function() {
    // Mise à jour de l'année
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Menu mobile toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if(menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
        });
    }

    // Carousel des jeux
    const slides = document.querySelectorAll('.game-slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Création des points de navigation
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Aller au jeu ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    if(dots.length) dots[0].classList.add('active');

    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(n) {
        currentSlide = n;
        if(currentSlide < 0) currentSlide = slides.length - 1;
        if(currentSlide >= slides.length) currentSlide = 0;
        updateSlider();
    }

    if(prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if(nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-rotation toutes les 6 secondes
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);

    // Gestion des trailers YouTube
    const modal = document.querySelector('.trailer-modal');
    const iframe = modal?.querySelector('iframe');
    const closeBtn = modal?.querySelector('.close-modal');
    
    document.querySelectorAll('.play-trailer').forEach(btn => {
        btn.addEventListener('click', () => {
            if(!modal || !iframe) return;
            const trailerUrl = btn.dataset.trailer;
            iframe.src = trailerUrl;
            modal.setAttribute('aria-hidden', 'false');
            // Pause auto-rotation pendant la lecture
            clearInterval(slideInterval);
        });
    });

    function closeModal() {
        if(!modal || !iframe) return;
        modal.setAttribute('aria-hidden', 'true');
        iframe.src = '';
        // Reprendre auto-rotation
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', e => {
        if(e.target === modal) closeModal();
    });

    // Fermer avec Échap
    document.addEventListener('keyup', e => {
        if(e.key === 'Escape') closeModal();
    });
});
