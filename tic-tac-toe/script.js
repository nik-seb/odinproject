
const gameboard = (function(){
    const cells = document.querySelectorAll('td')
    const rows = ['a', 'b', 'c']
    const cols = [1, 2, 3]
    const boardArray = []
    function populateArray (rows, cols) {
        for (let row in rows) {
            for (let col in cols) {
                let newSquare = `${rows[row]}${cols[col]}`
                // {'row': rows[row], 'col': cols[col], 'val': ''}
                boardArray.push(newSquare)
            }
        }
    }

    function setupCells () {
        // name cells
        for (let i = 0; i < cells.length; i++) {
            cells[i].id = boardArray[i]
        }
    }

    function setNames () {
        const submitBtns = document.querySelectorAll('input[type="submit"]')
        const xTitle = document.getElementById('x-title')
        const oTitle = document.getElementById('o-title')
        const xWinMark = document.getElementById('x-win-mark')
        const oWinMark = document.getElementById('o-win-mark')
        submitBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
            e.preventDefault()
            let xName = document.getElementById('play1').value
            if (xName === '' || !xName) {
                xName = playerX.name
            }
            playerX.name = xName
            xTitle.innerText = xName
            xWinMark.innerText = xName
            let oName = document.getElementById('play2').value
            if (oName === '' || !oName) {
                oName = playerO.name
            }
            playerO.name = oName
            oTitle.innerText = oName
            oWinMark.innerText = oName
            const turnMarker = document.querySelector('.turn-marker')
            if (turnMarker.id === 'x-mark') {
                turnMarker.innerText = xName
            } else {
                turnMarker.innerText = oName
            }
        })
        })
    }

    function setComputerPlay () {
        const compPlay = document.getElementById('comp-play')
        const oTitle = document.getElementById('o-title')
        const oWinMark = document.getElementById('o-win-mark')
        compPlay.addEventListener('click', e => {
            e.preventDefault()
            let oName = 'Computer'
            playerO.name = oName
            oTitle.innerText = oName
            oWinMark.innerText = oName
            // left out turnMarker lines from the setNames function; keep eye open for anything weird
        console.log(playerO.name)
        })
    }

    return (populateArray(rows, cols), boardArray, setupCells(), setNames(), setComputerPlay()) //do need to run populateArray before returning boardArray or is not filled
})()


