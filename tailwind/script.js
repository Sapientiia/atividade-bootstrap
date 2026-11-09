'use strict';

// Versão Tailwind: sem Bootstrap, todo o comportamento é feito aqui com JS nativo.

const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Menu (hambúrguer) ----------
const botaoMenu = document.getElementById('botaoMenu');
const menuPrincipal = document.getElementById('menuPrincipal');

function menuAberto() {
  return botaoMenu.getAttribute('aria-expanded') === 'true';
}

function alternarMenu(abrir) {
  menuPrincipal.classList.toggle('hidden', !abrir);
  botaoMenu.setAttribute('aria-expanded', String(abrir));
}

botaoMenu.addEventListener('click', () => alternarMenu(!menuAberto()));

// fecha o menu ao escolher um link (no mobile)
menuPrincipal.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (menuAberto()) alternarMenu(false);
  });
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && menuAberto()) {
    alternarMenu(false);
    botaoMenu.focus();
  }
});

// marca no menu a seção que está na tela
const linksMenu = [...menuPrincipal.querySelectorAll('a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksMenu.forEach((link) => {
        if (link.getAttribute('href') === `#${entrada.target.id}`) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section[id]').forEach((secao) => observador.observe(secao));
}

// ---------- Carrossel ----------
const carrossel = document.getElementById('carrossel');
const trilho = document.getElementById('carrosselTrilho');
const slides = [...trilho.querySelectorAll('[data-slide]')];
const indicadores = [...carrossel.querySelectorAll('[data-indicador]')];
let indiceAtual = 0;
let temporizador = null;
let mouseDentro = false;
let focoDentro = false;

function irPara(indice) {
  // laço: depois do último volta para o primeiro e vice-versa
  indiceAtual = (indice + slides.length) % slides.length;
  trilho.style.transform = `translateX(-${indiceAtual * 100}%)`;

  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', String(i !== indiceAtual));
  });
  indicadores.forEach((botao, i) => {
    if (i === indiceAtual) {
      botao.setAttribute('aria-current', 'true');
    } else {
      botao.removeAttribute('aria-current');
    }
  });
}

function iniciarAutoplay() {
  if (movimentoReduzido || temporizador || mouseDentro || focoDentro) return;
  trilho.setAttribute('aria-live', 'off');
  temporizador = setInterval(() => irPara(indiceAtual + 1), 6000);
}

function pausarAutoplay() {
  clearInterval(temporizador);
  temporizador = null;
  trilho.setAttribute('aria-live', 'polite');
}

document.getElementById('carrosselAnterior').addEventListener('click', () => irPara(indiceAtual - 1));
document.getElementById('carrosselProximo').addEventListener('click', () => irPara(indiceAtual + 1));

indicadores.forEach((botao) => {
  botao.addEventListener('click', () => irPara(Number(botao.dataset.indicador)));
});

carrossel.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowLeft') {
    evento.preventDefault();
    irPara(indiceAtual - 1);
  } else if (evento.key === 'ArrowRight') {
    evento.preventDefault();
    irPara(indiceAtual + 1);
  }
});

// pausa com o mouse em cima ou com o foco dentro do carrossel
carrossel.addEventListener('mouseenter', () => { mouseDentro = true; pausarAutoplay(); });
carrossel.addEventListener('mouseleave', () => { mouseDentro = false; iniciarAutoplay(); });
carrossel.addEventListener('focusin', () => { focoDentro = true; pausarAutoplay(); });
carrossel.addEventListener('focusout', (evento) => {
  if (carrossel.contains(evento.relatedTarget)) return;
  focoDentro = false;
  iniciarAutoplay();
});

irPara(0);
iniciarAutoplay();

// ---------- Modais (<dialog>) ----------
const modalModelo = document.getElementById('modalModelo');
const modalConfirmacao = document.getElementById('modalConfirmacao');
const campoNome = document.getElementById('campoNome');
const campoModelo = document.getElementById('campoModelo');
const fraseMotor = 'Motor de 1340 cc, quatro cilindros, DOHC, com injeção eletrônica Ride-by-Wire.';

let gatilho = null;      // botão que abriu o modal
let proximoFoco = null;  // usado quando o foco deve ir para outro lugar ao fechar

function abrirModal(dialog, origem) {
  gatilho = origem;
  proximoFoco = null;
  dialog.showModal();
}

[modalModelo, modalConfirmacao].forEach((dialog) => {
  // botões "Fechar" e o X
  dialog.querySelectorAll('[data-fechar]').forEach((botao) => {
    botao.addEventListener('click', () => dialog.close());
  });

  // clique fora: o alvo só é o próprio dialog quando o clique cai no backdrop
  dialog.addEventListener('click', (evento) => {
    if (evento.target === dialog) dialog.close();
  });

  // Esc já é nativo; aqui só devolve o foco
  dialog.addEventListener('close', () => {
    const destino = proximoFoco || gatilho;
    if (destino) destino.focus();
    gatilho = null;
    proximoFoco = null;
  });
});

document.querySelectorAll('[data-modelo][data-descricao]').forEach((botao) => {
  botao.addEventListener('click', () => {
    document.getElementById('modalModeloTitulo').textContent = botao.dataset.modelo;
    document.getElementById('modalModeloDescricao').textContent = `${botao.dataset.descricao} ${fraseMotor}`;
    modalModelo.dataset.modeloAtual = botao.dataset.modelo;
    abrirModal(modalModelo, botao);
  });
});

// "Agendar test ride": já deixa o modelo escolhido e leva ao formulário
document.getElementById('botaoAgendarModelo').addEventListener('click', () => {
  campoModelo.value = modalModelo.dataset.modeloAtual || '';
  proximoFoco = campoNome;
  modalModelo.close();
});

// ---------- Formulário ----------
// a validação é a do próprio HTML5: o submit só acontece com os campos válidos
const formTestRide = document.getElementById('formTestRide');
const botaoEnviar = document.getElementById('botaoEnviar');

// required e minlength aceitam um texto só de espaços; aqui o tamanho é
// conferido sem os espaços das pontas (o textarea não tem pattern)
const camposTexto = [campoNome, document.getElementById('campoMensagem')];

function conferirTexto(campo) {
  const curto = campo.value.trim().length < campo.minLength;
  const mensagem = document.getElementById(campo.getAttribute('aria-describedby')).textContent;
  campo.setCustomValidity(curto ? mensagem : '');
}

camposTexto.forEach((campo) => {
  campo.addEventListener('input', () => conferirTexto(campo));
});

formTestRide.addEventListener('submit', (evento) => {
  evento.preventDefault();
  document.getElementById('confirmacaoNome').textContent = campoNome.value.trim();
  document.getElementById('confirmacaoModelo').textContent = campoModelo.value;
  formTestRide.reset();
  abrirModal(modalConfirmacao, botaoEnviar);
});

// ---------- Rodapé ----------
document.getElementById('anoAtual').textContent = new Date().getFullYear();
