// ============================================
// ===== CONFIGURAÇÕES GERAIS =================
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log("Página carregada!");
    
    // 1. Inicializar Tema (Dark/Light)
    initTheme();
    
    // 2. Destacar link ativo no menu
    highlightActiveLink();
    
    // 3. Atualizar/Contar certificados e inicializar filtros se estiver na página de conteúdos
    if (document.querySelector(".cert-grid")) {
        countAndSaveCerts();
        sortCertCards();
        initFilters(); // Inicializa os botões de filtro por instituição
    }
    
    // 4. Atualizar/Contar projetos se estiver na página de projetos
    if (document.querySelector(".projects-grid")) {
        countAndSaveProjects();
    }
    
    // 5. Se estiver na home (ou tiver elementos de estatísticas), busca e atualiza os stats
    if (document.getElementById('projetos_criados') || document.getElementById('em_andamento') || document.querySelector(".stats-container")) {
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
// ===== ESTATÍSTICAS (CERTIFICADOS E PROJETOS)
// ============================================

function countAndSaveCerts() {
    const andamento = document.querySelectorAll(".cert-badge.ongoing").length;
    const concluido = document.querySelectorAll(".cert-badge.completed").length;
    
    localStorage.setItem('cursos_andamento', andamento);
    localStorage.setItem('cursos_concluidos', concluido);
    console.log("Certificados contados na página:", andamento, "andamento,", concluido, "concluídos");
}

function countAndSaveProjects() {
    const totalProjetos = document.querySelectorAll(".projects-grid .project-card").length;
    localStorage.setItem('total_projetos', totalProjetos);
    console.log("Projetos contados na página:", totalProjetos);
}

async function updateStats() {
    const statAndamento = document.getElementById('em_andamento');
    const statFinalizado = document.getElementById('finalizados');
    const statMeses = document.getElementById('meses_estudo');
    const statProjetos = document.getElementById('projetos_criados');
    
    // ---- Cálculo automático de meses de estudo ----
    if (statMeses) {
        const inicio = new Date(2026, 2, 10); // 10 de março de 2026 (mês começa em 0)
        const agora = new Date();
        const meses = (agora.getFullYear() - inicio.getFullYear()) * 12
                    + (agora.getMonth() - inicio.getMonth());
        statMeses.textContent = meses > 0 ? meses : 1;
    }
    // -----------------------------------------------
    
    // Mostra primeiro o que tem no localStorage para carregamento imediato
    if (statAndamento && localStorage.getItem('cursos_andamento') !== null) {
        statAndamento.innerHTML = localStorage.getItem('cursos_andamento');
    }
    if (statFinalizado && localStorage.getItem('cursos_concluidos') !== null) {
        statFinalizado.innerHTML = localStorage.getItem('cursos_concluidos');
    }
    if (statProjetos && localStorage.getItem('total_projetos') !== null) {
        statProjetos.innerHTML = localStorage.getItem('total_projetos');
    }

    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('/pages/');

    // Em seguida, tenta buscar os dados atualizados de certificados (via servidor/GitHub Pages)
    try {
        const urlConteudos = isRoot ? 'pages/conteudos.html' : 'conteudos.html';
        const response = await fetch(urlConteudos);
        if (response.ok) {
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const andamento = doc.querySelectorAll('.cert-badge.ongoing').length;
            const concluido = doc.querySelectorAll('.cert-badge.completed').length;
            
            if (statAndamento) statAndamento.innerHTML = andamento;
            if (statFinalizado) statFinalizado.innerHTML = concluido;
            
            localStorage.setItem('cursos_andamento', andamento);
            localStorage.setItem('cursos_concluidos', concluido);
        }
    } catch (error) {
        console.log("Fetch de conteúdos bloqueado (CORS via file://). Usando dados salvos.");
    }

    // Tenta buscar os dados atualizados de projetos (via servidor/GitHub Pages)
    try {
        const urlProjetos = isRoot ? 'pages/projetos.html' : 'projetos.html';
        const respProjetos = await fetch(urlProjetos);
        if (respProjetos.ok) {
            const htmlProjetos = await respProjetos.text();
            const parser = new DOMParser();
            const docProjetos = parser.parseFromString(htmlProjetos, 'text/html');
            
            const totalProjetos = docProjetos.querySelectorAll('.projects-grid .project-card').length;
            
            if (statProjetos && totalProjetos > 0) {
                statProjetos.innerHTML = totalProjetos;
            }
            localStorage.setItem('total_projetos', totalProjetos);
        }
    } catch (error) {
        console.log("Fetch de projetos bloqueado (CORS via file://). Usando dados salvos.");
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