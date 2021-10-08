// TO-DO: add backspace, fix negative nums (even if not entered, will break if result is neg)

const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equals = document.getElementById('equals')
const clear = document.getElementById('clear')
let displayValue = display.innerText

const reg = /([x\/\+\-])/
// all operators
 // (?<=\d) is a nice thought to make sure it's preceded by a digit (so you can add negative numbers) but throws errors if first number is a negative number

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        e.preventDefault()
        receiveDigits(digit.innerText)
    })
})

function receiveDigits (val) {
    if (val == '.') {
        //conditions for decimals: checks if there is another decimal in the same number
        // (if no operator, or decimal is after the operator) 
    if (!reg.test(display.innerText) && display.innerText.includes('.')) {
        alert('error! multiple decimal points are not allowed')
    } else if (reg.test(display.innerText)) {
        let displayString = display.innerText.split(reg)
        if (displayString[2].includes('.')){
            alert('error! multiple decimal points are not allowed')
        } else {
            populateDisplay('.')
        }
    } else {
        populateDisplay('.')
    }
} else (populateDisplay(val))
}

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        e.preventDefault()
        receiveOps(operator.innerText)
    })
})

function receiveOps (op) {
    if (!/\d/.test(display.innerText)) {
        alert ('error! please enter a digit first')
    } else if (reg.test(display.innerText)) {
        processResult()
        populateDisplay(op)
    } else {
        populateDisplay(op)
    }
}

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

const regDigits = /(\d)/

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (regDigits.test (e.key)) {
        receiveDigits(e.key)
    }
    if (e.key === '*') {
        receiveDigits('x')
    }
    if (reg.test(e.key)) {
        receiveOps(e.key)
    }
    if (e.key === '=' || e.key === 'Enter') {
        if (!reg.test(display.innerText)) {
            return displayResult(display.innerText)
        } else {
            processResult()
        }
    }
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

function truncate (num) {
    console.log(num)
    return Math.round(num * 10000) / 10000
}

function add (a, b) {
    return truncate(a + b)
}

function subtract (a, b) {
    return truncate(a - b)
}

function multiply (a, b) {
    return truncate(a * b)
}

function divide (a, b) {
    return truncate(a / b)
}




console.log(multiply(5, 3), add (1, 3), subtract (5, 3), divide (10, 2))