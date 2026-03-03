document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-desktop");
  const links = document.querySelectorAll(".menu-link a");

  // criar highlight
  const highlight = document.createElement("span");
  highlight.classList.add("menu-highlight");
  menu.appendChild(highlight);

  function moveHighlight(el) {
    const rect = el.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    highlight.style.width = rect.width + "px";
    highlight.style.transform = `translateX(${rect.left - menuRect.left}px)`;
  }

  // iniciar no ativo
  const active = document.querySelector(".menu-link a.active");
  if (active) moveHighlight(active);

  links.forEach(link => {
    link.addEventListener("mouseenter", () => moveHighlight(link));
    link.addEventListener("click", e => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      moveHighlight(link);
    });
  });

  // volta para o ativo ao sair
  menu.addEventListener("mouseleave", () => {
    const active = document.querySelector(".menu-link a.active");
    if (active) moveHighlight(active);
  });
});

// Carrossel de produtos
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevButton = document.querySelector('.carousel-button--left');
  const nextButton = document.querySelector('.carousel-button--right');
  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 24);
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  window.addEventListener('resize', update);

  prevButton && prevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    update();
  });

  nextButton && nextButton.addEventListener('click', () => {
    currentIndex = Math.min(slides.length - 1, currentIndex + 1);
    update();
  });

  // touch drag support
  let startX = 0;
  let isDragging = false;
  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
  });
  window.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    track.style.transition = '';
    if (diff > 50) currentIndex = Math.max(0, currentIndex - 1);
    if (diff < -50) currentIndex = Math.min(slides.length - 1, currentIndex + 1);
    update();
    isDragging = false;
  });

  // inicializa posição
  update();
});

// Mobile menu open/close
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  if (!toggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  // close when click outside inner panel
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // close on link click
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
});

/* Scrool */
document.addEventListener("scroll", () => {
    const titulo = document.querySelector(".titulo-home");
    const bannerImgs = document.querySelector(".banner-imgs");
    const produtos = document.querySelector(".produtos");

    let scrollY = window.scrollY;

    // Quando rolar mais de 100px, esconder o título
    if(scrollY > 100) {
        titulo.classList.add("hide");
    } else {
        titulo.classList.remove("hide");
    }

});

// === CARROSSEL DE PRODUTOS ===
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".produto-item");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const carousel = document.querySelector(".carousel");
  let index = 0;

  function updateCarousel() {
    // Move o carrossel inteiro
    carousel.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza visuais (fade/zoom)
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  });

  // Inicializa na posição certa
  updateCarousel();
});
