const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');
const list = document.querySelector('.list');


let active = 0;
const total = items.length;
let timer;

function update(direction) {
    
    const currentItem = document.querySelector('.item.active');
    const currentDot = document.querySelector('.dot.active');
    if (currentItem) currentItem.classList.remove('active');
    if (currentDot) currentDot.classList.remove('active');

    // update active index
    active += direction;
    if (active < 0) active = total - 1;
    if (active >= total) active = 0;

    // set new active classes
    items[active].classList.add('active');
    if (dots[active]) dots[active].classList.add('active');

    // update number indicator (1-based index)
    if (numberIndicator) numberIndicator.textContent = String(active + 1);

    // reset autoplay timer if exists
    if (timer) {
        clearInterval(timer);
        timer = setInterval(() => update(1), 5000);
    }
}

prevButton.addEventListener('click', () => { /*toda vez que clicar no prevButton, a função é executada*/
    update(-1)
})

nextButton.addEventListener('click', () => { /*toda vez que clicar no nextButton, a função é executada*/
    update(1) /*sem sinal, é considerado positivo*/
})

/* ================== WHATSAPP ================== */
const WHATSAPP_NUMERO = '5527998864413'; /* 55 (Brasil) + 27 (DDD) + número */

function linkWhats(mensagem) {
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

/* ================== DADOS DOS PRODUTOS ================== */
/* Para adicionar mais fotos, coloque o arquivo na pasta do site e inclua o nome em "imagens" */
const produtos = {
    'apple-watch': {
        nome: 'Apple Watch',
        descricao: 'Seu parceiro de saúde e treino no pulso. Acompanhe batimentos, sono, atividades físicas e receba notificações sem tirar o celular do bolso.',
        destaques: [
            'Monitoramento de saúde: batimentos, sono e oxigênio no sangue',
            'Modelos Ultra 2, Series 10 e SE para todos os estilos',
            'Resistente à água — ideal para natação e treinos',
            'Pagamentos por aproximação e notificações no pulso'
        ],
        imagens: ['./apple-watch.png']
    },
    'air-pods': {
        nome: 'AirPods Max',
        descricao: 'Som de alta fidelidade com cancelamento de ruído ativo. Mergulhe na sua música, filmes e chamadas com conforto o dia todo.',
        destaques: [
            'Cancelamento ativo de ruído e modo ambiente',
            'Áudio espacial com rastreamento dinâmico da cabeça',
            'Até 20 horas de bateria',
            'Conexão instantânea com seus aparelhos Apple'
        ],
        imagens: ['./air-pods.png']
    },
    'vision-pro': {
        nome: 'Apple Vision Pro',
        descricao: 'A computação espacial chegou. Trabalhe, assista e reviva memórias em telas gigantes que se misturam ao seu ambiente.',
        destaques: [
            'Telas ultra-nítidas com resolução impressionante',
            'Controle com os olhos, as mãos e a voz',
            'Filmes e jogos em uma tela do tamanho que você quiser',
            'Fotos e vídeos espaciais para reviver momentos'
        ],
        imagens: ['./vision-pro.png']
    }
};

/* Visualizações da galeria: foto completa + detalhes ampliados */
const visualizacoes = [
    { classe: 'vista-completa', rotulo: 'Visão geral' },
    { classe: 'vista-detalhe-topo', rotulo: 'Detalhe superior' },
    { classe: 'vista-detalhe-base', rotulo: 'Detalhe inferior' }
];

/* ================== MODAL "SAIBA MAIS" ================== */
const modal = document.getElementById('modal');
const galeriaImg = document.getElementById('galeria-img');
const miniaturas = document.getElementById('galeria-miniaturas');

function trocarImagem(src, classe, alt) {
    galeriaImg.src = src;
    galeriaImg.alt = alt;
    galeriaImg.className = classe;
}

function abrirModal(id) {
    const p = produtos[id];
    if (!p) return;

    document.getElementById('modal-titulo').textContent = p.nome;
    document.getElementById('modal-descricao').textContent = p.descricao;
    document.getElementById('modal-destaques').innerHTML =
        p.destaques.map(d => `<li>${d}</li>`).join('');
    document.getElementById('modal-whats').href =
        linkWhats(`Olá! Vi o ${p.nome} no site da E-tech Store e quero garantir o meu. Pode me passar mais informações?`);

    /* monta a galeria: cada imagem real + as visualizações de detalhe */
    const fotos = [];
    p.imagens.forEach((src, i) => {
        if (i === 0) visualizacoes.forEach(v => fotos.push({ src, ...v }));
        else fotos.push({ src, classe: 'vista-completa', rotulo: `Foto ${i + 1}` });
    });

    miniaturas.innerHTML = '';
    fotos.forEach((f, i) => {
        const btn = document.createElement('button');
        btn.className = 'miniatura' + (i === 0 ? ' ativa' : '');
        btn.setAttribute('aria-label', f.rotulo);
        btn.innerHTML = `<img src="${f.src}" class="${f.classe}" alt="">`;
        btn.addEventListener('click', () => {
            miniaturas.querySelectorAll('.miniatura').forEach(m => m.classList.remove('ativa'));
            btn.classList.add('ativa');
            trocarImagem(f.src, f.classe, `${p.nome} - ${f.rotulo}`);
        });
        miniaturas.appendChild(btn);
    });
    trocarImagem(fotos[0].src, fotos[0].classe, p.nome);

    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
}

function fecharModal() {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.botao[data-produto]').forEach(botao => {
    botao.addEventListener('click', () => abrirModal(botao.dataset.produto));
});

modal.querySelectorAll('[data-fechar]').forEach(el => el.addEventListener('click', fecharModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

/* ================== LINKS DE WHATSAPP ================== */
document.querySelectorAll('.botao-whats[data-produto]').forEach(link => {
    const p = produtos[link.dataset.produto];
    link.href = linkWhats(`Olá! Tenho interesse no ${p.nome}. Quero garantir o meu!`);
});

document.getElementById('whats-flutuante').href =
    linkWhats('Olá! Vim pelo site da E-tech Store e quero saber mais sobre os produtos.');

/* ================== MENU NO CELULAR ================== */
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBtn.classList.toggle('aberto', aberto);
    menuBtn.setAttribute('aria-expanded', String(aberto));
});

menu.querySelectorAll('li').forEach(li => li.addEventListener('click', () => {
    menu.classList.remove('aberto');
    menuBtn.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
}));

/* ================== DESLIZAR O DEDO (SWIPE) ================== */
let toqueInicioX = null;
let toqueInicioY = null;

list.addEventListener('touchstart', e => {
    toqueInicioX = e.touches[0].clientX;
    toqueInicioY = e.touches[0].clientY;
}, { passive: true });

list.addEventListener('touchend', e => {
    if (toqueInicioX === null) return;
    const dx = e.changedTouches[0].clientX - toqueInicioX;
    const dy = e.changedTouches[0].clientY - toqueInicioY;
    /* só conta como swipe se o movimento for mais horizontal que vertical */
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        update(dx < 0 ? 1 : -1);
    }
    toqueInicioX = null;
}, { passive: true });
