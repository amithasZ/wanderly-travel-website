document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('show', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      hamburger.classList.remove('open'); mobileNav.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = [...slider.querySelectorAll('.hero-slide')];
    const dots = [...slider.querySelectorAll('.dot')];
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    let current = 0, timer;
    const show = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('active', n === current));
      dots.forEach((d, n) => d.classList.toggle('active', n === current));
    };
    const autoplay = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 4500); };
    prev?.addEventListener('click', () => { show(current - 1); autoplay(); });
    next?.addEventListener('click', () => { show(current + 1); autoplay(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); autoplay(); }));
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', autoplay);
    autoplay();
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
      }
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
    }), {threshold:.12});
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('in'));

  const topBtn = document.getElementById('backToTop');
  if (topBtn) {
    window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 500));
    topBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  }

  document.querySelectorAll('header .btn:not(a), .mobile-nav .btn:not(a)').forEach(btn => {
    btn.addEventListener('click', () => window.location.href = 'plan-trip.html');
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.querySelector('.form-status').textContent = 'Message submitted successfully. We will contact you soon.';
    contactForm.reset();
  });

  const tripForm = document.getElementById('tripForm');
  if (tripForm) {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('destination');
    const select = document.getElementById('destinationSelect');
    if (dest && select) {
      const option = [...select.options].find(o => o.value.toLowerCase() === dest.toLowerCase());
      if (option) select.value = option.value;
    }
    tripForm.addEventListener('submit', e => {
      e.preventDefault();
      tripForm.querySelector('.form-status').textContent = 'Trip request submitted successfully. Your plan is ready for review.';
    });
  }
});
