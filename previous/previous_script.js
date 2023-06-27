

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

function isValidNumber(number){
    if( Number.isFinite(number)){
        return true;
    }
    else{
        return false;
    }
}

function operate(number1, number2, operator){
    switch(operator){
    case 'add':
        return add(number1, number2);
    case 'subtract':
        return subtract(number1, number2);
    case 'multiply':
        return multiply(number1, number2);
    case 'divide':
        return divide(number1, number2);
    }
}

function getOperationResult(){

    operator = operatorsStack[0];
    operatorName = operator.id;
    operands = upperScreen.textContent.split(`${operator.textContent}`);
    firstOperand = parseFloat(operands[0]);
    secondOperand = parseFloat(operands[1]);

    if (isValidNumber(firstOperand) && isValidNumber(secondOperand)){
        result = operate(firstOperand, secondOperand, operatorName);
        operatorsStack.shift();
        operands.shift();
        operands.shift();
        return result;
    }
    else{
        return NaN;
    }
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
        
        if(operatorsStack.length === 1){
            operationResult = getOperationResult()
            if(operationResult){
                upperScreen.textContent = `${operationResult} ${button.textContent} `
                operatorsStack.push(button)
            }
            
        }
        else if(operatorsStack.length === 0){
            operatorsStack.push(button);
            upperScreen.textContent += ` ${button.textContent} `;
        }

    }
    else if(button.id === '=' && operatorsStack){

        if(operatorsStack.length == 1){

            operationResult = getOperationResult();
            lowerScreen.textContent = operationResult;
            displayingPastResult = true;
            resetOperators();
        }

    }
    else if(button.id === 'ac'){
        clearScreen()
        resetOperators()
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

