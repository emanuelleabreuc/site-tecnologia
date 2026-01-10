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