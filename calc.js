let a =''; // first number
let b =''; //second number
let sign=''; //знак операции 
let finish = true ;

const digit =['0','1','2','3','4','5','6','7','8','9','.'];
const action = ['-','+','X','/','%','+/-'];

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
        if (['','-'].includes(b) && sign === ''){
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
        console.log(a);
        console.log(b);
        console.log(sign);
        return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        if(sign === '+/-'){
            if(b==='') {
                a=String(-Number(a))
                out.textContent = a;
            }
            else if (b!=='' && finish===false){
                b=String(-Number(b))
                out.textContent = b;
            }
            else if (b!=='' && finish){
                a=String(-Number(a))
                out.textContent = a;
            }
        }
        // else if(sign === '-'){
        //     if(b==='' && a!==''){
        //         b='-'
        //         out.textContent = '-0'
        //     }
        //     else if(a==='' && b===''){
        //         a='-'
        //         out.textContent = '-0'
        //     }
        // }
        else {
            out.textContent = sign;
        }
        console.log(a, b, sign);
        return;
    }

    // нажата кнопка =
    if (key === '='){
        if (b === '') b = a;  // при нажатии 5+= получится 10 и т.д.
        switch (sign){
            case '+':
                a = Number(a) + Number(b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '/':
                if (b === '0'){
                    out.textContent = 'Error';
                    a='';
                    b='';
                    sign='';
                    return; 
                }
                a = a / b;
                break;
            case '%':
                a = a * (b / 100);
                break;
            // case '+/-':
            //     a = -a;
        }
        finish = true;
        out.textContent = a;
        console.log(a);
        console.log(b);
        console.log(sign);
    }
}