let a =''; // first number
let b =''; //second number
let sign=''; //знак операции 
let finish = true ;

const digit =['0','1','2','3','4','5','6','7','8','9','.','-1','-2'];
const action = ['-','+','X','/','%'];

// экран калькулятора 

const out = document.querySelector('.calc-screen p');


function clearALL () { // очищает кеш
    a = '';
    b = '';
    sign ='';
    finish = false;
    out.textContent = 0;
}
 
document.querySelector('.ac').onclick = clearALL;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // нажата кнопа clearALL ac
    if (event.target.classList.contains('ac')) return;

    out.textContent ='';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или ,
    if (digit.includes(key)) {
        if (b === '' && sign === ''){
            a+=key;
            out.textContent = a;
        }
        else if (a!=='' && b!=='' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else{
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    // если нажата клавиша + - / *

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }

    // меняем знак ответа или отдельного числа 
    if (key === '+/-'){
        if (b ==='' || finish){
            if (a > 0){
                out.textContent = -a;
            }
            else if (a < 0){
                out.textContent = Math.abs(a);
            }
        }
        else if (b !== ''){
            if (b > 0){
                out.textContent = -b;
            }
            else if (b < 0){
                out.textContent = Math.abs(b);
            }
        }
        key ='';
    }
    // нажата кнопка =
    if (key === '='){
        if (b === '') b = a;  // при нажатии 5+= получится 10 и т.д.
        switch (sign){
            case '+':
                a = (+a) + (+b); // операция сложения
                break;
            case '-': //
                a = a - b;
                break;
            case 'X': // операция умножения
                a = a * b;
                break;
            case '/': // операция деления
                if (b === '0'){ // ошибка деления на ноль
                    out.textContent = 'Error'; 
                    a='';
                    b='';
                    sign='';
                    return; 
                }
                a = a / b;
                break;
            case '%': // процент от числа 
                a = a * (b / 100);
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }
}