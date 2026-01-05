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
    document.querySelector('.item.active').classList.remove('active'); /*remove a classe active do item que está ativo*/
    document.querySelector('.dot.active').classList.remove('active'); /*remove a classe active do ponto que está ativo*/

    
}

prevButton.addEventListener('click', () => { /*toda vez que clicar no prevButton, a função é executada*/
    update(-1)
})

nextButton.addEventListener('click', () => { /*toda vez que clicar no nextButton, a função é executada*/
    update(1) /*sem sinal, é considerado positivo*/
})