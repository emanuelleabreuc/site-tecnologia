# E-tech Store

Landing page de uma loja de tecnologia com vitrine em carrossel dos lançamentos Apple: **Apple Watch**, **AirPods Max** e **Apple Vision Pro**.

Projeto feito com **HTML, CSS e JavaScript puro**, sem frameworks nem dependências.

## Funcionalidades

- **Carrossel de produtos** com setas de navegação, indicador numérico e marcadores (dots)
- **Modal "Saiba mais"** com galeria de imagens, descrição detalhada e destaques de cada produto
- **Integração com WhatsApp**: botões "Quero o meu agora!" com mensagem pronta para cada produto e um botão flutuante de contato
- **Links do WhatsApp funcionam mesmo sem JavaScript**
- **Layout responsivo**, adaptado para celular, com menu hambúrguer

## Tecnologias

- HTML5
- CSS3 (fontes Montserrat e Orbitron, do Google Fonts)
- JavaScript (vanilla)

## Como executar

Não é preciso instalar nada. Clone o repositório e abra o `index.html` no navegador:

```bash
git clone https://github.com/emanuelleabreuc/site-tecnologia.git
```

## Estrutura

```
├── index.html     # Estrutura da página
├── style.css      # Estilos e responsividade
├── scripts.js     # Carrossel, modal, galeria e links do WhatsApp
└── *.png          # Imagens dos produtos
```

## Personalização

- **Número do WhatsApp:** altere a constante `WHATSAPP_NUMERO` em `scripts.js` (e os links `wa.me` no `index.html`).
- **Produtos:** edite o objeto `produtos` em `scripts.js` para mudar nome, descrição, destaques e as imagens da galeria.
