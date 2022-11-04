

function add(number1, number2){
    return number1 + number2;
}

function subtract(number1, number2){
    return number1 - number2;
}

function multiply(number1, number2){
    return number1 * number2;
}

function divide(number1, number2){
    return number1 / number2;
}

function operate(number1, number2, operator){
    switch(operator){
    case 'add':
        return add(parseInt(number1), parseInt(number2));
    case 'subtract':
        return subtract(parseInt(number1), parseInt(number2));
    case 'multiply':
        return multiply(parseInt(number1), parseInt(number2));
    case 'divide':
        return divide(parseInt(number1), parseInt(number2))
    }
}
function getOperationResult(){

    operator = operatorsStack.shift();
    operatorName = operator.id;
    operands = upperScreen.textContent.split(`${operator.textContent}`);
    number1 = operands.shift();
    number2 = operands.shift();
    result = operate(number1, number2, operatorName);
    return result;

}

function resetOperators(){
    
    operatorsStack = [];
    operands = [];

}

function clearScreen(){
    upperScreen.textContent = '';
    lowerScreen.textContent = '';
    displayingPastResult = false;
}


function main(e){

    let button = e.target;

    if(button.id === 'multiply' || button.id === 'divide' || button.id === 'add' || button.id === 'subtract'){

        operatorsStack.push(button);
        upperScreen.textContent += ` ${button.textContent} `;

    }
    else if(button.id === '=' && operatorsStack){

        if(operatorsStack.length == 1){

            operationResult = getOperationResult();
            lowerScreen.textContent = operationResult;
            displayingPastResult = true;
            resetOperators();
        }
        else{
        
            lowerScreen.textContent = 'SYNTAX ERROR';   
        }

    }
    else if(!button.id){
        if(displayingPastResult){
           clearScreen();
        }
        upperScreen.textContent += `${button.textContent}`;  
    }
}


let operatorsStack = [];
let operands ;
let displayingPastResult = false;

upperScreen = document.querySelector('.upper-screen');
lowerScreen = document.querySelector('.lower-screen');

calculator_buttons = document.querySelector('.calculator-buttons').children;

for(button of calculator_buttons){
    button.setAttribute(`style`, `grid-area: ${button.className}`);
    button.addEventListener('click', main);
}

