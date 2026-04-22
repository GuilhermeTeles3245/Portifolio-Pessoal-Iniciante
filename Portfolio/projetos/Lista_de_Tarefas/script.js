// --- 1. Seleção dos Elementos HTML da tela ---
const inputTarefa = document.getElementById("nova-tarefa");
const botaoTarefa = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");

// --- 2. NOSSO "BANCO DE DADOS" (A Lista fantasma de textos) ---
// Tentamos buscar as tarefas do localStorage. Se não tiver nada salvo, começamos com uma lista vazia "[]"
let bancoDeTarefas = JSON.parse(localStorage.getItem('tarefasDesafio')) || [];

// --- 3. Função responsável por DESENHAR a tela ---
// Toda vez que chamarmos essa função, ela vai olhar nosso banco de dados e criar a tela baseada nele.
function renderizarTela() {
    // Primeiro, limpamos o HTML da lista para não duplicar na hora de recriar
    listaTarefas.innerHTML = "";

    // O "forEach" é um loop: para cada texto guardado no nosso banco, executamos isso aqui:
    bancoDeTarefas.forEach(function (textoDaTarefa, indice) {
        // Criando os elementos HTML
        const itemTarefa = document.createElement("li");
        const botaoDeletar = document.createElement("button");

        // Configurando o botão do "X"
        botaoDeletar.textContent = "X";
        botaoDeletar.classList.add("deletar");

        // Colocando o texto dentro do "li"
        itemTarefa.textContent = textoDaTarefa;

        // ---- A NOVA LÓGICA DE DELETAR ----
        botaoDeletar.addEventListener("click", function () {
            // Em vez de só apagar o "li" da tela, apagamos ele da nossa memória!
            // splice(qual item vamos deletar, quantos itens a partir dali)
            bancoDeTarefas.splice(indice, 1);

            // Depois de deletar, mandamos a página redesenhar e depois salvamos
            renderizarTela();
            salvarTarefasNoNavegador();
        });

        // Montando o item e colocando na lista geral ('ul')
        itemTarefa.appendChild(botaoDeletar);
        listaTarefas.appendChild(itemTarefa);
    });
}

// --- 4. Função para SALVAR no LocalStorage ---
function salvarTarefasNoNavegador() {
    // Transforma nossa array (bancoDeTarefas) em texto (String) e guarda na gaveta 'tarefasDesafio'
    localStorage.setItem('tarefasDesafio', JSON.stringify(bancoDeTarefas));
}

// --- 5. Adicionar Nova Tarefa via Clique do Botão ---
botaoTarefa.addEventListener("click", adicionarNovaTarefa);

// --- 6. (BÔNUS!) Adicionar Nova Tarefa ao apertar a tecla "Enter" ---
inputTarefa.addEventListener("keypress", function (event) {
    // Se a tecla pressionada foi o Enter... chama a mesma função do clique!
    if (event.key === "Enter") {
        adicionarNovaTarefa();
    }
});

// --- Lógica de Criação Compartilhada ---
function adicionarNovaTarefa() {
    const novaTarefa = inputTarefa.value;

    if (novaTarefa !== "") {
        // Adicionamos o novo texto no final da nossa "Lista fantasma" (.push)
        bancoDeTarefas.push(novaTarefa);

        // Mandamos salvar na memória do navegador antes que de problema!
        salvarTarefasNoNavegador();
        // E mandamos a página se redesenhar lendo a lista nova
        renderizarTela();

        // Limpamos o campo de texto
        inputTarefa.value = "";
    }
}

// --- COMANDO DE INICIALIZAÇÃO DA PÁGINA ---
// Quando você der F5 na página, a primeira coisa que o código faz é chamar essa função
// para desenhar as tarefas que já estavam guardadas no LocalStorage!
renderizarTela();