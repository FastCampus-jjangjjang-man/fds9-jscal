// 아름다운 코드
const displayEl = document.querySelector('.display');

const numbers = [];

for (let i = 0; i <= 9; i++) {
    numbers[i] = document.querySelector(`.num-${i}`);
}


numbers.forEach((el, index) => {
    numbers[index].addEventListener('click', () => {
        displayEl.textContent = index;
    })
})