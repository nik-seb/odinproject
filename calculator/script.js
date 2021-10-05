const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equals = document.getElementById('equals')
const clear = document.getElementById('clear')
let displayValue = display.innerText

const reg = /(x|\/|\+|\-)/

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        e.preventDefault()
        if (digit.innerText == '.') {
            if (display.innerText.includes('.')) {
                alert('error! multiple decimal points are not allowed')
            } else {
                populateDisplay(digit.innerText)
            }
        } else (populateDisplay(digit.innerText))
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        e.preventDefault()
        if (reg.test(display.innerText)) {
            processResult()
            populateDisplay(operator.innerText)
        } else {
            populateDisplay(operator.innerText)
        }
    })
})

equals.addEventListener('click', (e) => {
    e.preventDefault()
    if (!reg.test(display.innerText)) {
        return displayResult(display.innerText)
    } else {
        processResult()
    }
})

clear.addEventListener('click', (e) => {
    e.preventDefault()
    display.innerHTML = ''
})

// function checkValidity () {
//     const reg = /(x|\/|\+|\-)/
//     let operatorExists = reg.test(display.innerText)

// }
// was going to do check if multiple operators too, but easier to make a second operator = equals

function populateDisplay (val) {
    display.innerText += val
}

function displayResult (val) {
    display.innerText = val
}

function processResult () {
    let displayString = display.innerText.split(reg)
    console.log(displayString)
    let result = operate(displayString[0], displayString[1], displayString[2])
    console.log(result)
    displayResult(result)
}

function operate (num1, operator, num2) {
    if (operator == '/' && num1 == 0 || operator == '/' && num2 == 0) {
        return('Cannot divide by 0')
    }

    if (operator == '+') {
        console.log('adding', num1, operator, num2)
        return add(+num1, +num2)
    }
    if (operator == '-') {
        return subtract(+num1, +num2)
    }
    if (operator == 'x') {
        return multiply(+num1, +num2)
    }
    if (operator == '/') {
        return divide(+num1, +num2)
    }
}


function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}




console.log(multiply(5, 3), add (1, 3), subtract (5, 3), divide (10, 2))