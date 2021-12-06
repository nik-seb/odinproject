// feature: log recent calculations in notepad; log recently used numbers in banner so user can select and immediately implement (eg., if they are dividing various numbers by 2.735 it will save time)

// bug: if the first number is a negative number, it will be added to notepad when an operator is input
//   because the reg test only checks for existing operators instead of checking operator vs negative.
//   finesse that

const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equals = document.getElementById('equals')
const clear = document.getElementById('clear')
const back = document.getElementById('back')
const buttons = document.querySelectorAll('button')
const notepad = document.getElementById('notepad')
let displayValue = display.innerText //actually never used

const reg = /([x\/\+\-])/
// all operators
 // (?<=\d) is a nice thought to make sure it's preceded by a digit (so you can add negative numbers) but throws errors if first number is a negative number

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(btn.innerText + ' on display')
    })
})

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
    // checks if operator isn't preceded by digit and doesn't equal '-' (to allow negative num processing)
    if (!/\d/.test(display.innerText) && op != '-') {
        alert ('error! please enter a digit first')
    } else if (reg.test(display.innerText) && op != '-') {
        // if there is already an operator, calculate displayed operation and then append the operator to displayed result
        processResult()
        populateDisplay(op)
    } else {
        // just add the operator to the display
        populateDisplay(op)
    }
}

equals.addEventListener('click', (e) => {
    e.preventDefault()
    if (!reg.test(display.innerText)) {
        return
    } else {
        processResult()
    }
})

clear.addEventListener('click', (e) => {
    e.preventDefault()
    display.innerHTML = ''
})

back.addEventListener('click', (e) => {
    e.preventDefault()
    goBack()
})

function goBack () {
    let newDisplay = display.innerText.slice(0, -1)
    console.log(newDisplay)
    display.innerText = newDisplay
}

const regDigits = /(\d)/

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    console.log(e.key + ' on keyboard')
    if (regDigits.test (e.key)) {
        receiveDigits(e.key)
    }
    if (e.key === '*') {
        receiveDigits('x')
    }
    if (reg.test(e.key)) {
        receiveOps(e.key)
    }
    if (e.key === '.') {
        receiveDigits('.')
    }
    if (e.key === '=' || e.key === 'Enter') {
        if (!reg.test(display.innerText)) {
            return
        } else {
            processResult()
        }
    }
    if (e.key === 'Backspace') {
        goBack()
    }
    if (e.key === 'c') {
        console.log('a c')
        display.innerHTML = ''
    } //clears
})

// function checkValidity () {
//     const reg = /(x|\/|\+|\-)/
//     let operatorExists = reg.test(display.innerText)

// }
// was going to do check if multiple operators too, but easier to make a second operator = equals

function populateDisplay (val) {
    display.innerText += val
}

function displayResult (string, result) {
    display.innerText = result

    const newLine = document.createElement('p')
    newLine.innerText = string + " = " + result
    const newButton = document.createElement('button')
    newButton.innerText = 'x'
    newLine.appendChild(newButton)
    newButton.addEventListener('click', (e) => {
        e.preventDefault()
        removeLine(e.target)
    })
    notepad.appendChild(newLine)
}

function removeLine (target) {
    const line = target.parentElement
    console.log(line)
    line.remove()
}

// only existing bug that I'm aware of here is that it won't automatically read a second operator as "=" and display the sum plus new operator
    // but it will produce error message if someone tries to submit a string with multiple non-negative operators 
function processNegative(predisplayString) {
    // split(reg) will split negatives as follows: neg[0], dig[1], op[2], dig[3] OR neg[0], dig [1], op[2], neg[3], dig[4] OR dig[0], op[1], neg[2], dig[3]
    console.log(predisplayString[0])
    displayString = predisplayString.map((string, index) => {
        console.log(predisplayString[index])
            //if "-" is not preceded by a digit (and therefore is a neg and not an operator)
        if (string === '-' && !/\d/.test(predisplayString[index-1])) {
            console.log(string)
            return `${string}${predisplayString[index+1]}`
        } else if (/\d/.test(string) && predisplayString[index-1] === '-' && !/\d/.test(predisplayString[index-2])) {
            // if preceded by "-" and no other digit and therefore already included in neg number combo
            // eg., -6-5: 5 != true, 6 = true; 5+-6: -6 = true
            return ''
        } else {
            return string
        }
    })
    console.log(displayString)
    let result = []
    for (let string in displayString) {
        if (displayString[string] != '') {
            result.push(displayString[string])
        }
    }
    if (result.length != 3) {
        alert('error! please clear and try again')
        console.log(result.length, result)
    } else {
        result = operate(result[0], result[1], result[2])
        console.log('operating on negative')
        displayResult(display.innerText, result)
    }
}

function processResult () {
    let displayString = display.innerText.split(reg)
     //checks for excess values caused by negative numbers
    if (displayString.length > 3) {
        processNegative(displayString)
    } else {
        let result = operate(displayString[0], displayString[1], displayString[2])
        displayResult(display.innerText, result)
    }
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