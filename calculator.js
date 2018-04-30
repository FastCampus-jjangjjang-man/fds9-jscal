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
numbers.push(document.querySelector('.num-dot'));
//계산결과 반환 함수
function operationFunc(resultStr, str) {

    let result = 0;
    let arr = resultStr.split(str);
    if (arr[0] === '') {
        arr[0] = 0;
    }
    switch (str) {
        case '+':
            result = parseFloat(arr[0]) + parseFloat(arr[1]);
            break;
        case '−':
            result = parseFloat(arr[0]) - parseFloat(arr[1]);
            break;
        case '×':
            result = parseFloat(arr[0]) * parseFloat(arr[1]);
            break;
        case '÷':
            result = parseFloat(arr[0]) / parseFloat(arr[1]);
            break;
        default:
            break;
    }
    return result;
}

let cntOperatorClick = 0;
let wholeStrLen = 0;

//숫자 클릭 이벤트 Control
numbers.forEach((el, index) => {
    el.addEventListener('click', () => {
        wholeStr += el.textContent;
        displayEl.textContent = wholeStr;
        cntOperatorClick = 0;
        wholeStrLen = wholeStr.length;
    })
})

//연산자 클릭 이벤트 Control
let calResult = 0;
operatorEl.forEach((el, index) => {
    el.addEventListener('click', e => {
        //연산자 클릭조건문
        if (el.textContent === '+' || el.textContent === '−' || el.textContent === '×' || el.textContent === '÷') {
            cntOperatorClick++;
            //클릭할때마다 count를 증가시킨후
            //하나의 연산자가 이미 클릭되어있고 다른 연산자를 클릭했을때
            //계산결과를 출력하고 추가 연산을 실시
            if (cntOperatorClick === 1 && operatorStr !== '') {
                calResult = operationFunc(wholeStr, operatorStr);
                wholeStr = calResult;
            }
            operatorStr = el.textContent;
            //연산자 2개 연속 눌렸을때
            if (cntOperatorClick >= 2) {
                wholeStr = wholeStr.replace(wholeStr[wholeStrLen - 1], operatorStr);
            } else {
                wholeStr += operatorStr;
            }
            displayEl.textContent = wholeStr;
            // Clear버튼을 click했을 때
        } else if (el.textContent === 'AC') {
            displayEl.textContent = '0';
            wholeStr = '';
            //'=' click하면 계산결과 출력
        } else if (el.textContent === '=') {
            calResult = operationFunc(wholeStr, operatorStr)
            wholeStr = '';
            //계산결과가 0일경우 다른 숫자를 click하면 0X 이런식으로 출력된다.
            //이를 control하기 위한 조건문
            if (calResult === 0) {
                wholeStr = 0;
                displayEl.textContent = 0;
                console.log(`wholeStr: ${wholeStr}`);
            } else {
                wholeStr = calResult;
                displayEl.textContent = wholeStr;
            }
            operatorStr = '';
            cntOperatorClick = 0;
        } else if (el.textContent === '+/-') {
            cntOperatorClick = 0;
            operatorStr = '';
            let absValue = -parseInt(wholeStr);
            wholeStr = absValue;
            displayEl.textContent = wholeStr;
            console.log(wholeStr);
        }
        wholeStrLen = wholeStr.length;
    })
})