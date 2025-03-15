// ****** SELECT ITEMS *****
const entry = document.getElementById("entry");
const calc = document.getElementById("calc-body");

let operation = ''; 
let operationList = ['+','-','*','/','%']
// ****** EVENTLISTENERS *****
calc.addEventListener("submit", computeValue)

// ****** FUNCTIONS *****
function computeValue(e)
{
    e.preventDefault();
    console.log(entry.value);

    let entryString = entry.value;
    let x = '';
    let y = '';
    let switchNum = false;
    for(let digit of entryString)
    {
        if(operationList.includes(digit))
        {
            switchNum = true;
        }
        else
        {
            if(switchNum)
            {
                y += digit;
            }
            else
            {
                x += digit;
            }
        }
    }
    calculate(operation,parseInt(x),parseInt(y));
}
function clearEntry()
{
    entry.value = '';
    operation = '';
}
function appendNum(digit)
{
    entry.value += digit;
}
function appendOp(text, op)
{
    entry.value += text;
    operation = op;
}
function calculate(op, x, y)
{
    switch(op){
        case 'add':
            appendNum(' = ' + (x+y));
            break;
        case 'subtract':
            appendNum(' = ' + (x-y));
            break;
        case 'multiply':
            appendNum(' = ' + (x*y));
            break;
        case 'divide':
            appendNum(' = ' + (x/y));
            break;
        case 'mod':
            z = x/y;
            z = Math.trunc(z);
            z = z*y;
            appendNum(' = ' + (x-z));
            break;
    }

}