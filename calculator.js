// 아름다운 코드
const displayEl = document.querySelector('.display');
const operatorEl = document.querySelectorAll('.op');
const numbers = [];
let wholeStr = '';
let beforeStr = '';
let afterStr = '';
let operatorStr = '';
for (let i = 0; i <= 9; i++) {
    numbers[i] = document.querySelector(`.num-${i}`);
}


numbers.forEach((el, index) => {
    numbers[index].addEventListener('click', () => {
        wholeStr += numbers[index].textContent;
        displayEl.textContent = wholeStr;
    })
})
operatorEl.forEach((el, index) => {
    el.addEventListener('click', () => {
        if (el.textContent === '+' || el.textContent === '−' || el.textContent === '×' || el.textContent === '÷') {
            operatorStr = el.textContent;
            wholeStr += operatorStr;
            displayEl.textContent = wholeStr;
        }
        if (el.textContent === 'AC') {
            displayEl.textContent = '0';
            wholeStr = '';
        }
    })
})