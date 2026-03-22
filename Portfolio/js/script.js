// ============================================
// ===== FUNÇÃO DO TEMA (MODO CLARO/ESCURO) ===
// ============================================

function toggleTheme() {
    console.log("Função toggleTheme foi chamada!");
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.querySelector('.theme-btn');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '🌙';
        console.log("Dark mode ativado");
    } else {
        themeBtn.textContent = '☀️';
        console.log("Light mode ativado");
    }
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// ============================================
// ===== FUNÇÃO PARA DESTACAR LINK ATIVO ======
// ============================================

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-menu a:not(.theme-btn)');
    links.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ===== FUNÇÃO PARA ORDENAR CARDS ============
// ============================================

function sortCertCards() {
    const certGrid = document.querySelector(".cert-grid");
    if (!certGrid) return;
    
    let certCards = Array.from(document.querySelectorAll(".cert-card"));
    certCards.sort(function (a, b) {
        let textoA = a.querySelector("h3").innerText;
        let textoB = b.querySelector("h3").innerText;
        if (textoA < textoB) return -1;
        if (textoA > textoB) return 1;
        return 0;
    });
    certGrid.innerHTML = "";
    for (let i = 0; i < certCards.length; i++) {
        certGrid.appendChild(certCards[i]);
    }
    console.log("Cards ordenados alfabeticamente");
}

// ============================================
// ===== CÓDIGO EXECUTADO QUANDO A PÁGINA CARREGA ===
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log("Página carregada!");
    
    // Restaurar tema salvo
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.theme-btn');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '🌙';
    } else {
        themeBtn.textContent = '☀️';
    }
    
    // Destacar link ativo
    highlightActiveLink();
    
    // Contagem de certificados na página de conteúdos
    if (document.querySelector(".cert-grid")) {
        let andamento = document.querySelectorAll(".cert-badge.ongoing").length;
        let concluido = document.querySelectorAll(".cert-badge.completed").length;
        localStorage.setItem('cursos_andamento', andamento);
        localStorage.setItem('cursos_concluidos', concluido);
        console.log("Certificados contados:", andamento, "andamento,", concluido, "concluídos");
        
        // Ordenar cards
        sortCertCards();
    }
    
    // Atualizar stats na página inicial
    if (document.getElementById('em_andamento')) {
        let andamentoSalvo = localStorage.getItem('cursos_andamento');
        let concluidoSalvo = localStorage.getItem('cursos_concluidos');
        document.getElementById('em_andamento').innerHTML = andamentoSalvo || '0';
        document.getElementById('finalizados').innerHTML = concluidoSalvo || '0';
    }
});