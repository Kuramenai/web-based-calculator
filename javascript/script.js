

function add(number1, number2){
    return parseInt(number1) + parseInt(number2);
}

function subtract(number1, number2){
    return parseInt(number1) - parseInt(number2);
}

function multiply(number1, number2){
    return parseInt(number1) * parseInt(number2);
}

function divide(number1, number2){
    return parseInt(number1) / parseInt(number2);
}


calculator_buttons = document.querySelector('.calculator-buttons').children;

for(button of calculator_buttons){
    gridName = button.className;
    button.setAttribute(`style`, `grid-area: ${gridName}`);
    console.log(gridName)
}

