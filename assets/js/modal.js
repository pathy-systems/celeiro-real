let currentSlide = 0;
let slidesCount = 0;
let lastClickedCard = null; // Mantido para futuras referências ou para saber qual card foi aberto

// =========================================================
// 1. DADOS DE PRODUTOS (MOCK DATA)
// =========================================================
const productsData = {
    "amarelo": [
        { name: "Romã", img: "assets/img/produtos/am-rei.webp", desc: "Romãs selecionadas da fazenda X, conhecidas por seu sabor agridoce e polpa intensa. Qualidade superior e certificada." },
        { name: "Romã Fresh B", img: "assets/img/produtos/ga.jpg", desc: "Colheita fresca e suculenta, variedade B, ideal para sucos e saladas. Disponível somente na estação de verão." },
    ],
    "melao-amarelo": [
        { name: "Melão Amarelo Marca C", img: "assets/img/produtos/ga.jpg", desc: "Melões de alto padrão, doce e crocante. Exportado de fazendas com certificação. Peso médio de 2kg." },
    ],
};


// =========================================================
// 2. REFERÊNCIAS DE ELEMENTOS DO DOM (Elementos estáticos)
// =========================================================
const modal = document.getElementById('product-modal');
const closeBtn = modal.querySelector('.close-btn');
const allCards = document.querySelectorAll('.card-corpo2');
const slidesWrapper = document.getElementById('carousel-slides-wrapper');
const dotsContainer = modal.querySelector('.carousel-dots');


// =========================================================
// 3. FUNÇÕES DO CARROSSEL
// =========================================================

function updateCarousel() {
    // Apenas atualiza o deslocamento e os indicadores (dots)
    const offset = -currentSlide * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesCount;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
    updateCarousel();
}


/**
 * Constrói o HTML dos slides, indicadores e botões de navegação.
 * @param {string} productName - Chave do produto.
 */
function buildCarouselContent(productName) {
    const data = productsData[productName] || [];
    slidesCount = data.length;

    slidesWrapper.innerHTML = '';
    dotsContainer.innerHTML = '';

    if (slidesCount === 0) {
        slidesWrapper.innerHTML = '<p style="text-align: center; width: 100%; padding: 5rem;">Nenhuma variedade encontrada para este produto.</p>';
        return;
    }

    data.forEach((item, index) => {
        // Cria o slide
        const slideHtml = `
            <div class="carousel-slide">
                <div class="slide-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="slide-details">
                    <div>
                        <h3>${item.name}</h3>
                        <div class="line2"></div>
                        <p>${item.desc}</p>
                        <div class="slide-actions">
                             <button class="btn-card2">
                                <span>Mais detalhes da marca</span>
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="carousel-controls">
                        <button class="prev-btn">❮ Anterior</button>
                        <button class="next-btn">Próximo ❯</button>
                    </div>
                </div>
            </div>
        `;
        slidesWrapper.insertAdjacentHTML('beforeend', slideHtml);

        // Cria o indicador (dot)
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    currentSlide = 0;
    updateCarousel();

    // Adiciona os event listeners aos botões injetados dinamicamente
    const newPrevBtns = slidesWrapper.querySelectorAll('.prev-btn');
    const newNextBtns = slidesWrapper.querySelectorAll('.next-btn');

    newPrevBtns.forEach(btn => btn.addEventListener('click', prevSlide));
    newNextBtns.forEach(btn => btn.addEventListener('click', nextSlide));

    // Opcional: Esconder botões se houver apenas 1 slide
    if (slidesCount <= 1) {
        newPrevBtns.forEach(btn => btn.style.display = 'none');
        newNextBtns.forEach(btn => btn.style.display = 'none');
        dotsContainer.style.display = 'none';
    } else {
        dotsContainer.style.display = 'block';
    }
}


// =========================================================
// 4. FUNÇÕES DO MODAL (ABRIR/FECHAR SIMPLES)
// =========================================================

/**
 * Abre o modal e carrega o conteúdo.
 * O parâmetro startImage não é mais usado para animação, mas pode ser mantido.
 */
function openModal(productName, startImage) {
    // 1. Carrega o Conteúdo do Carrossel
    buildCarouselContent(productName);
    
    // 2. Abre o modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Bloqueia o scroll do fundo
}

/**
 * Fecha o modal.
 * Os parâmetros startImageModal e targetCard não são mais usados para animação.
 */
function closeModal() {
    // 1. Fecha o modal
    modal.classList.remove('open');
    
    // 2. Libera o scroll do fundo
    document.body.style.overflow = '';
}


// =========================================================
// 5. EVENT LISTENERS GLOBAIS
// =========================================================

// Funções utilitárias (simplificadas, já que closeModal não precisa de argumentos)
function handleClose() {
    closeModal();
}

// Evento de clique para ABRIR o modal
allCards.forEach(card => {
    const btn = card.querySelector('.btn-card2');

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const articleElement = e.currentTarget.closest('.card-corpo2');
            const productName = articleElement.getAttribute('data-product-name');

            lastClickedCard = articleElement; // Salva o card clicado
            const startImage = articleElement.querySelector('img'); // Mantido para compatibilidade, mas não usado

            if (productName && productsData[productName]) {
                openModal(productName, startImage);
            } else {
                console.error(`Dados não encontrados para o produto: ${productName}`);
                openModal(productName, null);
            }
        });
    }
});


// Eventos para FECHAR o modal
closeBtn.addEventListener('click', handleClose);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        handleClose();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        handleClose();
    }
});