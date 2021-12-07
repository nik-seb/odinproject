
const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equals = document.getElementById('equals')
const clear = document.getElementById('clear')
const back = document.getElementById('back')
const buttons = document.querySelectorAll('button')
const history = document.getElementById('history')
let displayValue = display.innerText //actually never used

const reg = /([x\/\+\-])/
// all operators

const regActiveOp = /((?<=\d)[x\/\+\-])/
// only functional operators, ie., preceded by a digit; does not match negative markers

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
        //conditions for decimals
        //produces error if there is already a decimal but no operator, if there is no digit, or if the digits after the operator already contain a decimal
        if (!regActiveOp.test(display.innerText) && display.innerText.includes('.')) {
            alert('error! invalid number format')
        } else if (regActiveOp.test(display.innerText)) {
            let displayString = display.innerText.split(reg)
            if (displayString[displayString.length-1].includes('.')){
                alert('error! invalid number format')
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
    if (!/\d/.test(display.innerText) && op != '-' || display.innerText[display.innerText.length-1] === '.') {
        alert ('error! please enter a valid number')
    } else if (regActiveOp.test(display.innerText) && /\d/.test(display.innerText[display.innerText.length-1])) {
        // if there is already a functional operator and the last entered character is a digit, calculate displayed operation and then append the operator to displayed result
        processResult()
        populateDisplay(op)
    } else {
        // just add the operator to the display
        populateDisplay(op)
    }
}

equals.addEventListener('click', (e) => {
    e.preventDefault()
    if (regActiveOp.test(display.innerText)) {
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

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    console.log(e.key + ' on keyboard')
    if (/\d/.test (e.key)) {
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
        if (regActiveOp.test(display.innerText)) {
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

function populateDisplay (val) {
    display.innerText += val
    display.scrollLeft = display.scrollWidth-display.offsetWidth
        // autoscrolls so the most recently entered numbers are displayed and earlier numbers scroll offscreen
}

function displayResult (string, result) {
    display.innerText = result
    display.scrollLeft = 0
        // resets scroll so long numbers display appropriately

    const newLine = document.createElement('p')
    const stringConcat = string + " = " + result
    const marked = markNotepad(stringConcat)
    newLine.innerHTML = marked
    const newButton = document.createElement('button')
    newButton.innerText = 'x'
    newLine.appendChild(newButton)
    newButton.addEventListener('click', (e) => {
        e.preventDefault()
        removeLine(e.target)
    })
    history.prepend(newLine)
    addNotepadListeners(newLine)
}

function markNotepad (string) {
    let newReg = /((?<=\d)[x\/\+\-])|(\=)/ // regActiveOp + '='
    console.log(string)
    let newString = string.split(newReg)
    console.log(newString)
    newString = newString.map((item) => {
        if (/\d/.test(item)) {
            console.log(item)
            return '<span> ' + item + ' </span>'
        } else {
            return item
        }
    })
    newString = newString.join(' ')

    console.log(newString)
    return newString
}

function addNotepadListeners (line) {
    console.log(line)
    const spans = line.querySelectorAll('span')
    spans.forEach(span => {
        console.log('a span', span)
        span.addEventListener('click', e => appendNumber(span.innerText))
    })
}

function appendNumber (num) {
    console.log(num)
    display.innerText += num
}

function removeLine (target) {
    const line = target.parentElement
    console.log(line)
    line.remove()
}

function processNegative(predisplayString) {
    // split(reg) will split negatives as follows: neg[0], dig[1], op[2], dig[3] OR neg[0], dig [1], op[2], neg[3], dig[4] OR dig[0], op[1], neg[2], dig[3]
    console.log(predisplayString[0])
    let displayString = predisplayString.map((string, index) => {
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
    // push non-empty items into result array, validate format, and display result
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