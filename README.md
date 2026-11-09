# Atividade Bootstrap — HAYABUSA

Página web responsiva feita com **Bootstrap 5** para a disciplina
*Tópicos Avançados em Engenharia de Software* (UCSAL, 2026.2).
O tema é a Suzuki Hayabusa: a página reaproveita as imagens, os textos e a
identidade visual de uma landing page antiga, feita em HTML e CSS com
posições fixas em pixels, e a reconstrói com o grid e os componentes do
Bootstrap para funcionar em celular, tablet e desktop.

O conteúdo é fictício e tem fins apenas acadêmicos. Suzuki e Hayabusa são
marcas de seus respectivos titulares.

## Componentes

Os seis componentes pedidos na atividade usam as classes e os plugins
nativos do Bootstrap 5:

| Componente | Onde está | Classes principais |
|---|---|---|
| Navbar | `header`, topo da página | `navbar navbar-expand-lg fixed-top`, `navbar-toggler`, `collapse` |
| Cards | seção Modelos (`#modelos`) | `row row-cols-1 row-cols-md-2 row-cols-lg-3`, `card h-100` |
| Carrossel | seção Galeria (`#galeria`) | `carousel slide`, `carousel-indicators`, `carousel-control-prev/next` |
| Tabela | seção Especificações (`#especificacoes`) | `table-responsive`, `table table-striped table-dark` |
| Formulário | seção Contato (`#contato`) | `row g-3`, `form-control`, `form-select`, `form-check`, `was-validated` |
| Modal | `#modalModelo` (botão "Ver detalhes" de cada card) e `#modalConfirmacao` (envio do formulário) | `modal fade`, `modal-dialog-centered` |

Detalhes de cada um:

- **Navbar:** logo da Suzuki e cinco links (Início, Modelos, Galeria,
  Especificações, Contato). Abaixo de 992 px o menu vira um botão hambúrguer;
  ao escolher um link no celular, o menu fecha sozinho.
- **Cards:** os três modelos (Prata Metálica, Branca Pérola, Preta e Dourada)
  com foto, título, descrição e botão. Ficam em 1 coluna no celular,
  2 no tablet e 3 no desktop.
- **Carrossel:** três fotos com legenda, setas de anterior e próxima,
  indicadores e troca automática a cada 6 segundos.
- **Tabela:** especificações do motor, com cabeçalho, seis linhas listradas e
  rolagem horizontal própria em telas estreitas.
- **Formulário:** agendamento de test ride com nome, e-mail, telefone, modelo,
  mensagem e aceite de contato. A validação usa os atributos do HTML5
  (`required`, `type="email"`, `minlength`, `pattern`) e mostra as mensagens de
  erro do Bootstrap; o script ainda recusa nome e mensagem só com espaços.
- **Modal:** um modal de detalhes, reaproveitado pelos três cards, e um modal
  de confirmação que aparece quando o formulário é enviado com dados válidos.
  Ambos fecham pelo botão, pelo `Esc` ou clicando fora.

## Tecnologias

