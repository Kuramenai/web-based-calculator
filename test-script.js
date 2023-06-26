const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const ansButton = document.querySelector('[data-ans]');
const upperscreen = document.querySelector('[data-upperscreen]');
const lowerscreen = document.querySelector('[data-lowerscreen]');

let currentValue = '';
let previousValue = '';
let operator = '';
let result = 0;
let displayingPastResult = false;
let ansBtnPressed = false

// FOR NUMBER BUTTONS

numberButtons.forEach( numberBtn => {
    numberBtn.addEventListener('click', addText);
})

function addText(e){
    let number = e.target.textContent;
    if(displayingPastResult){
        allClear();
        displayingPastResult = false;   
    }
    if(number === '.' && currentValue.includes('.')){
        return;
    }
    if(currentValue.length < 10){
        currentValue  += number;
        upperscreen.textContent += number;
    }  
}

// FOR OPERATOR BUTTONS

operatorButtons.forEach( operatorBtn => {
    operatorBtn.addEventListener('click', operatorButtonHandler);
})

function operatorButtonHandler(e){
    if(displayingPastResult){
        allClear();
        displayingPastResult = false;   
    }
    if(currentValue){
       
        if(previousValue){
            previousOperator = operator;
            operator = e.target.textContent;

            firstOperand = parseFloat(previousValue);
            secondOperand = parseFloat(currentValue);
            result = operate(firstOperand, secondOperand, previousOperator);

            previousValue = `${result}`
            upperscreen.textContent = previousValue + ' ' + operator + ' ';
        }
        else if(ansBtnPressed){
            operator = e.target.textContent;
            upperscreen.textContent += ' ' + operator + ' ';
            previousValue = currentValue;

            ansBtnPressed = false;
        }
        else{
            operator = e.target.textContent;
            upperscreen.textContent = currentValue + ' ' + operator + ' ';
            previousValue = currentValue;
        }
        currentValue = '';
    }  
}

// FOR EQUAL BUTTON

equalButton.addEventListener('click', getOperationResult)

function getOperationResult(){
    if(currentValue && previousValue){
        firstOperand = parseFloat(previousValue);
        secondOperand = parseFloat(currentValue);
        result = operate(firstOperand, secondOperand, operator);

        lowerscreen.textContent = Number.isFinite(result) ? `${result}`: 'MATH ERROR';
        displayingPastResult = true;
    }
    else{
        lowerscreen.textContent = 'SYNTAX ERROR';
    }
}

function operate(number1, number2, operator){
    switch(operator){
    case '+':
        return add(number1, number2);
    case '−':
        return subtract(number1, number2);
    case '×':
        return multiply(number1, number2);
    case '÷':
        if(number2 != 0){
            return divide(number1, number2);
        }
        else{
            return NaN;
        }
    }
}

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

function clear(){
    currentValue = '';
    previousValue = '';
    operator = '';
}

//FOR ALL CLEAR BUTTON
clearButton.addEventListener('click', allClear);

function allClear(){
    upperscreen.textContent = '';
    lowerscreen.textContent = '';
    clear()
}

//FOR DELETE BUTTON
deleteButton.addEventListener('click', deleteSymbol);

function deleteSymbol(){
    if(!displayingPastResult){
        if(currentValue){
            
        }
    }
}

//FOR ANS BUTTON

ansButton.addEventListener('click', returnOperationResult);

function returnOperationResult(){
    if(displayingPastResult){
        allClear()
        currentValue = `${result}`;
        upperscreen.textContent = currentValue;
        
        ansBtnPressed = true;
        displayingPastResult = false;
    }
}