const gamePlay = (function(){
    "use strict"
    const board = document.getElementById('board')
    const cells = document.querySelectorAll('td')
    const playerMarker = document.querySelector('.turn-marker')

        let tally = 0
        let xMoves = []
        let oMoves = []
        let thisPlayer = ''
    
    const placeMark = function () {
        cells.forEach((cell) => {
            cell.addEventListener('click', cellClicker)
        })
    }

    const cellClicker = function (e){
        const cell = e.target
        if (cell.innerText) {
            return // prevents any action from occurring if cell is already filled
        }
        const thisCell = cell.id
        thisPlayer = ''
        if (playerMarker.id === 'x-mark') {
            thisPlayer = 'X'
            xMoves.push(thisCell)
            if (checkForWin(xMoves)) {
                announceWin(playerX.name) // link into player names
                removeClicker()
                playerX.score++
                document.getElementById('x-wins').innerText = playerX.score
            }
            playerMarker.id = 'o-mark'
            playerMarker.innerText = playerO.name
            cell.innerText = thisPlayer
            tally++
            if (playerO.name === 'Computer' && tally != 9 && !checkForWin(xMoves)) {
                compMoves()
            }
        } else if (playerMarker.id === 'o-mark') {
            thisPlayer = 'O'
            oMoves.push(thisCell)
            if (checkForWin(oMoves)) {
                announceWin(playerO.name)
                removeClicker()
                playerO.score++
                document.getElementById('o-wins').innerText = playerO.score
            }
            playerMarker.id = 'x-mark'
            playerMarker.innerText = playerX.name
            cell.innerText = thisPlayer
            tally++
        }
        //if board is full and there is no winner declaration
        if (tally === 9 && !document.getElementById('winner')) {
            announceWin('Tie')
            removeClicker()
        }
    }

    //prevent empty cells from being clicked after game is won
    function removeClicker() {
        cells.forEach((cell) => {
            cell.removeEventListener('click', cellClicker)
        })
    }

    function compMoves () {
            const cells = document.querySelectorAll('#board td')
            let validCellIDs = []
            cells.forEach(element => {
                if (element.innerText === '') {
                    validCellIDs.push(element.id)
                }
            })
            console.log(validCellIDs)
            let thisCell = chooseMove(validCellIDs)
            console.log('the chosen cell is: ', thisCell)
            thisCell = document.getElementById(thisCell)
            thisPlayer = 'O'
            thisCell.innerText = thisPlayer
            oMoves.push(thisCell.id)
            if (checkForWin(oMoves)) {
                announceWin(playerO.name)
                removeClicker()
                playerO.score++
                document.getElementById('o-wins').innerText = playerO.score
            }
            playerMarker.id = 'x-mark'
            playerMarker.innerText = playerX.name
            tally++
        }

    function chooseMove (valid) {
        const oNearWin = checkNearWin(oMoves)
        const xNearWin = checkNearWin(xMoves)
        console.log(`onearwin is ${oNearWin} and xNearWin is ${xNearWin}`)
        if (oNearWin === false && xNearWin === false) {
            console.log('no near win!')
            return randomize()
        }
        // check oNearWin first to get an immediate win if possible, then xNearWin to block
        console.log('checking oNearWin')
        if (oNearWin != false) {
            let oCheck = checks(oNearWin)
            console.log('oCheck = ', oCheck)
            if (oCheck != false) {
                return oCheck
            }
        }
        console.log('checking xNearWin')

        if (xNearWin != false) {
            let xCheck = checks(xNearWin)
            console.log('xCheck = ', xCheck)
            if (xCheck != false) {
                return xCheck
            }
        }

        console.log('no valid near-win moves')
        return randomize()

        function randomize () {
            let random = Math.floor(Math.random()*valid.length)
            return valid[random]
        }

        function checks (nearWin) {
            if (nearWin.includes('tx')) {
                let diag = ['a1', 'b2', 'c3']
                for (let cell of diag) {
                    console.log(cell, diag, valid, valid.includes(cell))
                    if (valid.includes(cell)) {
                        return cell
                    }
                }
            }
            if (nearWin.includes('tz')) {
                let diag = ['c1', 'b2', 'a3']
                for (let cell of diag) {
                    console.log(cell, diag, valid, valid.includes(cell))
                    if (valid.includes(cell)) {
                        return cell
                    }
                }
            }

            console.log('checking parts of nearWin: ', nearWin[0], nearWin[1])
            for (let i = 0; i < nearWin.length; i++) {
                for (let cell of valid) {
                    console.log('checking parts of valid cell: ', cell[0], cell[1])
                    if (cell[0] === nearWin[i][0]) {
                        console.log(cell)
                        return cell
                    }
                    if (cell[1] === nearWin[i][0]) {
                        console.log(cell)
                        return cell
                    }
                }
            }

            
            return false
        }

    }


    const announceWin = function (winner) {
        let announce = ''
        if (winner === 'Tie') {
            announce = "It's a tie!"
        } else {
            announce = `${winner} has won!`
        } // make these print out
        let display = document.createElement('div')
        display.id = 'winner'
        display.innerText = announce
        board.appendChild(display)
        
    }

    const checkForWin = function (moves) {
        //can receive xMoves or oMoves
        //checks diagonals
        console.log('checkForWin: oMoves and xMoves: ', oMoves, xMoves)
        let talliesDiag = tallyDiag(moves)
        if (talliesDiag.tx === 3 || talliesDiag.tz === 3) {
            return true
        }
        //checks rows and columns
        let talliesArr = tallyMoves(moves)
        for (let i = 0; i < talliesArr.length; i++) {
            if (talliesArr[i][1] === 3) {
                return true
            }
        }
    }

    function checkNearWin (moves) {
        //receive xMoves or oMoves
        let nearWinTally = []
        let diagonal = tallyDiag(moves)
        if (diagonal.tx === 2) {
            nearWinTally.push('tx')
        } else if (diagonal.tz === 2) {
            nearWinTally.push('tz')
        }
        let rowCol = tallyMoves(moves)
        for (let i = 0; i < rowCol.length; i++) {
            if (rowCol[i][1] === 2) {
                console.log(`checkNearWin: rowCol[i] from tallyMoves is ${rowCol[i]}`)
                nearWinTally.push(rowCol[i])
            }
        }
        if (nearWinTally.length > 0) {
            return nearWinTally
        }
        return false
    }

    function tallyDiag (moves) {
        // t1 covers diagonal: a1, b2, c3; t2 covers diagonal c1, b2, a3
        // changing t1 to tx and t2 to tz so I can evaluate alongside regular cells
        let tallies = {tx: 0, tz: 0}
        if (moves.indexOf('a1') != -1) {
            tallies.tx++
        }
        if (moves.indexOf('b2') != -1) {
            tallies.tx++
            tallies.tz++
        }
        if (moves.indexOf('c3') != -1) {
            tallies.tx++
        }
        if (moves.indexOf('c1') != -1) {
            tallies.tz++
        }
        if (moves.indexOf('a3') != -1) {
            tallies.tz++
        }
        return tallies
    }

    function tallyMoves (moves) {
                // gets row and column of each existing move and increments the corresponding value in tallies
        let tallies = {a: 0, b: 0, c: 0, 1: 0, 2: 0, 3: 0}
        for (let i in moves) {
            let row = moves[i][0]
            let col = moves[i][1]
            tallies[row]++
            tallies[col]++
        }
        return Object.entries(tallies)
    }

    function clearBoard () {
        const clearBtn = document.getElementById('clear-btn')
        clearBtn.addEventListener('click', (e) => {
            cells.forEach((cell) => {
                cell.innerText = ''
            })
            tally = 0
            xMoves = []
            oMoves = []
            if (document.getElementById('winner')) {
                board.removeChild(document.getElementById('winner'))
            }
            placeMark()
            if (document.getElementById('o-mark') && playerO.name === 'Computer') {
                compMoves()
            }
        })
    }
    return (placeMark(), clearBoard())
})()

const Player = function (name, nom) {

    const score = 0

    return {name, nom, score}
}

const playerX = Player('X', 'play1')
const playerO = Player('O', 'play2')
