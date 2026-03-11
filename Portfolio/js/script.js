// ============================================
// ===== FUNÇÃO DO TEMA (MODO CLARO/ESCURO) ===
// ============================================

// Função que é chamada quando o botão de tema é clicado
function toggleTheme() {
    // Mostra no console que a função foi ativada (útil para testes)
    console.log("Função toggleTheme foi chamada!");

    // toggle = se tiver a classe 'dark-mode' remove, se não tiver adiciona
    // Isso faz a troca entre modo claro e escuro
    document.body.classList.toggle('dark-mode');

    // Encontra o botão de tema no HTML (pela classe 'theme-btn')
    const themeBtn = document.querySelector('.theme-btn');

    // Verifica se o modo escuro está ativado no momento
    if (document.body.classList.contains('dark-mode')) {
        // Se está escuro, muda o ícone do botão para lua
        themeBtn.textContent = '🌙';
        // Mostra no console que o dark mode foi ativado
        console.log("Dark mode ativado");
    } else {
        // Se está claro, muda o ícone do botão para sol
        themeBtn.textContent = '☀️';
        // Mostra no console que o light mode foi ativado
        console.log("Light mode ativado");
    }

    // Salva a preferência do usuário no navegador (localStorage)
    // Se estiver escuro, salva 'dark', se não, salva 'light'
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// ============================================
// ===== FUNÇÃO PARA DESTACAR LINK ATIVO ======
// ============================================

// Função que marca qual página está aberta no menu
function highlightActiveLink() {
    // Pega o nome do arquivo atual (ex: 'index.html', 'sobre.html')
    // split('/') divide o caminho, pop() pega o último pedaço
    // Se não encontrar, usa 'index.html' como padrão
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Encontra todos os links dentro do menu (pela classe 'nav-menu a')
    const links = document.querySelectorAll('.nav-menu a');

    // Para cada link encontrado...
    links.forEach(link => {
        // Remove a classe 'active' de TODOS os links
        link.classList.remove('active');

        // Pega o valor do atributo 'href' do link (ex: 'sobre.html')
        const linkPage = link.getAttribute('href');

        // Se o href do link for igual à página atual...
        if (linkPage === currentPage) {
            // Adiciona a classe 'active' APENAS neste link
            // Isso faz ele ficar com destaque no menu
            link.classList.add('active');
        }
    });
}

// ============================================
// ===== CÓDIGO EXECUTADO QUANDO A PÁGINA CARREGA ===
// ============================================

// 'DOMContentLoaded' significa que o HTML terminou de carregar
document.addEventListener('DOMContentLoaded', function () {
    // Mostra no console que a página carregou
    console.log("Página carregada!");

    // ===== RESTAURAR TEMA SALVO =====
    // Pega o tema que estava salvo no navegador
    const savedTheme = localStorage.getItem('theme');
    // Encontra o botão de tema
    const themeBtn = document.querySelector('.theme-btn');

    // Se o tema salvo era 'dark'...
    if (savedTheme === 'dark') {
        // Adiciona a classe dark-mode ao body
        document.body.classList.add('dark-mode');
        // Muda o ícone do botão para lua
        themeBtn.textContent = '🌙';
    } else {
        // Se não era dark, deixa o ícone como sol
        themeBtn.textContent = '☀️';
    }

    // ===== DESTACAR LINK ATIVO =====
    // Chama a função que marca qual página está aberta
    highlightActiveLink();

    // ===== CONTAGEM DE CERTIFICADOS =====
    // Verifica se existe um elemento com a classe 'cert-grid' na página
    // Isso significa que estamos na página de certificados
    if (document.querySelector(".cert-grid")) {
        // Conta quantos elementos tem a classe 'cert-badge ongoing' (cursos em andamento)
        let andamento = document.querySelectorAll(".cert-badge.ongoing").length;
        // Conta quantos elementos tem a classe 'cert-badge completed' (cursos concluídos)
        let concluido = document.querySelectorAll(".cert-badge.completed").length;

        // Salva os números no navegador (localStorage) para usar em outras páginas
        localStorage.setItem('cursos_andamento', andamento);
        localStorage.setItem('cursos_concluidos', concluido);

        // Mostra no console quantos cursos foram contados
        console.log("Certificados contados:", andamento, "andamento,", concluido, "concluídos");
    }

    // Verifica se existe um elemento com id 'em_andamento' na página
    // Isso significa que estamos na página inicial (index.html)
    if (document.getElementById('em_andamento')) {
        // Pega o número de cursos em andamento que foi salvo
        let andamentoSalvo = localStorage.getItem('cursos_andamento');
        // Pega o número de cursos concluídos que foi salvo
        let concluidoSalvo = localStorage.getItem('cursos_concluidos');

        // Coloca o número dentro do elemento com id 'em_andamento'
        // Se não houver valor salvo, usa '3' como padrão
        document.getElementById('em_andamento').innerHTML = andamentoSalvo || '0';
        // Coloca o número dentro do elemento com id 'finalizados'
        // Se não houver valor salvo, usa '5' como padrão
        document.getElementById('finalizados').innerHTML = concluidoSalvo || '0';
    }
});


// Script que pega os Cert Cards na página Certificados e coloca eles em ordem alfabetica.

// Pega o container que segura todos os cards
let certGrid = document.querySelector(".cert-grid")

// Pega todos os cards e transforma em um array
let certCards = Array.from(document.querySelectorAll(".cert-card"))
for (let i = 0; i < certCards.length; i++) {
    console.log(certCards[i])
}


// Ordena os cards em ordem alfabética pelo título (h3)
certCards.sort(function (a, b) {
    // Pega o texto do h3 do primeiro card
    let textoA = a.querySelector("h3").innerText
    // Pega o texto do h3 do segundo card
    let textoB = b.querySelector("h3").innerText
    // Compara os textos para ordenar (A-Z)
    if (textoA < textoB) return -1
    if (textoA > textoB) return 1
    return 0
})

// Limpa o conteúdo atual do grid
certGrid.innerHTML = ""

// Adiciona cada card de volta no grid na nova ordem
for (let i = 0; i < certCards.length; i++) {
    certGrid.appendChild(certCards[i])
}

