// ============================================
// ===== CONFIGURAÇÕES GERAIS =================
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log("Página carregada!");
    
    // 1. Inicializar Tema (Dark/Light)
    initTheme();
    
    // 2. Destacar link ativo no menu
    highlightActiveLink();
    
    // 3. Atualizar/Contar certificados e inicializar filtros
    if (document.querySelector(".cert-grid")) {
        // Se estiver na página de conteúdos, conta os itens, ordena e ativa filtros
        countAndSaveCerts();
        sortCertCards();
        initFilters(); // Inicializa os botões de filtro por instituição
    } else {
        // Se estiver na home, tenta buscar e atualizar os stats
        updateStats();
    }
});

// ============================================
// ===== FUNÇÃO DO TEMA (MODO CLARO/ESCURO) ===
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.theme-btn');
    
    // Detectar preferência do sistema se não houver tema salvo
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        if (themeBtn) themeBtn.textContent = '☀️';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.querySelector('.theme-btn');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (themeBtn) {
        themeBtn.textContent = isDark ? '🌙' : '☀️';
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log(isDark ? "Dark mode ativado" : "Light mode ativado");
}

// ============================================
// ===== FUNÇÃO PARA DESTACAR LINK ATIVO ======
// ============================================

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-menu a:not(.theme-btn)');
    
    links.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Verifica se o href termina com a página atual
        if (linkHref.endsWith(currentPage) || (currentPage === 'index.html' && linkHref === '../index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ===== ESTATÍSTICAS E CERTIFICADOS ==========
// ============================================

function countAndSaveCerts() {
    const andamento = document.querySelectorAll(".cert-badge.ongoing").length;
    const concluido = document.querySelectorAll(".cert-badge.completed").length;
    
    localStorage.setItem('cursos_andamento', andamento);
    localStorage.setItem('cursos_concluidos', concluido);
    console.log("Certificados contados na página:", andamento, "andamento,", concluido, "concluídos");
}

async function updateStats() {
    const statAndamento = document.getElementById('em_andamento');
    const statFinalizado = document.getElementById('finalizados');
    const statMeses = document.getElementById('meses_estudo');
    
    // ---- Cálculo automático de meses de estudo ----
    if (statMeses) {
        const inicio = new Date(2026, 2, 10); // 10 de março de 2026 (mês começa em 0)
        const agora = new Date();
        const meses = (agora.getFullYear() - inicio.getFullYear()) * 12
                    + (agora.getMonth() - inicio.getMonth());
        statMeses.textContent = meses > 0 ? meses : 1;
    }
    // -----------------------------------------------
    
    if (!statAndamento || !statFinalizado) return;

    // Primeiro, mostra o que tem no localStorage para carregamento rápido
    statAndamento.innerHTML = localStorage.getItem('cursos_andamento') || '0';
    statFinalizado.innerHTML = localStorage.getItem('cursos_concluidos') || '0';

    // Em seguida, tenta buscar os dados atualizados (útil se estiver rodando em um servidor/GitHub Pages)
    try {
        const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const url = isRoot ? 'pages/conteudos.html' : 'conteudos.html';
        
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const andamento = doc.querySelectorAll('.cert-badge.ongoing').length;
            const concluido = doc.querySelectorAll('.cert-badge.completed').length;
            
            statAndamento.innerHTML = andamento;
            statFinalizado.innerHTML = concluido;
            
            localStorage.setItem('cursos_andamento', andamento);
            localStorage.setItem('cursos_concluidos', concluido);
        }
    } catch (error) {
        console.log("Fetch bloqueado (CORS via file://). Usando dados do localStorage.");
    }
}

// ============================================
// ===== FUNÇÃO PARA ORDENAR CARDS ============
// ============================================

function sortCertCards() {
    const certGrid = document.querySelector(".cert-grid");
    if (!certGrid) return;
    
    let certCards = Array.from(document.querySelectorAll(".cert-card"));
    certCards.sort((a, b) => {
        let textoA = a.querySelector("h3").innerText.toUpperCase();
        let textoB = b.querySelector("h3").innerText.toUpperCase();
        if (textoA < textoB) return -1;
        if (textoA > textoB) return 1;
        return 0;
    });
    
    certGrid.innerHTML = "";
    certCards.forEach(card => certGrid.appendChild(card));
    console.log("Cards ordenados alfabeticamente");
}

// ============================================
// ===== FILTRO POR INSTITUIÇÃO ===============
// Lê o atributo data-filtro de cada botão e
// compara com o atributo data-origem de cada
// cert-card. Exibe apenas os que combinam,
// ou todos se o filtro for "todos".
// ============================================

function initFilters() {
    // Seleciona todos os botões de filtro da barra
    const botoes = document.querySelectorAll(".filter-btn");

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            // Remove a classe 'active' de todos os botões
            botoes.forEach(b => b.classList.remove("active"));

            // Marca o botão clicado como ativo
            this.classList.add("active");

            // Lê qual filtro foi selecionado (ex: "cfbcursos", "codedex", "todos")
            const filtroSelecionado = this.getAttribute("data-filtro");

            // Percorre todos os cards e decide quais mostrar ou ocultar
            const cards = document.querySelectorAll(".cert-card");
            cards.forEach(card => {
                const origemDoCard = card.getAttribute("data-origem");

                if (filtroSelecionado === "todos" || origemDoCard === filtroSelecionado) {
                    // Mostra o card: remove a classe que o esconde
                    card.classList.remove("hidden");
                } else {
                    // Esconde o card: adiciona a classe .hidden (display: none no CSS)
                    card.classList.add("hidden");
                }
            });

            console.log("Filtro aplicado:", filtroSelecionado);
        });
    });
}