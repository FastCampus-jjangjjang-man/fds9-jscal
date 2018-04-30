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

function operationFunc(resultStr, str) {

    let result = 0;
    let arr = resultStr.split(str);
    if (arr[0] === '') {
        arr[0] = 0;
    }
    switch (str) {
        case '+':
            result = parseInt(arr[0]) + parseInt(arr[1]);
            break;
        case '−':
            result = parseInt(arr[0]) - parseInt(arr[1]);
            break;
        case '×':
            result = parseInt(arr[0]) * parseInt(arr[1]);
            break;
        case '÷':
            result = parseInt(arr[0]) / parseInt(arr[1]);
            break;
        default:
            break;
    }
    return result;
}

let cntOperatorClick = 0;
let wholeStrLen = 0;

numbers.forEach((el, index) => {
    el.addEventListener('click', () => {
        console.log(`wholeStr: ${wholeStr}`);
        wholeStr += el.textContent;
        console.log(`wholeStr: ${wholeStr}`);
        displayEl.textContent = wholeStr;
        cntOperatorClick = 0;
        wholeStrLen = wholeStr.length;
    })
})

let calResult = 0;
operatorEl.forEach((el, index) => {
    el.addEventListener('click', e => {
        if (el.textContent === '+' || el.textContent === '−' || el.textContent === '×' || el.textContent === '÷') {
            cntOperatorClick++;
            if (cntOperatorClick === 1 && operatorStr !== '') {
                console.log(operatorStr);
                console.log(wholeStr);
                calResult = operationFunc(wholeStr, operatorStr);
                wholeStr = calResult;
                console.log(`calResult: ${calResult}`);
            }
            operatorStr = el.textContent;
            //연산자 2개 연속 눌렸을때
            if (cntOperatorClick >= 2) {
                wholeStr = wholeStr.replace(wholeStr[wholeStrLen - 1], operatorStr);
            } else {
                wholeStr += operatorStr;
            }
            displayEl.textContent = wholeStr;

        } else if (el.textContent === 'AC') {
            displayEl.textContent = '0';
            wholeStr = '';
        } else if (el.textContent === '=') {
            //'=' click하면 계산결과 출력
            calResult = operationFunc(wholeStr, operatorStr)
            wholeStr = '';
            if (calResult === 0) {
                wholeStr = 0;
                displayEl.textContent = 0;
                console.log(`wholeStr: ${wholeStr}`);
            } else {
                wholeStr = calResult;
                displayEl.textContent = wholeStr;
                console.log(`wholeStr: ${wholeStr}`);
            }
            operatorStr = '';
            cntOperatorClick = 0;
        }
        wholeStrLen = wholeStr.length;
    })
})