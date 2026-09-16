# 📝 Histórico de Mudanças (Changelog) - Portfólio Pessoal

Este arquivo serve para registrar de forma organizada e cronológica todas as melhorias, novidades e correções feitas no site do seu portfólio. Sempre que você fizer alterações, basta adicionar uma nova entrada aqui!

---

## 📌 [Versão 1.4] - 16/09/2026

### 🏷️ Ajuste no Menu: "Sobre"
- Alterado o texto do menu em todas as páginas (`index.html`, `pages/sobre.html`, `pages/conteudos.html`, `pages/projetos.html`) de **"Sobre Mim"** para **"Sobre"**, atendendo à preferência de design.

### 🌐 Correção Definitiva para o Netlify (Clean URLs)
- **Problema identificado:** No Netlify (`portifolio-guilhermeteles.netlify.app`), as URLs são limpas (Pretty URLs) e não terminam com `.html` (ex: `/pages/sobre`). O código anterior verificava `!filename.endsWith('.html')` e achava equivocadamente que qualquer página sem `.html` era a Home, ativando sempre o botão "Início".
- **Solução implementada:** O `highlightActiveLink()` agora verifica diretamente a rota/seção (`sobre`, `conteudo`, `projeto` ou `inicio`). Agora, quando você está em `/pages/sobre`, o botão **"Sobre"** fica ativo perfeitamente!

---

## 📌 [Versão 1.3] - 16/09/2026

### 🏷️ Padronização do Menu de Navegação
- **Texto padronizado:** Corrigido o texto do link na página inicial (`index.html`), que estava apenas como **"👤 Sobre"**, para **"👤 Sobre Mim"**, ficando 100% alinhado com todas as outras páginas do site.

### 🎨 Correção e Proteção do CSS Ativo (`.active`) ao Mudar de Página
- **Destaque infalível:** A função `highlightActiveLink()` foi simplificada e blindada para extrair diretamente o nome do arquivo final de cada link e comparar com a página atual. Toda vez que você navega entre as abas (Início, Sobre Mim, Conteúdos, Projetos), o efeito roxo com gradiente se move dinamicamente para a aba correspondente.
- **Proteção do Hover no CSS (`style.css`):** Adicionada a proteção `:hover:not(.active)`. Antes, ao passar o mouse por cima do botão já ativo no modo escuro, o efeito de hover sobrescrevia temporariamente o gradiente roxo, parecendo que o CSS estava "bugado". Agora, o botão ativo nunca perde o destaque roxo ao receber o mouse.

---

## 📌 [Versão 1.2] - 16/09/2026

### 🎨 Correção Visual do Menu de Navegação (Home)
- **Problema corrigido:** Ao acessar a página inicial (`index.html`), o botão **"🏠 Início"** não estava recebendo o destaque visual (fundo com gradiente roxo e sombra).
- **Causa identificada:** A função `highlightActiveLink()` no `script.js` esperava sempre a palavra exata `index.html` no final da URL. Quando o site era aberto através de um servidor local ou com barra no final (`/` ou `/Portfolio/`), a página era reconhecida como vazia ou o nome da pasta, fazendo a classe `.active` ser removida.
- **Solução implementada:** A função foi aprimorada para detectar com precisão quando o usuário está na Home, mesmo sem `index.html` explícito na URL, com uma garantia de segurança que mantém o botão Início destacado.

---

## 📌 [Versão 1.1] - 16/09/2026

### 🎂 Atualização Cadastral
- Atualização da idade de **18 para 19 anos** em `pages/sobre.html` (alinhando com a página inicial).

### 🔢 Contagem e Automação de Projetos
- **Atualização do contador na Home:** Atualizado de **3** para **8** projetos criados no card de estatísticas do `index.html`.
- **Identificador dinâmico:** Adicionado o atributo `id="projetos_criados"` na div do número de projetos.
- **Contagem automática (`countAndSaveProjects`):** Criada uma função no `js/script.js` que conta automaticamente todos os elementos `.project-card` presentes na página `pages/projetos.html` e salva a quantidade no `localStorage`.
- **Sincronização assíncrona (`updateStats`):** 
  - A Home agora lê instantaneamente do `localStorage` para carregamento imediato.
  - Também faz uma requisição em segundo plano (`fetch`) para `pages/projetos.html`, mantendo o número 100% atualizado de forma automática quando você adicionar novos projetos no futuro.

---

## 📌 [Versão 1.0] - Março/2026

### 🚀 Lançamento Inicial
- Estrutura base do portfólio criada com HTML5, CSS3 e JavaScript.
- Páginas desenvolvidas:
  - `index.html` (Página inicial com estatísticas e apresentação)
  - `pages/sobre.html` (História, tecnologias e interesses)
  - `pages/conteudos.html` (Listagem de certificados com filtros por instituição)
  - `pages/projetos.html` (Catálogo dos primeiros projetos desenvolvidos)
- Sistema de alternância entre Modo Claro e Modo Escuro (Dark Mode) com persistência via `localStorage`.
- Cálculo automático dos meses de estudo desde o início em março de 2026.

---

## 💡 Como continuar anotando suas futuras mudanças:
Para adicionar uma nova anotação quando fizer atualizações no site, basta copiar o modelo abaixo e colar no topo da lista:

```markdown
## 📌 [Versão X.X] - DD/MM/AAAA

### ✨ O que foi adicionado / modificado:
- **Nome da mudança:** Descrição simples do que você fez e em qual arquivo mexeu.
- **Exemplo:** "Adicionado o projeto 9 (Calculadora IMC) na página projetos.html".
```