- HTML5 semântico (`header`, `main`, `section`, `article`, `footer`).
- [Bootstrap 5.3.8](https://getbootstrap.com/docs/5.3/) via CDN do jsDelivr,
  com `integrity` (SRI). Nada é instalado.
- CSS próprio em `css/estilo.css`, só com ajustes de tema (cores, fontes e
  alguns detalhes visuais) feitos pelas variáveis do Bootstrap.
- JavaScript nativo em `js/script.js`, sem bibliotecas, apenas para completar
  o que o Bootstrap não faz sozinho.
- Fontes Alatsi e Roboto Condensed, do Google Fonts, as mesmas da página
  original.

## Como abrir no GitHub Codespaces

O repositório tem a pasta `.devcontainer/`, então o ambiente já vem pronto.

1. Na página do repositório no GitHub, clique em **Code**.
2. Abra a aba **Codespaces** e clique em **Create codespace on main**.
3. Aguarde o ambiente ser criado. Ao final, o comando
   `npx --yes serve -l 3000 .` é executado automaticamente e serve a página
   na porta 3000.
4. O navegador abre sozinho a porta encaminhada ("Página da atividade").
   Se isso não acontecer, abra a aba **Portas** do VS Code e clique no
   endereço da porta 3000.
5. A versão Bootstrap fica em `/`; a versão Tailwind, em `/tailwind/`
   (sempre com a barra no final).

## Como executar localmente

Qualquer servidor estático serve. Na pasta do projeto, use uma das opções:

```bash
npx --yes serve -l 3000 .     # Node.js: http://localhost:3000
python3 -m http.server 8080   # Python: http://localhost:8080
```

Abrir o `index.html` direto no navegador também funciona, mas o servidor
evita diferenças de comportamento entre navegadores.

## Estrutura de pastas

```
atividade-bootstrap/
├── index.html                  # página principal (Bootstrap 5)
├── css/estilo.css              # ajustes de tema sobre o Bootstrap
├── js/script.js                # menu, carrossel, modais e formulário
├── assets/img/                 # fotos, logos e favicon
├── tailwind/                   # desafio extra (versão em Tailwind CSS)
├── .devcontainer/
│   └── devcontainer.json       # configuração do GitHub Codespaces
├── .gitignore
└── README.md
```

## Acessibilidade

- Idioma `pt-BR`, um único `h1` e um `h2` por seção, ligados às seções por
  `aria-labelledby`.
- Link "Pular para o conteúdo" como primeiro item do teclado.
- Foco sempre visível (contorno branco; preto sobre as áreas claras).
- Navbar com `aria-label`, `aria-controls` e `aria-expanded` no botão do menu.
- Carrossel com rótulos nos indicadores e nas setas. A troca automática pausa
  com o mouse ou o foco do teclado sobre ele e não é ligada para quem ativou
  a opção de reduzir movimento no sistema.
- Todos os campos com `label`; mensagens de erro ligadas por
  `aria-describedby`, e o foco vai para o primeiro campo com erro.
- Nos modais o foco fica preso e volta para o botão que os abriu.
- Fotos com texto alternativo; símbolo decorativo do rodapé com `alt=""`.
- Cores conferidas pelo contraste WCAG: o vermelho da marca (`#8d0915`) só
  aparece como fundo de botão com texto branco; textos em vermelho usam
  `#ff5a5f`, legível sobre o preto.

## Responsividade

A página foi testada nas larguras de 375 px (celular), 768 px (tablet) e
1280 px (desktop), sem rolagem horizontal em nenhuma delas:

| Largura | Comportamento |
|---|---|
| 375 px | menu hambúrguer, tudo em uma coluna, tabela com rolagem própria |
| 768 px | cards em 2 colunas (o terceiro centralizado), formulário em 2 colunas |
| 1280 px | menu em linha, hero com texto e foto lado a lado, cards em 3 colunas, texto e tabela lado a lado |

## Desafio extra: Tailwind CSS

A pasta `tailwind/` tem uma segunda versão da mesma página, independente
desta, feita com Tailwind CSS e JavaScript nativo. Para abrir, acesse
`tailwind/index.html` (no servidor, `/tailwind/`).

### Comparação entre as duas versões

As duas páginas têm o mesmo conteúdo e os mesmos seis componentes; muda a forma de montar cada um:

| Componente | Bootstrap 5 | Tailwind CSS |
|---|---|---|
| Navbar | `navbar navbar-expand-lg` + `collapse`; o plugin do bundle abre e fecha o menu | `hidden lg:flex` no `<ul>`; o script troca `hidden` e o `aria-expanded` do botão |
| Carrossel | `carousel slide`, `carousel-indicators`, `carousel-control-prev/next`; a troca é do plugin | trilho `flex` com `transition-transform`; o script calcula o `translateX`, os indicadores e o autoplay |
| Cards | `row row-cols-1 row-cols-md-2 row-cols-lg-3` + `card h-100` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` + `flex flex-col rounded-hb border` |
| Tabela | `table-responsive` + `table table-striped table-dark` | `overflow-x-auto` + `odd:bg-neutral-800 even:bg-neutral-900` em cada linha |
| Formulário | `form-control`, `invalid-feedback`; o script chama `checkValidity()` e põe `was-validated` | validação do próprio navegador; mensagens com `peer-user-invalid:block`; o script só recusa texto só com espaços |
| Modal | `modal fade` + `data-bs-toggle="modal"`; foco, `Esc` e fundo escuro vêm do plugin | `<dialog>` aberto com `showModal()`, fundo com `backdrop:bg-black/70` |

Números medidos em 08/11/2026 (linhas com `wc -l`, tamanhos com `curl`, com e sem `Accept-Encoding: gzip`):

| Item | Bootstrap | Tailwind |
|---|---|---|
| `index.html` | 347 linhas | 368 linhas |
| Texto dentro de `class="..."` | 3.001 caracteres | 12.578 caracteres |
| CSS próprio | `css/estilo.css`: 453 linhas | bloco `@theme`: 18 linhas |
| JS próprio | `js/script.js`: 120 linhas | `tailwind/script.js`: 203 linhas |
| Framework no CDN, sem compressão | 312.607 bytes (CSS 232.111 + JS 80.496) | 286.994 bytes (`@tailwindcss/browser` 4.3.5) |
| Framework no CDN, com gzip | 54.615 bytes (CSS 30.872 + JS 23.743) | 72.515 bytes |

**JavaScript.** `js/script.js` só complementa os plugins do `bootstrap.bundle`: fecha o menu ao
clicar num link, liga o autoplay do carrossel (com pausa no foco e respeitando o movimento
reduzido), preenche o modal de detalhes e abre o de confirmação. No Tailwind não há plugin, então
`tailwind/script.js` faz o menu, o carrossel inteiro (setas, indicadores, teclado, autoplay) e os modais.

**Legibilidade do HTML.** O mesmo card nas duas páginas:

```html
<!-- Bootstrap -->
<article class="card h-100 hb-card">
<!-- Tailwind -->
<article class="flex flex-col overflow-hidden rounded-hb border border-hb-linha bg-hb-cinza-escuro focus-within:border-hb-vermelho-claro hover:border-hb-vermelho-claro motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-1">
```

No Bootstrap a classe diz o que o elemento é e o visual fica em `estilo.css`. No Tailwind o visual
está todo no HTML, o que dispensa o CSS separado mas repete muito: `focus-visible:outline-2` aparece 31 vezes.

**Diferenças práticas:**

- **Customização:** no Bootstrap troquei variáveis `--bs-*` do tema escuro (`--bs-primary`,
  `--bs-body-bg`, `--bs-border-radius`...); no Tailwind as cores e fontes viram tokens no `@theme`
  e geram classes como `bg-hb-vermelho` e `font-titulo`.
- **Responsividade:** `col-md-6` e `navbar-expand-lg` de um lado, prefixos `md:` e `lg:` do outro.
  Os pontos de quebra padrão são diferentes (o `lg` do Tailwind é 64rem, o do Bootstrap 992 px),
  então redefini `sm`, `lg` e `xl` no `@theme` (36rem, 62rem e 75rem) para as duas mudarem juntas.
- **Acessibilidade:** o Bootstrap já atualiza o `aria-expanded` do menu, prende o foco no modal e
  devolve o foco ao botão que o abriu. No Tailwind isso foi feito à mão no script (`aria-expanded`,
  `Esc` no menu, `aria-hidden` nos slides, retorno do foco); o `<dialog>` ajudou, porque
  `showModal()` já bloqueia o resto da página e fecha com `Esc`.
- **CDN:** o Bootstrap carrega com `integrity` (SRI); o Tailwind usa `@tailwindcss/browser@4`, que
  muda de versão sozinho e por isso fica sem SRI. Esse script também gera o CSS no navegador, lendo
  as classes da página: serve para estudo, mas em produção o certo é usar o build e servir só o CSS final.
  Limitação conhecida: o validador do W3C acusa 2 erros em `tailwind/index.html`, os dois por causa
  do CDN: o `<style type="text/tailwindcss">` (tipo que o HTML não reconhece) e a regra `@theme`
  dentro dele (que não é CSS padrão). Com o build esse bloco vira um arquivo `.css` comum e os avisos somem.

**Conclusão.** O Bootstrap foi mais rápido de montar: os componentes já vêm prontos e acessíveis, e
o JS próprio ficou pequeno. O Tailwind deu mais controle sobre o visual e quase eliminou o CSS
separado, mas pediu mais JavaScript e deixou o HTML bem mais carregado. Para um site com componentes
comuns e pouco tempo, o Bootstrap resolve melhor; para um layout próprio, com etapa de build, o Tailwind.

**Roteiro do vídeo:** 1. abrir `/` e `/tailwind/` lado a lado; 2. navbar no celular; 3. carrossel;
4. cards; 5. tabela; 6. formulário e validação; 7. modal; 8. comparar o HTML do card;
9. comparar `js/script.js` e `tailwind/script.js`; 10. conclusão pessoal.

## Autor

Victor Oliveira — UCSAL, Engenharia de Software.
Disciplina Tópicos Avançados em Engenharia de Software,
prof. Elton Figueiredo da Silva, 2026.2.
