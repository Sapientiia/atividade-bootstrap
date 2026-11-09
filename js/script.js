'use strict';

// Complementos em JavaScript puro para os componentes do Bootstrap.
// O comportamento principal (collapse, carrossel e modais) vem do bootstrap.bundle.

// ---------- Menu: fecha no celular ao escolher um link ----------
const menuPrincipal = document.getElementById('menuPrincipal');
const linksMenu = menuPrincipal.querySelectorAll('.nav-link');

linksMenu.forEach((link) => {
  link.addEventListener('click', () => {
    // marca o link da seção escolhida
    linksMenu.forEach((outro) => outro.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');

    if (menuPrincipal.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menuPrincipal, { toggle: false }).hide();
    }
  });
});

// ---------- Carrossel: autoplay só para quem não pediu menos movimento ----------
const carrosselGaleria = document.getElementById('carrosselGaleria');
const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!menosMovimento) {
  const carrossel = new bootstrap.Carousel(carrosselGaleria, { ride: 'carousel', interval: 6000 });

  // o Bootstrap só pausa no hover; aqui pausa também quando o teclado entra no carrossel
  carrosselGaleria.addEventListener('focusin', () => carrossel.pause());
  carrosselGaleria.addEventListener('focusout', (evento) => {
    if (!carrosselGaleria.contains(evento.relatedTarget)) {
      carrossel.cycle();
    }
  });

  // as setas e os indicadores religam o autoplay depois da troca; se o foco
  // ainda estiver dentro do carrossel, pausa de novo
  carrosselGaleria.addEventListener('slid.bs.carousel', () => {
    if (carrosselGaleria.contains(document.activeElement)) {
      setTimeout(() => carrossel.pause(), 0);
    }
  });
}

// ---------- Modal de detalhes: um só modal para os três cards ----------
const modalModelo = document.getElementById('modalModelo');
const modalModeloTitulo = document.getElementById('modalModeloTitulo');
const modalModeloDescricao = document.getElementById('modalModeloDescricao');
const botaoAgendarModelo = document.getElementById('botaoAgendarModelo');
const fraseMotor = 'Motor de 1340 cc, quatro cilindros, DOHC, com injeção eletrônica Ride-by-Wire.';

modalModelo.addEventListener('show.bs.modal', (evento) => {
  const botao = evento.relatedTarget;
  if (!botao) {
    return;
  }

  // textContent para não interpretar nada como HTML
  modalModeloTitulo.textContent = botao.dataset.modelo;
  modalModeloDescricao.textContent = `${botao.dataset.descricao} ${fraseMotor}`;
  modalModelo.dataset.modeloAtual = botao.dataset.modelo;
});

const formTestRide = document.getElementById('formTestRide');
const campoNome = document.getElementById('campoNome');
const campoModelo = document.getElementById('campoModelo');

botaoAgendarModelo.addEventListener('click', () => {
  campoModelo.value = modalModelo.dataset.modeloAtual || '';

  // registrado aqui para rodar depois do Bootstrap devolver o foco ao card
  modalModelo.addEventListener('hidden.bs.modal', () => campoNome.focus(), { once: true });
  bootstrap.Modal.getOrCreateInstance(modalModelo).hide();
});

// ---------- Formulário: validação HTML5 e confirmação em modal ----------
const modalConfirmacao = document.getElementById('modalConfirmacao');
const confirmacaoNome = document.getElementById('confirmacaoNome');
const confirmacaoModelo = document.getElementById('confirmacaoModelo');
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
  camposTexto.forEach(conferirTexto);

  if (!formTestRide.checkValidity()) {
    // mostra as mensagens do Bootstrap e leva o foco ao primeiro erro
    formTestRide.classList.add('was-validated');
    formTestRide.querySelector(':invalid').focus();
    return;
  }

  confirmacaoNome.textContent = campoNome.value.trim();
  confirmacaoModelo.textContent = campoModelo.value;
  bootstrap.Modal.getOrCreateInstance(modalConfirmacao).show();

  formTestRide.reset();
  formTestRide.classList.remove('was-validated');
});

// show() pelo código não devolve o foco sozinho
modalConfirmacao.addEventListener('hidden.bs.modal', () => botaoEnviar.focus());

// ---------- Rodapé: ano atual ----------
document.getElementById('anoAtual').textContent = new Date().getFullYear();
